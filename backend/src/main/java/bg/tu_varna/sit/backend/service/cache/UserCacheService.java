package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.dto.user.RegistrationDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserDTO;
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
import static bg.tu_varna.sit.backend.models.enums.Role.DISPATCHER;
import static bg.tu_varna.sit.backend.models.enums.Status.ACTIVE;
import static bg.tu_varna.sit.backend.models.enums.Status.LOCKED;

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
    public User registerNewDispatcher(RegistrationDTO registrationDTO,String encodedPassword) {
        User newUser = User.builder()
                .firstName(registrationDTO.firstName())
                .lastName(registrationDTO.lastName())
                .email(registrationDTO.email())
                .username(registrationDTO.username())
                .password(encodedPassword)
                .role(DISPATCHER)
                .status(ACTIVE)
                .activity(OFFLINE)
                .lastLogin(timeService.getInitialUnixEpochDateAndTimeInEET())
                .build();
        return userRepository.save(newUser);
    }


    //* Updates existing user and all related caches.
   @Caching(
    put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    public User updateUser(User user, UserDTO userDTO){
        User updatedUser = user.toBuilder() //! should be exatly the same user with old data -> if admin updates other user , the other data from the admin which is not updated will be casted to the user about to be and eventually updated leading to mismathcing of data and breaking whole business logic of application
                .firstName(userDTO.firstName())
                .lastName(userDTO.lastName())
                .username(userDTO.username())
                .email(userDTO.email())
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

    //? Updates DB and caches when a user is LOCKED
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
   public User lockUser(User user){
        User updatedUser = user.toBuilder()
                .status(LOCKED)
                .activity(OFFLINE)
                .build();
        return userRepository.save(updatedUser);
   }

    //? Updates DB and caches when a user is UNLOCKED
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            @CachePut(value = "users", key = "#result.id", unless = "#result == null")
    })
    public User unlockUser(User user){
        User updatedUser = user.toBuilder()
                .status(ACTIVE)
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