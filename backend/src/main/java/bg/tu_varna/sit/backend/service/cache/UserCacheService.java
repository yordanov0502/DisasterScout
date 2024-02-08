package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.repository.UserRepository;
import bg.tu_varna.sit.backend.service.util.TimeService;
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

import static bg.tu_varna.sit.backend.models.enums.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.Activity.ONLINE;

//? More info about unless cache clause -> https://stackoverflow.com/questions/12113725/how-do-i-tell-spring-cache-not-to-cache-null-value-in-cacheable-annotation

@Service
@AllArgsConstructor
@Slf4j
public class UserCacheService {

    private final UserRepository userRepository;
    //private final CacheManager cacheManager;
    private final TimeService timeService;


    //* Saves a new user to DB and all related caches.
    //? CachePut is used instead of Cacheable, because I want the result(new user data) to be cached after it has been added to the DB.
    //! This method should be invoked only once(when we want to create a new user) and never again for the same user.
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    public User saveUser(User user) {return userRepository.save(user);}

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO BE IMPLEMENTED CAREFULLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //* Updates existing user and all related caches.
    //! We first evict the old entries from username(x1) and email(x1) caches related to a specific user.
    //! Then we cache new entries to username(x1) and email(x1) caches related to the specific user.
    //! This is done, because even if we update the values of existing entries, we cannot update the keys.
    //! The aforementioned statement does NOT relate to user and users caches, because they use IDs of users as keys, which are never meant to be changed once created(IDs of users). So entries of user(x1) and users(x1) caches are directly updated.
    @Caching(
    put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    //!!!!!!!!!!!!!!! This method is used for testing purpose (testing cache and etc.)
    public User updateUser(User user,String oldUsername,String oldEmail){return userRepository.save(user);}
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO BE IMPLEMENTED CAREFULLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //? Updates DB and caches when a user logs out
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    public User updateUserActivityOnLogout(User user) {
        User updatedUser = user.toBuilder()
                .activity(OFFLINE)
                .build();
        return userRepository.save(updatedUser);
        }

    //? Updates DB and caches when a user logs in
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    public User updateUserActivityAndLastLogin(User user) {
        User updatedUser = user.toBuilder()
                .activity(ONLINE)
                .lastLogin(timeService.getCurrentDateAndTimeInBulgaria())
                .build();
        return userRepository.save(updatedUser);
    }

    //* Evicts a user from all related caches
    //? This will be useful when admin decides to modify the production database directly(due to different reasons)
    //? and data inconsistency(between the cache and DB) occur in the real web application
    //!!!!! So this should be accessed by endpoint given specific user for which the cache to be invalidated and moreover every dispatcher and admin must have a button for cache invalidation on the front end which should be available only to the admin/s of the whole system
    @Caching(evict = {
            @CacheEvict(value = "user", key = "#user.id", beforeInvocation = true),
            @CacheEvict(value = "users", key = "#user.id", beforeInvocation = true)
    })
    public void evictUserFromCache(User user){}

    //* Evicts all entries from user-related caches.
    @Caching(evict = {
            @CacheEvict(value = "user", allEntries = true, beforeInvocation = true),
            @CacheEvict(value = "users", allEntries = true, beforeInvocation = true)
    })
    public void evictAllUserCaches(){}

    @Cacheable(value = "user", key = "#id", unless = "#result == null")
    public User getUserById(String id) {return userRepository.findUserById(id);}

    public User getUserByUsername(String username){return userRepository.findUserByUsername(username);}

    public User getUserByEmail(String email){return userRepository.findUserByEmail(email);}

   //! Why do I need "users" cache ? Is "user" cache not enough for retrieval of all users ?

//    @PostConstruct
//    public void printCacheContentUSER_ID() {
//        // Replace "myCache" with the name of your cache
//        Cache<Object, Object> caffeineCache = (Cache<Object, Object>) cacheManager.getCache("user").getNativeCache();
//
//        System.out.println("********user-ID*********");
//        // Print cache contents
//        caffeineCache.asMap().forEach((key, value) -> {
//            System.out.println("Key: " + key + ", Value: " + value);
//        });System.out.println("*****************");
//
//
//    }

}