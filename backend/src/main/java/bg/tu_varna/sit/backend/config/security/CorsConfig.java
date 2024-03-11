package bg.tu_varna.sit.backend.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class CorsConfig {
    private static final Long MAX_AGE = 86400L; //86400s = 24H
    @Value("${env.REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER}")
    private String REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER;

    //!!! "*" wildcards DOES NOT WORK "with credentials" : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
    //source: https://docs.spring.io/spring-security/reference/reactive/integrations/cors.html
    //* allowCredentials is not enabled by default, since that establishes a trust level that exposes sensitive
    //* user-specific information (such as cookies and CSRF tokens) and should be used only where appropriate.
    //* When it is enabled allowOrigins must be set to one or more specific domain (but not the special value "*")
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        //TODO: "https://localhost" should be replaced with original domain name when webapp is deployed
        //corsConfiguration.setAllowedOrigins(List.of("https://localhost")); //this also works, but the line below is preferred, because it written in the docs when you click over "setAllowedOriginPatterns" that it can work along with setAllowCredentials set to true
        corsConfiguration.setAllowedOriginPatterns(List.of("https://localhost")); //? allowedOriginPatterns can be used in combination with setAllowCredentials set to true.
        corsConfiguration.setAllowCredentials(true); //? allows cookies
        corsConfiguration.setAllowedHeaders(List.of("*",REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER)); //!If you do not add the custom header to the CORS configuration, the browser will not expose it to the JavaScript on the client side, even though it might still be sent by the server and visible in the developer tools. When credentials are involved, wildcard characters like "*" do not work as expected. By default, only a few headers are exposed (Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma).
        corsConfiguration.setAllowedMethods(List.of(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name(),
                HttpMethod.OPTIONS.name(),
                HttpMethod.HEAD.name(),
                HttpMethod.TRACE.name(),
                HttpMethod.PATCH.name(),
                "CONNECT"));
        corsConfiguration.setExposedHeaders(List.of("*",REDIRECT_TO_LOGIN_PAGE_RESPONSE_HEADER)); //!!! Should I expose all headers on response ? or not to expose any (new ArrayList<>())? https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/cors/CorsConfiguration.html#setExposedHeaders(java.util.List)  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers

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