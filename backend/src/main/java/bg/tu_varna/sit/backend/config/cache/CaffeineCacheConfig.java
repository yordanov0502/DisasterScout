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
        cacheManager.registerCustomCache("user", userCache());
        cacheManager.registerCustomCache("zone", zoneCache());
        cacheManager.registerCustomCache("zones", zoneCache()); //? Do I need it

        //! To avoid dynamic caches and be sure each name is assigned to a specific config (dynamic = false)
        //! throws error when tries to use a new cache
        cacheManager.setCacheNames(Collections.emptyList());

        return cacheManager;
    }

    // Cache entries will NEVER expire due to time-based policies because of the .expireAfterAccess() method absence
    private static Cache<Object,Object> userCache() {
        return Caffeine.newBuilder()
                .maximumSize(29) //? 1 admin and 28 dispatchers
                .build();
    }

    // Cache entries will NEVER expire due to time-based policies because of the .expireAfterAccess() method absence
    private static Cache<Object,Object> zoneCache() {
        return Caffeine.newBuilder()
                .maximumSize(28) //? 28 zones
                .build();
    }

}