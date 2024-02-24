package bg.tu_varna.sit.backend.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import static bg.tu_varna.sit.backend.models.enums.user.Role.*;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final CorsConfig corsConfig;
    private final SecurityConfig securityConfig;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final AuthenticationFilter loginAuthenticationFilter; //* Here AuthenticationFilter is bean LoginAuthenticationFilter
    private final CustomLogoutHandler customLogoutHandler;
    @Value("${env.HTTP_ONLY_COOKIE_NAME}")
    private String HTTP_ONLY_COOKIE_NAME;

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
        //? "Since the LogoutFilter appears before the AuthorizationFilter in the filter chain, it is not necessary by default to explicitly permit the /logout endpoint. Thus, only custom logout endpoints that you create inside controllers yourself generally require a permitAll configuration to be reachable."
        http.logout(logout -> logout.logoutUrl("/api/external/logout") //? Uses POST method by default
                .addLogoutHandler(customLogoutHandler)
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
                .clearAuthentication(true)
                .deleteCookies(HTTP_ONLY_COOKIE_NAME) //! This scope is not triggered when we enter the first case of the customLogoutHandler. Thats why in that first case we manually delete the cookie when we call cookieService and get cookie for deletion
        );
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/external/**","/error").permitAll());
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/internal/admin/**").hasRole(ADMIN.name())); //"ROLE_" is automatically prepended as requirement
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/internal/dispatcher/**").hasAnyRole(DISPATCHER.name(), ADMIN.name())); //"ROLE_" is automatically prepended as requirement
        http.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint));
        http.sessionManagement((sessionManagement)-> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.csrf(AbstractHttpConfigurer::disable);
        //TODO: Strict CSP (to prevent potential XSS attacks, despite the fact that user input is validated by regex) // Using HttpOnly cookies for authentication tokens is a best practice to mitigate XSS (Cross-Site Scripting) attacks, as it prevents malicious scripts from accessing the authentication token.
        //TODO: [Cross-Origin Isolated: NO] to be reviewed at certain point -> Developer Tools -> Application
        //TODO: [COEP: None] to be reviewed at certain point -> Developer Tools -> Application
        //TODO: [COOP: UnsafeNone] to be reviewed at certain point -> Developer Tools -> Application
        return http.build();
    }
}
