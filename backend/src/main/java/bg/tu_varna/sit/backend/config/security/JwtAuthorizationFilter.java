package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.entity.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.Date;

import static bg.tu_varna.sit.backend.models.enums.user.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Status.ACTIVE;

//? This filter is applied every time when someone tries to access a protected endpoint
//? and if the "someone" has a valid JWT, a UsernamePasswordAuthenticationToken is created for this "someone" and then
//? added to the context of the SecurityContextHolder, which means that this "someone" has become
//? an authenticated user a.k.a "principal" BUT ONLY for the specific request executed within a thread from the thread pool
@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Value("${env.HTTP_ONLY_COOKIE_NAME}")
    private String HTTP_ONLY_COOKIE_NAME;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String jwt;

        //? Check whether the request contains a cookie with name "httpOnlyCookie"
        Cookie httpOnlyCookie = WebUtils.getCookie(request,HTTP_ONLY_COOKIE_NAME);

        if (httpOnlyCookie != null)
        {
            //* Extract jwt from the httpOnlyCookie
            jwt = httpOnlyCookie.getValue();
        }
        else
        {
            //! If no cookie found, proceed without setting authentication context
            filterChain.doFilter(request, response);
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
        catch (ExpiredJwtException exception){
            System.out.println("JWT expired");
            //????????????????????????????????????
            //!!! IF JWT IS EXPIRED, THEN THE USER ACTIVITY MUST BE SET TO "OFFLINE" right here by calling the method(to be created if it doesn't exist) for logout in the userService calling the method "updateUserActivityOnLogout(User user)" from the userCacheService respectfully and ALSO INVALIDATING THE httpOnlyCookie on the frontEnd with setting its maxAge at 0(A value of 0 means the cookie should expire immediately)
            //????????????????????????????????????
        }
        catch (SignatureException | MalformedJwtException | UnsupportedJwtException exception){
            System.out.println("Signature exception");
        }
        catch (JwtException exception){
            System.out.println("JwtException");
        }
        catch (IllegalArgumentException exception){
            System.out.println("Unable to get JWT token");
        }

        if(extractedId != null && extractedIssuedAt != null && SecurityContextHolder.getContext().getAuthentication() == null) //checks if a user is not authenticated
             {
                User user = userDetailsServiceImpl.loadUserByUsername(extractedId);
                 //? A user status should be changed from ACTIVE(default) to LOCKED if too many(20 consecutive) login attempts are applied
                 //* user is checked whether it is null or not because it is possible for a jwt to be valid after user logged in but if an admin theoretically deletes the account of the user, the jwt will still be active and valid for certain time and if someone uses the jwt of a user which id does not exist in the DB/cache server error will be produced
                 if(user!=null && user.getStatus().equals(ACTIVE) && user.getActivity().equals(ONLINE) && !jwtService.extractIssuedAt(jwt).before(user.getLastLogin()))
                {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
             }

        filterChain.doFilter(request, response);
    }
}
