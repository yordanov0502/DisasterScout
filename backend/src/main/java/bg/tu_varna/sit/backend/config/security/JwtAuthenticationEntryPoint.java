package bg.tu_varna.sit.backend.config.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        //*This method will be called when a user tries to access a protected resource without a valid JWT
        //*or with an expired/invalid JWT or even without a JWT.
        System.out.println("JwtAuthenticationEntryPoint executed");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"/*HttpStatus.UNAUTHORIZED.getReasonPhrase()*/);
    }
}
