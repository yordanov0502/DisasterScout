package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.dto.user.LoginRequestDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.CustomLoginRegexValidation;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationConverter;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class LoginAuthenticationFilter {

    @Value("${env.BACKEND_DOMAIN}")
    private String BACKEND_DOMAIN;
    @Value("${env.BACKEND_SECURED_PATH}")
    private String BACKEND_SECURED_PATH;
    @Value("${env.SAME_SITE_POLICY1}")
    private String SAME_SITE_POLICY1;
    @Value("${env.HTTP_ONLY_COOKIE_NAME}")
    private String HTTP_ONLY_COOKIE_NAME;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;
    private final CustomLoginRegexValidation customLoginRegexValidation;

    @Bean(name = "LoginAuthenticationFilter")
    public AuthenticationFilter loginAuthenticationFilter() {
        //A strategy used for converting from a HttpServletRequest to an Authentication of particular type. Used to authenticate with appropriate AuthenticationManager.   If the result is null, then it signals that no authentication attempt should be made. It is also possible to throw AuthenticationException within the convert(HttpServletRequest) if there was invalid Authentication scheme value.
        AuthenticationConverter authenticationConverter = this::authentication;
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager, authenticationConverter);
        authenticationFilter.setRequestMatcher(LoginAuthenticationFilter::matches);
        authenticationFilter.setSuccessHandler(this::successHandler);
        authenticationFilter.setFailureHandler(this::failureHandler);
        return authenticationFilter;
    }

    private static boolean matches(HttpServletRequest httpServletRequest) {                             //?path of the login endpoint
        return httpServletRequest.getMethod().equals("POST") && httpServletRequest.getRequestURI().equals("/api/external/login");
    }
    private void successHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) {
        if (authentication.isAuthenticated()) {
            User principal = (User) authentication.getPrincipal();
            userService.updateUserActivityAndLastLogin(principal);
            String generatedJWT = jwtService.generateToken(userService.getUserById(principal.getId()));
            //? httpOnlyCookie of type "ResponseCookie" is used instead of type "Cookie", because the "ResponseCookie" type has an attribute SameSite, which I can set for security reasons
            ResponseCookie httpOnlyCookie = ResponseCookie.from(HTTP_ONLY_COOKIE_NAME,generatedJWT)
                    .httpOnly(true)
                    .secure(true) //? Indicates to the browser whether the httpOnlyCookie should only be sent using a secure protocol, such as HTTPS or SSL.
                    .domain(BACKEND_DOMAIN)
                    .path(BACKEND_SECURED_PATH) //! This httpOnlyCookie should be sent from the client to the backend only when this specific path is matched. All secured paths begin with this part.
                    .maxAge(jwtService.getSecondsOfJwtValidity(principal)) //? Max age of the httpOnlyCookie MUST be equal to the validity period of the JWT, just to make sure the httpOnlyCookie is not deleted by the browser while the JWT is still valid (in normal conditions excluding the logout business logic). Both depending on the role of the user.
                    .sameSite(SAME_SITE_POLICY1)
                    .build();
            httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, httpOnlyCookie.toString());
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    private void failureHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException authenticationException) throws IOException {
        httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), authenticationException.getMessage());
    }

    private Authentication authentication(HttpServletRequest request) {
        try
        {
            ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(request);
            Gson gson = new Gson();
            LoginRequestDTO loginRequestDTO = gson.fromJson(requestWrapper.getReader(), LoginRequestDTO.class); //! .getReader() can possibly throw IO exception(it is the reason for the try-catch)
            customLoginRegexValidation.validateLoginRequestDTO(loginRequestDTO); //* validates that username & password match their corresponding regex
            User user = userService.checkUserCredentials(loginRequestDTO); //* checks whether user credentials match with a document(user)/entry from DB/cache and if so return the user
            return new UsernamePasswordAuthenticationToken(user.getId(), loginRequestDTO.getPassword());
        } catch (IOException exception)
        {
            throw new BadCredentialsException("Invalid credentials type.");
        }
    }

}