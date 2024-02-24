package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.service.util.CookieService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.util.WebUtils;

import static java.lang.Boolean.TRUE;

//! When this CustomLogoutHandler is called from wherever, but NOT from the endpoint set in the security filter chain ,
//! then the operations declared along with it(set in the security filter chain) WILL NOT EXECUTE.(1st statement - if)
//* The operations declared(in the security filter chain) along with this CustomLogoutHandler will ONLY execute
//* if the specified endpoint(set in the security filter chain) is accessed.(2nd statement - else)
@Configuration
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {

    @Value("${env.HTTP_ONLY_COOKIE_NAME}")
    private String HTTP_ONLY_COOKIE_NAME;
    @Value("${env.EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE1}")
    private String EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE1;
    @Value("${env.EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE2}")
    private String EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE2;
    @Value("${env.JWT_CLAIM_NAME_FOR_USER_ID}")
    private String JWT_CLAIM_NAME_FOR_USER_ID;
    private final UserService userService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final JwtService jwtService;
    private final CookieService cookieService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        //? This if statement is ONLY executed when ExpiredJwtException was thrown and caught inside JwtAuthorizationFilter.
        //? (when a user has tried to access a protected resource with expired jwt stored inside the httpOnlyCookie)
        //* When this statement is true, we manually delete the httpOnlyCookie.
        Boolean requestAttributeForJwtExpiration = (Boolean) request.getAttribute(EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE1);//? If a ExpiredJwtException was thrown inside the JwtAuthorizationFilter, then this request attribute must have been set
        if(requestAttributeForJwtExpiration != null && requestAttributeForJwtExpiration.equals(TRUE))
        {System.out.println("Entered unintentional logout case");
            String extractedId = null;
            try
            {
                ExpiredJwtException expiredJwtException = (ExpiredJwtException) request.getAttribute(EXPIRED_JWT_EXCEPTION_REQUEST_ATTRIBUTE2);
                extractedId = expiredJwtException.getClaims().get(JWT_CLAIM_NAME_FOR_USER_ID,String.class);
            }
            catch (Exception exception)
            {
                System.out.println("Error extracting user ID from expired JWT: " + exception.getMessage());
            }

            if(extractedId != null)
            {
                User user = userDetailsServiceImpl.loadUserByUsername(extractedId);
                if(user != null)
                {
                    userService.logout(user);
                }
            }

            response.setHeader(HttpHeaders.SET_COOKIE, cookieService.createHttpOnlyCookieForDeletion().toString()); //? Here we call the cookieService in order to create httpOnlyCookie for deletion and send it back as a header in the response.
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        //? This statement is ONLY executed when a user sends a logout request himself.
        //* When this statement is executed, the httpOnlyCookie is deleted automatically.(by the configuration in the security filter chain)
        //! It is also POSSIBLE(very rarely) for the user to send a logout request with expired jwt inside the httpOnlyCookie.
        //! Because of this small possibility, several catch blocks are used down below when extracting the userId from the token,
        //! just like it is done inside the JwtAuthorizationFilter.
        else
        {
            System.out.println("Entered intentional logout case");
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
                return; //! If no httpOnlyCookie was sent with the request exit the CustomLogoutHandler
            }

            //* Otherwise proceed with the found JWT...
            String extractedId = null;
            try
            {
                extractedId = jwtService.extractId(jwt);
            }
            catch (ExpiredJwtException expiredJwtException){
                //* This code executes ONLY when a user wants to logout, but his jwt has expired
                try{
                    extractedId = expiredJwtException.getClaims().get(JWT_CLAIM_NAME_FOR_USER_ID,String.class);
                }
                catch (Exception exception){
                    System.out.println("Error extracting user ID from expired JWT: " + exception.getMessage());
                }

                if(extractedId != null)
                {
                    User user = userDetailsServiceImpl.loadUserByUsername(extractedId);
                    if(user != null)
                    {
                        userService.logout(user);
                    }
                }
                return;
            }
            catch (SignatureException | MalformedJwtException | UnsupportedJwtException exception){
                System.out.println("Signature exception");
                return;
            }
            catch (JwtException exception){
                System.out.println("JwtException");
                return;
            }
            catch (IllegalArgumentException exception){
                System.out.println("Unable to get JWT token");
                return;
            }

            //* This code executes ONLY when a user wants to logout with still valid(not expired) jwt
            User user = userDetailsServiceImpl.loadUserByUsername(extractedId);
            userService.logout(user);
        }

    }
}
