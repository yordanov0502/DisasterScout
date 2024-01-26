package bg.tu_varna.sit.backend.config.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.concurrent.TimeUnit;

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

    //If I want the cache entries to NEVER expire due to time-based policies, I must remove the .expireAfterAccess() method.
    private static Cache<Object,Object> smallCache() {
        return Caffeine.newBuilder()
                .maximumSize(29) //? 1 admin and 28 dispatchers
                .expireAfterAccess(15, TimeUnit.MINUTES) //? Each cache entry has its own timer. When an entry is accessed (read or written), its timer is reset.
                .build();
    }

}