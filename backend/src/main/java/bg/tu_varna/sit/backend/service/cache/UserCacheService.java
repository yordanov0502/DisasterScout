package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.repository.UserRepository;
import com.github.benmanes.caffeine.cache.Cache;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserCacheService {

    private final UserRepository userRepository;
    //private final CacheManager cacheManager;


    //* Saves a new user to DB and all related caches.
    //? CachePut is used instead of Cacheable, because I want the result(new user data) to be cached after it has been added to the DB.
    //! This method should be invoked only once(when we want to create a new user) and never again for the same user.
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "username", key = "#result.username", unless = "#result == null"),
            @CachePut(value = "email", key = "#result.email", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    public User saveUser(User user) {return userRepository.save(user);}

    //* Updates existing user and all related caches.
    //! We first evict the old entries from username(x1) and email(x1) caches related to a specific user.
    //! Then we cache new entries to username(x1) and email(x1) caches related to the specific user.
    //! This is done, because even if we update the values of existing entries, we cannot update the keys.
    //! The aforementioned statement does NOT relate to user and users caches, because they use IDs of users as keys, which are never meant to be changed once created(IDs of users). So entries of user(x1) and users(x1) caches are directly updated.
    @Caching(evict = {
            @CacheEvict(value = "username", key = "#oldUsername", beforeInvocation = true),
            @CacheEvict(value = "email", key = "#oldEmail", beforeInvocation = true)
    },
    put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "username", key = "#result.username", unless = "#result == null"),
            @CachePut(value = "email", key = "#result.email", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    public User updateUser(User user,String oldUsername,String oldEmail){return userRepository.save(user);}

    //* Deletes a user from DB and all related caches.
    @Caching(evict = {
            @CacheEvict(value = "user", key = "#user.id"),
            @CacheEvict(value = "username", key = "#user.username"),
            @CacheEvict(value = "email", key = "#user.email"),
            @CacheEvict(value = "users", key = "#user.id")
    })
    public void deleteUser(User user) {userRepository.delete(user);}


    @Cacheable(value = "user", key = "#id", unless = "#result == null")
    public User getUserById(String id) {return userRepository.findUserById(id);}

    @Cacheable(value = "username", key = "#username", unless = "#result == null")
    public User getUserByUsername(String username){return userRepository.findUserByUsername(username);}

    @Cacheable(value = "email", key = "#email", unless = "#result == null")
    public User getUserByEmail(String email){return userRepository.findUserByEmail(email);}

    //* Evicts all entries from user-related caches.
    @Caching(evict = {
            @CacheEvict(value = "user", allEntries = true, beforeInvocation = true),
            @CacheEvict(value = "username", allEntries = true, beforeInvocation = true),
            @CacheEvict(value = "email", allEntries = true, beforeInvocation = true),
            @CacheEvict(value = "users", allEntries = true, beforeInvocation = true)
    })
    public void evictAllUserCaches(){}

    //* Evicts a user from all related caches
    //? This will be useful when admin decides to modify the production database directly(due to different reasons)
    //? and data inconsistency(between the cache and DB) occur in the real web application
    @Caching(evict = {
            @CacheEvict(value = "user", key = "#user.id", beforeInvocation = true),
            @CacheEvict(value = "username", key = "#user.username", beforeInvocation = true),
            @CacheEvict(value = "email", key = "#user.email", beforeInvocation = true),
            @CacheEvict(value = "users", key = "#user.id", beforeInvocation = true)
    })
    public void evictUserFromCache(User user){}






    /*@PostConstruct
    public void printCacheContentUSER_ID() {
        // Replace "myCache" with the name of your cache
        Cache<Object, Object> caffeineCache = (Cache<Object, Object>) cacheManager.getCache("user").getNativeCache();

        System.out.println("********user-ID*********");
        // Print cache contents
        caffeineCache.asMap().forEach((key, value) -> {
            System.out.println("Key: " + key + ", Value: " + value);
        });System.out.println("*****************");


    }

    @PostConstruct
    public void printCacheContentsUSERNAME_USERNAME() {
        // Replace "myCache" with the name of your cache

        Cache<Object, Object> caffeineCache1 = (Cache<Object, Object>) cacheManager.getCache("username").getNativeCache();


        System.out.println("------------username-username------------");
        caffeineCache1.asMap().forEach((key, value) -> {
            System.out.println("Key1: " + key + ", Value1: " + value);
        });System.out.println("------------------------");
    }

    @PostConstruct
    public void printCacheContentEMAIL_EMAIL() {
        // Replace "myCache" with the name of your cache
        Cache<Object, Object> caffeineCache = (Cache<Object, Object>) cacheManager.getCache("email").getNativeCache();

        System.out.println("((((((((((((((((((((email-email((((((((((((((((((");
        // Print cache contents
        caffeineCache.asMap().forEach((key, value) -> {
            System.out.println("Key2: " + key + ", Value2: " + value);
        });System.out.println("((((((((((((((((((((((((((((((((((((((((((((((((");
    }
*/
}