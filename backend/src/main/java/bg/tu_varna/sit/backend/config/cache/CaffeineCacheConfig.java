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
        cacheManager.registerCustomCache("role",roleCache());
        cacheManager.registerCustomCache("status",statusCache());
        cacheManager.registerCustomCache("activity",activityCache());
        cacheManager.registerCustomCache("zone", zoneCache());
        cacheManager.registerCustomCache("zones", zonesCache());
        cacheManager.registerCustomCache("level", levelCache());
        cacheManager.registerCustomCache("action", actionCache());
        cacheManager.registerCustomCache("severity", severityCache());
        cacheManager.registerCustomCache("state", stateCache());
        cacheManager.registerCustomCache("issue",issueCache());

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

    private static Cache<Object,Object> roleCache() {
        return Caffeine.newBuilder()
                .maximumSize(2) //? DISPATCHER/ADMIN
                .build();
    }

    private static Cache<Object,Object> statusCache() {
        return Caffeine.newBuilder()
                .maximumSize(2) //? ACTIVE/LOCKED
                .build();
    }

    private static Cache<Object,Object> activityCache() {
        return Caffeine.newBuilder()
                .maximumSize(2) //? ONLINE/OFFLINE
                .build();
    }

    // Cache entries will NEVER expire due to time-based policies because of the .expireAfterAccess() method absence
    private static Cache<Object,Object> zoneCache() {
        return Caffeine.newBuilder()
                .maximumSize(28) //? 28 zones
                .build();
    }

    private static Cache<Object,Object> zonesCache() {
        return Caffeine.newBuilder()
                .maximumSize(1) //? 1 cache entry with a single key, holding a value(list of all zones)
                .build();
    }

    private static Cache<Object,Object> levelCache() {
        return Caffeine.newBuilder()
                .maximumSize(5) //? 5 levels (DEBUG,INFO,WARN,ERROR,FATAL)
                .build();
    }

    private static Cache<Object,Object> actionCache() {
        return Caffeine.newBuilder()
                .maximumSize(11) //? 11 actions
                .build();
    }

    private static Cache<Object,Object> severityCache() {
        return Caffeine.newBuilder()
                .maximumSize(4) //? 4 severity types (LOW,MEDIUM,HIGH,CRITICAL)
                .build();
    }

    private static Cache<Object,Object> stateCache() {
        return Caffeine.newBuilder()
                .maximumSize(5) //? 5 report state types (PENDING, FRESH, FOR_REVALUATION, INACTIVE, ARCHIVED)
                .build();
    }

    private static Cache<Object,Object> issueCache() {
        return Caffeine.newBuilder()
                .maximumSize(45) //? 45 report issues
                .build();
    }
}