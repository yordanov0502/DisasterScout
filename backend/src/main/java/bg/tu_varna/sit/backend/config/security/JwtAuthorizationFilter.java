package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.entity.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static bg.tu_varna.sit.backend.models.enums.Status.ACTIVE;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);//header which contains JWT token
        final String jwt;
        String extractedId=null;

        if (authHeader == null || !authHeader.startsWith("Bearer "))
        {
            filterChain.doFilter(request, response);//passing request and response to the next filter
            return;
        }

        jwt = authHeader.substring(7);
        try
        {
            extractedId = jwtService.extractId(jwt);
        }
        catch (ExpiredJwtException exception){
            System.out.println("JWT expired");
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


        if(extractedId != null && SecurityContextHolder.getContext().getAuthentication() == null) //checks if a user is not authenticated
             {
                User user = userDetailsServiceImpl.loadUserByUsername(extractedId);
                 //? A user status should be changed from ACTIVE(default) to LOCKED if too many login attempts are applied
                 //! ONLY ADMIN should be able to activate again user account
                if(extractedId.equals(user.getId()) && user.getStatus().equals(ACTIVE))
                {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
             }

        filterChain.doFilter(request, response);
    }
}
