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
import java.util.Date;

import static bg.tu_varna.sit.backend.models.enums.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.Status.ACTIVE;

//? This filter is applied every time when someone tries to access a protected endpoint
//? and if the "someone" has a valid JWT, a UsernamePasswordAuthenticationToken is created for this "someone" and then
//? added to the context of the SecurityContextHolder, which means that this "someone" has become
//? an authenticated user a.k.a "principal" BUT ONLY for the specific request executed within a thread from the thread pool
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
        Date extractedIssuedAt=null;

        if (authHeader == null || !authHeader.startsWith("Bearer "))
        {
            filterChain.doFilter(request, response);//passing request and response to the next filter
            return;
        }

        jwt = authHeader.substring(7);
        try
        {
            extractedId = jwtService.extractId(jwt);
            extractedIssuedAt = jwtService.extractIssuedAt(jwt);
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
        //!System.out.println("JWT authorization filter executed");

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
