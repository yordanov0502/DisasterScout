package bg.tu_varna.sit.backend.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static bg.tu_varna.sit.backend.models.enums.Role.ADMIN;
import static bg.tu_varna.sit.backend.models.enums.Role.USER;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final SecurityConfig securityConfig;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final AuthenticationFilter loginAuthenticationFilter; //* Here AuthenticationFilter is bean LoginAuthenticationFilter

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.authenticationManager(securityConfig.authenticationManager());
        http.addFilterAt(loginAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtAuthorizationFilter, loginAuthenticationFilter.getClass());
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/external/**","/error").permitAll());
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/internal/admin/**").hasRole(ADMIN.name())); //"ROLE_" is automatically prepended as requirement
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/internal/user/**").hasAnyRole(USER.name(), ADMIN.name())); //"ROLE_" is automatically prepended as requirement
        http.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint));
        http.sessionManagement((sessionManagement)-> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
}
