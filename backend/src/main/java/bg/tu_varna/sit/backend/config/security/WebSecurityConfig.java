package bg.tu_varna.sit.backend.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final SecurityConfig securityConfig;
    //jwtFilter
    //authFilter

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable);
        //http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/panel").hasRole(DEVELOPER.name()));//.hasAnyAuthority()/*Role(ROLE_DEVELOPER.name())*/);//.(/*Role.ROLE_DEVELOPER.toString()*/);
        return http.build();
    }
}
