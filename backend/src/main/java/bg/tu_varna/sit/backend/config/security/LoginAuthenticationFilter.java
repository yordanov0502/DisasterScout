package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.dto.user.LoginDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.CustomLoginRegexValidation;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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

    private static boolean matches(HttpServletRequest httpServletRequest) {
        return httpServletRequest.getMethod().equals("POST") && httpServletRequest.getRequestURI().equals("/api/external/login");
    }
    private void successHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) {
        if (authentication.isAuthenticated()) {
            User principal = (User) authentication.getPrincipal();
            userService.updateUserActivityAndLastLogin(principal);
            httpServletResponse.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + jwtService.generateToken(userService.getUserById(principal.getId())));
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
            LoginDTO loginDTO = gson.fromJson(requestWrapper.getReader(), LoginDTO.class); //! .getReader() can possibly throw IO exception(it is the reason for the try-catch)
            customLoginRegexValidation.validateLoginDTO(loginDTO); //* validates that username & password match their corresponding regex
            User user = userService.checkUserCredentials(loginDTO); //* checks whether user credentials match with a document(user)/entry from DB/cache and if so return the user
            return new UsernamePasswordAuthenticationToken(user.getId(), loginDTO.getPassword());
        } catch (IOException exception)
        {
            throw new BadCredentialsException("Invalid credentials type.");
        }
    }

}