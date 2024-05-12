package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.util.CookieService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.Date;

import static bg.tu_varna.sit.backend.models.enums.useractivity.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.userstatus.Status.ACTIVE;

//? This filter is applied every time when someone tries to access a protected endpoint
//? and if the "someone" has a valid JWT, a UsernamePasswordAuthenticationToken is created for this "someone" and then
//? added to the context of the SecurityContextHolder, which means that this "someone" has become
//? an authenticated user a.k.a "principal" BUT ONLY for the specific request executed within a thread from the thread pool
@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Value("${env.HTTP_ONLY_COOKIE_NAME}")
    private String HTTP_ONLY_COOKIE_NAME;
    @Value("${env.EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE1}")
    private String EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE1;
    @Value("${env.EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE2}")
    private String EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE2;
    @Value("${env.REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER}")
    private String REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER;
    @Value("${env.REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER_VALUE}")
    private String REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER_VALUE;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final CustomLogoutHandler customLogoutHandler;
    private final CookieService cookieService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
                                                        //l
        if(request.getRequestURI().startsWith("/api/internal/")) //? This filter must be applied only for secured urls(starting with "/api/internal/")
        {
            Cookie httpOnlyCookie = WebUtils.getCookie(request,HTTP_ONLY_COOKIE_NAME);
            String jwt;

            if (httpOnlyCookie != null)
            {
                jwt = httpOnlyCookie.getValue();
            }
            else
            {
                //! If NO cookie found in the request, proceed without setting authentication context
                response.setHeader(REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER,REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER_VALUE);
                filterChain.doFilter(request, response);//* JwtAuthenticationEntryPoint is executed
                return;
            }

            //* Otherwise proceed with the found JWT...
            String extractedId = null;
            Date extractedIssuedAt = null;
            try
            {
                extractedId = jwtService.extractId(jwt);
                extractedIssuedAt = jwtService.extractIssuedAt(jwt);
            }
            catch (Exception exception)
            {
                if(exception instanceof ExpiredJwtException)
                {
                    request.setAttribute(EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE1,true);
                    request.setAttribute(EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE2, exception);
                    customLogoutHandler.logout(request,response,null);
                }
                else
                {
                    response.setHeader(HttpHeaders.SET_COOKIE, cookieService.createHttpOnlyCookieForDeletion().toString());
                    response.setHeader(REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER,REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER_VALUE);
                    //? here no logout is performed because if we are in this case of scenario it means someone created an httpOnlyCookie with an INVALID JWT and tried to access a secure endpoint  on the backend server. In this case there is no need to logout the actually real user, but it is only need to clear the cookie and redirect the hacker to the login page. The chances for this scenario to happen are slim to none, BUT never ZERO!
                }
                //! If exception is caught, proceed with the next filter/s and then exit the JwtAuthorizationFilter
                filterChain.doFilter(request, response); //* JwtAuthenticationEntryPoint is executed
                return;
            }

            if(SecurityContextHolder.getContext().getAuthentication() == null) //checks if a user is not authenticated
            {
                User user = null;
                try
                {
                    user = userDetailsServiceImpl.loadUserByUsername(extractedId);
                }
                catch (Exception exception)
                {
                    //! If the user cannot be retrieved from the database/cache, then he should be redirected to the login page and his cookie holding the jwt must be deleted.
                    //? This case is possible when the user is deleted from the database and the cache is cleared for the user by the admin, but the user still remains in the cms system and hasn't logged out, then it means that the jwt is still valid but the user does not exist in the database, so a header for cookie clearance is sent along with another header which should be checked inside onError clause on the frontend and if indeed exists the response header with the specific value then the user must be redirected to the login page, context to be cleared and the local storage item also to be deleted all this by the custom hook on the front end
                    response.setHeader(HttpHeaders.SET_COOKIE, cookieService.createHttpOnlyCookieForDeletion().toString());
                    response.setHeader(REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER,REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER_VALUE);
                    filterChain.doFilter(request, response);
                    return;
                }

                if(user.getUserStatus().getStatus().equals(ACTIVE) && user.getUserActivity().getActivity().equals(ONLINE) && !extractedIssuedAt.before(user.getLastLogin()))
                {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
                else
                {
                    //?There is no need to logout user when jwt which was created before the LastLogin is passed. This is because it is impossible for a legitimate user to pass a cookie with jwt, which jwt was created before the last login. This is because on all 3 possible cases when a user logs out with valid or invalalid jwt or access a resurce with expired jwt, the cookie with jwt is deleted from the browser and user is redirected to the login page, so when a user logs in, a new cookie with jwt is created and even if a cookie holding the old jwt stayed somehow in the browser it will be replaced by the new one. SO THE ONLY POSSIBLE OPTION FOR THIS SCENARIO TO HAPPEN "passing created jwt before the last login is or even passing a jwt when a user is not ONLINE or is not ACTIVE" IS FOR A HACKER WHICH SOMEHOW OBTAINED THE COOKIE WITH THE VALID JWT AND TRIES TO ACCESS A PROTECTED RESOURCE ON THE FRONTEND WHICH WILL IMMEDIATELY TRIGGER THE SERVER TO SEND RESPONSE WHICH IS DONE HERE(DELETE THE COOKIE) AND RESPONSE HEADER IS SET FOR REDIRECT TO LOGIN PAGE BUT THE USER IS NOT LOGGED OUT AS IF IN THAT CURRENT MOMENT THE LEGITIMATE USER IS ONLINE ->>>> There is no need to log him out, because a hacker tried to access a protected resource with one of his previous cookie holding jwt which is still active and valid but indeed issued before the last login.
                    response.setHeader(HttpHeaders.SET_COOKIE, cookieService.createHttpOnlyCookieForDeletion().toString());
                    response.setHeader(REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER,REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER_VALUE);
                    filterChain.doFilter(request, response);
                    return;
                }
            }
            filterChain.doFilter(request, response);
        }

        else
        {
            //! If the request does NOT start with "/api/internal", simply pass it along the filter chain
            filterChain.doFilter(request, response);
        }

    }
}
