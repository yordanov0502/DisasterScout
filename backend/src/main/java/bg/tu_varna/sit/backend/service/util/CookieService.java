package bg.tu_varna.sit.backend.service.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CookieService {
    @Value("${env.BACKEND_DOMAIN}")
    private String BACKEND_DOMAIN;
    @Value("${env.BACKEND_SECURED_PATH}")
    private String BACKEND_SECURED_PATH;
    @Value("${env.SAME_SITE_POLICY1}")
    private String SAME_SITE_POLICY1;
    @Value("${env.HTTP_ONLY_COOKIE_NAME}")
    private String HTTP_ONLY_COOKIE_NAME;
    private final TimeService timeService;

    //? httpOnlyCookie of type "ResponseCookie" is used instead of type "Cookie", because the "ResponseCookie" type has an attribute SameSite, which I can use and set for security reasons
    public ResponseCookie createHttpOnlyCookie(String generatedJWT){
        return ResponseCookie.from(HTTP_ONLY_COOKIE_NAME,generatedJWT)
                .httpOnly(true)
                .secure(true) //? Indicates to the browser whether the httpOnlyCookie should only be sent using a secure protocol, such as HTTPS or SSL.
                .domain(BACKEND_DOMAIN)
                .path(BACKEND_SECURED_PATH) //! This httpOnlyCookie should be sent from the client to the backend only when this specific path is matched. All secured paths begin with this part.
                .maxAge(timeService.getMaxAgeOfHttpOnlyCookie()) //? Max age of the httpOnlyCookie is set to 48 hours. The reason for this long duration of maxAge is due to the fact that the httpOnlyCookie must be available on the browser after the JWT inside of it is expired. If they both have equal maxAge then it would be impossible for the server to logout the user automatically when he sends the cookie with the expired jwt, because simply put there will be no cookie as it would also have expired from the browser due to the fact that it has the same MaxAge as the jwt. Theoretically if the user has not logged out by his will and remains inactive(does not send any requests to the server) on the frontend after 48 hours the HttpOnlyCookie will be automatically deleted and would again be impossible for the server to logout the user automatically when he sends requests after those 48hours. So in that case, the solution is simply: admin with the access to the database manually updates the Activity field from ONLINE to OFFLINE and then clears the cache for the specific user(clicks a button on the frontend to do it)
                .sameSite(SAME_SITE_POLICY1)
                .build();
    }

    public ResponseCookie createHttpOnlyCookieForDeletion(){
        return ResponseCookie.from(HTTP_ONLY_COOKIE_NAME,"")
                .httpOnly(true)
                .secure(true) //? Indicates to the browser whether the httpOnlyCookie should only be sent using a secure protocol, such as HTTPS or SSL.
                .domain(BACKEND_DOMAIN)
                .path(BACKEND_SECURED_PATH) //! This httpOnlyCookie should be sent from the client to the backend only when this specific path is matched. All secured paths begin with this part.
                .maxAge(0) //? Max age of the httpOnlyCookie MUST be equal to the validity period of the JWT, just to make sure the httpOnlyCookie is not deleted by the browser while the JWT is still valid (in normal conditions excluding the logout business logic). Both depending on the role of the user.
                .sameSite(SAME_SITE_POLICY1)
                .build();
    }

}
