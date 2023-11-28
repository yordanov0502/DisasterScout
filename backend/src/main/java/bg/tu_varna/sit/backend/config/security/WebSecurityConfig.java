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

    private final CorsConfig corsConfig;
    private final SecurityConfig securityConfig;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final AuthenticationFilter loginAuthenticationFilter; //* Here AuthenticationFilter is bean LoginAuthenticationFilter

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        //! cors: https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html
        //http.addFilterBefore(corsConfig.corsFilter(), ChannelProcessingFilter.class); //? Just another alternative(explicit way for creating CORS filter)
        http.cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource())); //* (implicit way for creating CORS filter)This tells Spring Security to use the CorsConfigurationSource provided by the corsConfig bean for CORS configuration. It effectively registers a CorsFilter with the provided CORS configuration within the Spring Security filter chain. This method allows for integrating CORS with Spring Security, ensuring that CORS is handled first, before Spring Security's authentication and authorization checks. It has the same effect as adding a CorsFilter before the ChannelProcessingFilter.
        http.headers(headers -> headers.httpStrictTransportSecurity(hsts -> hsts.includeSubDomains(true).preload(true).maxAgeInSeconds(31536000))); //! The HSTS header is only sent over HTTPS responses. It ensures that their browsers always connect to a website over HTTPS. https://docs.spring.io/spring-security/reference/features/exploits/headers.html#headers-hsts
        http.requiresChannel(requiresChannel -> requiresChannel.anyRequest().requiresSecure()); //! For DEV: This configuration ensures that any request requires a secure channel (HTTPS). Usually self-signed certificate is used in this case
        //!http.requiresChannel(requiresChannel -> requiresChannel.requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure()); //! For PROD: This configuration tells Spring Security to apply the HTTPS requirement only to requests with a header "X-Forwarded-Proto", which is typical for requests forwarded by a reverse proxy. Usually SSL certificate from CA is used in this case. Ensure that your reverse proxy or load balancer is correctly set up to handle SSL termination and forward the X-Forwarded-Proto header to your application. The changes for a production environment primarily involve configuring your application to understand and respect the X-Forwarded-Proto header. This ensures that even if SSL termination is handled by a reverse proxy, your application can still enforce HTTPS correctly.
        http.authenticationManager(securityConfig.authenticationManager());
        http.addFilterAt(loginAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtAuthorizationFilter, loginAuthenticationFilter.getClass());
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/external/**","/error").permitAll());
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/internal/admin/**").hasRole(ADMIN.name())); //"ROLE_" is automatically prepended as requirement
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/internal/user/**").hasAnyRole(USER.name(), ADMIN.name())); //"ROLE_" is automatically prepended as requirement
        http.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint));
        http.sessionManagement((sessionManagement)-> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.csrf(AbstractHttpConfigurer::disable);
        //TODO: Strict CSP (to prevent potential XSS attacks, despite the fact that user input is validated by regex)
        return http.build();
    }
}
