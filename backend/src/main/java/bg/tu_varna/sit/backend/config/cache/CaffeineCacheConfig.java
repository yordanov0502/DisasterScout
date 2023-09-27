package bg.tu_varna.sit.backend.config.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;

//? .recordStats() can be used with Caffeine builder to monitor metrics
@Configuration
public class CaffeineCacheConfig {
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.registerCustomCache("user",smallCache());
        cacheManager.registerCustomCache("username",smallCache());
        cacheManager.registerCustomCache("email",smallCache());
        cacheManager.registerCustomCache("users",smallCache());

        //! To avoid dynamic caches and be sure each name is assigned to a specific config (dynamic = false)
        //! throws error when tries to use a new cache
        cacheManager.setCacheNames(Collections.emptyList());

        return cacheManager;
    }

    //* Entries in this type of cache will never automatically expire due to time-based policies.
    private static Cache<Object,Object> smallCache() {
        return Caffeine.newBuilder()
                .maximumSize(5)
                .build();
    }

}