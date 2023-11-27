package bg.tu_varna.sit.backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig {
    private static final Long MAX_AGE = 86400L; //86400s = 24H

    //source: https://docs.spring.io/spring-security/reference/reactive/integrations/cors.html
    //* allowCredentials is not enabled by default, since that establishes a trust level that exposes sensitive
    //* user-specific information (such as cookies and CSRF tokens) and should be used only where appropriate.
    //* When it is enabled allowOrigins must be set to one or more specific domain (but not the special value "*")
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        //TODO: "http://localhost:5173" should be replaced with original domain name when webapp is deployed
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
        corsConfiguration.setAllowCredentials(true); //? allows cookies
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("*"));
        corsConfiguration.setExposedHeaders(new ArrayList<>());//! No exposed headers for now

        //* Different browsers might have their own maximum limits for caching, and these limits could be much lower
        //* than the value you set. Exceeding these limits could result in the browser defaulting to a lower, more standard value.
        corsConfiguration.setMaxAge(MAX_AGE); // 24H

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); //* CORS policy is applied to all endpoints (/**)
        return source;
    }

    //? Just another alternative (explicit way) which may be used in SecurityFilterChain
//    @Bean
//    public CorsFilter corsFilter() {
//        CorsFilter filter = new CorsFilter(corsConfigurationSource());
//        return filter;
//    }
}