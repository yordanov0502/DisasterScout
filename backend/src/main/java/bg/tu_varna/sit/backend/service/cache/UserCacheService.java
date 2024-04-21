package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.dto.user.RegistrationRequestDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserUpdateDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.user.Role;
import bg.tu_varna.sit.backend.repository.UserRepository;
import bg.tu_varna.sit.backend.service.ZoneService;
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

import java.util.ArrayList;
import java.util.List;

import static bg.tu_varna.sit.backend.models.enums.user.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Role.DISPATCHER;
import static bg.tu_varna.sit.backend.models.enums.user.Status.ACTIVE;
import static bg.tu_varna.sit.backend.models.enums.user.Status.LOCKED;

//? More info about unless cache clause -> https://stackoverflow.com/questions/12113725/how-do-i-tell-spring-cache-not-to-cache-null-value-in-cacheable-annotation

@Service
@AllArgsConstructor
@Slf4j
public class UserCacheService {

    private final UserRepository userRepository;
    private final CacheManager cacheManager;
    private final TimeService timeService;
    private final ZoneService zoneService;


    //* Saves a new user to DB and all related caches.
    //? CachePut is used instead of Cacheable, because I want the result(new user data) to be cached after it has been added to the DB.
    //! This method should be invoked only once(when we want to create a new user) and never again for the same user.
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
    })
    public User registerNewDispatcher(RegistrationRequestDTO registrationRequestDTO, String encodedPassword) {
        User newUser = User.builder()
                .id(registrationRequestDTO.id())
                .firstName(registrationRequestDTO.firstName())
                .lastName(registrationRequestDTO.lastName())
                .email(registrationRequestDTO.email())
                .username(registrationRequestDTO.username())
                .password(encodedPassword)
                .role(DISPATCHER)
                .status(ACTIVE)
                .activity(OFFLINE)
                .lastLogin(timeService.getUnixEpochDateAndTime())
                .unsuccessfulLoginAttempts(0)
                //! If circular dependency issue occur due to the injection of the ZoneService, ZoneCacheService can be used instead
                .availableZones(new ArrayList<>(List.of(zoneService.getZoneById(registrationRequestDTO.initialZoneId()))))
                .build();
        return userRepository.save(newUser);
    }


    //* Updates existing user and all related caches.
   @Caching(
    put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
    })
    public User updateUser(User user, UserUpdateDTO userUpdateDTO){
        User updatedUser = user.toBuilder()
                .firstName(userUpdateDTO.firstName())
                .lastName(userUpdateDTO.lastName())
                .username(userUpdateDTO.username())
                .email(userUpdateDTO.email())
                .build();
        return userRepository.save(updatedUser);
    }

    @Caching(
            put = {
                    @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            })
    public User updatePassword(User user,String newEncodedPassword){
        User updatedUser = user.toBuilder()
                .password(newEncodedPassword)
                .build();
        return userRepository.save(updatedUser);
    }

    //? Updates DB and caches when a user logs in
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
    })
    public User updateUserActivityAndLastLogin(User user) {
        User updatedUser = user.toBuilder()
                .activity(ONLINE)
                .lastLogin(timeService.getCurrentDateAndTimeInBulgaria())
                .unsuccessfulLoginAttempts(0)
                .build();
        return userRepository.save(updatedUser);
    }

    //? Updates DB and caches when a user logs out
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
    })
    public User updateUserActivityOnLogout(User user) {
        User updatedUser = user.toBuilder()
                .activity(OFFLINE)
                .build();
        return userRepository.save(updatedUser);
        }

    //? Updates DB and caches when unsuccessful login attempts of a user are incremented
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
    })
    public User incrementUnsuccessfulLoginAttemptsOfUser(User user){
        User updatedUser = user.toBuilder()
                .unsuccessfulLoginAttempts(user.getUnsuccessfulLoginAttempts()+1)
                .build();
        return userRepository.save(updatedUser);
    }

    //? Updates DB and caches when a user is LOCKED
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
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
    })
    public User unlockUser(User user){
        User updatedUser = user.toBuilder()
                .status(ACTIVE)
                .unsuccessfulLoginAttempts(0)
                .build();
        return userRepository.save(updatedUser);
    }

    //? No exception thrown on cache miss
   @Caching(evict = {
            @CacheEvict(value = "user", key = "#user.id", beforeInvocation = true),
    })
    public void evictUserFromCache(User user){}

    @Caching(evict = {
            @CacheEvict(value = "user", allEntries = true, beforeInvocation = true),
    })
    public void evictCacheOfAllUsers(){}

    @Cacheable(value = "user", key = "#id", unless = "#result == null")
    public User getUserById(String id) {return userRepository.findUserById(id);}

    public User getUserByUsername(String username){return userRepository.findUserByUsername(username);}

    public User getUserByEmail(String email){return userRepository.findUserByEmail(email);}

    public User getUserByRole(Role role){return userRepository.findUserByRole(role);}

    public boolean isIdExists(String id){return userRepository.existsUserById(id);}

    public boolean isUsernameExists(String username){return userRepository.existsUserByUsername(username);}

    public boolean isEmailExists(String email){return userRepository.existsUserByEmail(email);}

    @PostConstruct
    public void printCacheContentUSER_ID() {
        // Replace "myCache" with the name of your cache
        Cache<Object, Object> caffeineCache = (Cache<Object, Object>) cacheManager.getCache("user").getNativeCache();
        System.out.println("********user-ID*********");
        // Print cache contents
        caffeineCache.asMap().forEach((key, value) -> {
            System.out.println("Key: " + key + ", Value: " + value);
        });System.out.println("*****************");

//        Cache<Object, Object> caffeineCache1 = (Cache<Object, Object>) cacheManager.getCache("zone").getNativeCache();
//        System.out.println("********zone-ID*********");
//        // Print cache contents
//        caffeineCache1.asMap().forEach((key, value) -> {
//            System.out.println("Key: " + key + ", Value: " + value);
//        });System.out.println("*****************");
    }

}