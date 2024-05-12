package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.dto.user.PageDispatcherDTO;
import bg.tu_varna.sit.backend.models.dto.user.RegistrationRequestDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserUpdateDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.userrole.Role;
import bg.tu_varna.sit.backend.models.mapper.user.UserMapper;
import bg.tu_varna.sit.backend.models.mapper.zone.ZoneMapper;
import bg.tu_varna.sit.backend.repository.UserRepository;
import bg.tu_varna.sit.backend.service.UserRoleService;
import bg.tu_varna.sit.backend.service.ZoneService;
import bg.tu_varna.sit.backend.service.util.TimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static bg.tu_varna.sit.backend.models.enums.user.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.userrole.Role.DISPATCHER;
import static bg.tu_varna.sit.backend.models.enums.user.Status.ACTIVE;
import static bg.tu_varna.sit.backend.models.enums.user.Status.LOCKED;

//? More info about unless cache clause -> https://stackoverflow.com/questions/12113725/how-do-i-tell-spring-cache-not-to-cache-null-value-in-cacheable-annotation

@Service
@RequiredArgsConstructor
public class UserCacheService {

    private final UserRepository userRepository;
    //private final CacheManager cacheManager;
    private final TimeService timeService;
    private final ZoneService zoneService;
    private final UserMapper userMapper;
    private final ZoneMapper zoneMapper;
    private final UserRoleService userRoleService;


    //* Saves a new user to DB and related cache.
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
                .userRole(userRoleService.getUserRoleByRole(DISPATCHER))
                .status(ACTIVE)
                .activity(OFFLINE)
                .lastLogin(timeService.getUnixEpochDateAndTime())
                .unsuccessfulLoginAttempts(0)
                //! If circular dependency issue occur due to the injection of the ZoneService, ZoneCacheService can be used instead
                .availableZones(new ArrayList<>(List.of(zoneService.getZoneById(registrationRequestDTO.initialZoneId()))))
                .build();
        return userRepository.save(newUser);
    }

    @Caching(evict = {
            @CacheEvict(value = "user", key = "#dispatcherId")
    })
    public void deleteDispatcher(String dispatcherId){
        User dispatcher = getUserById(dispatcherId);
        userRepository.delete(dispatcher);
    }

    @Caching(
            put = {
                    @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            })
    public User removeAllAvailableZonesOfDispatcher(User dispatcher){
        User dispatcherWithoutZones = dispatcher.toBuilder()
                .availableZones(Collections.emptyList())
                .build();
        return userRepository.save(dispatcherWithoutZones);
    }

    @Caching(
            put = {
                    @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
            })
    public User updateAvailableZonesOfDispatcher(User dispatcher, List<String> zoneIds){
        User dispatcherWithUpdatedAvailableZones = dispatcher.toBuilder()
                .availableZones(zoneMapper.mapToListOfZones(zoneIds))
                .build();
        return userRepository.save(dispatcherWithUpdatedAvailableZones);
    }

    //* Updates existing user and related cache.
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

    //? Updates DB and related cache when a user logs in
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

    //? Updates DB and related cache when a user logs out
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
    })
    public User updateUserActivityOnLogout(User user) {
        User updatedUser = user.toBuilder()
                .activity(OFFLINE)
                .build();
        return userRepository.save(updatedUser);
        }

    //? Updates DB and related cache when unsuccessful login attempts of a user are incremented
    @Caching(put = {
            @CachePut(value = "user", key = "#result.id", unless = "#result == null"),
    })
    public User incrementUnsuccessfulLoginAttemptsOfUser(User user){
        User updatedUser = user.toBuilder()
                .unsuccessfulLoginAttempts(user.getUnsuccessfulLoginAttempts()+1)
                .build();
        return userRepository.save(updatedUser);
    }

    //? Updates DB and related cache when a user is LOCKED
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

    //? Updates DB and related cache when a user is UNLOCKED
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

    public User getUserByRole(Role role){return userRepository.findUserByUserRole(userRoleService.getUserRoleByRole(role));}

    public PageDispatcherDTO getDispatchersFromPage(Integer page){
        Pageable pageable = PageRequest.of(page,15,Sort.by("firstName","lastName").ascending());
        return userMapper.mapToPageDispatcherDTO(userRepository.findAllByUserRole(pageable,userRoleService.getUserRoleByRole(DISPATCHER)));
    }

    public boolean isIdExists(String id){return userRepository.existsUserById(id);}

    public boolean isUsernameExists(String username){return userRepository.existsUserByUsername(username);}

    public boolean isEmailExists(String email){return userRepository.existsUserByEmail(email);}

//    @PostConstruct
//    public void printCacheContentUSER_ID() {
//        Cache<Object, Object> caffeineCache = (Cache<Object, Object>) cacheManager.getCache("user").getNativeCache();
//
//        System.out.println("********user-ID*********");
//        caffeineCache.asMap().forEach((key, value) -> {
//            System.out.println("Key: " + key + ", Value: " + value);
//        });
//        System.out.println("*****************");
//
//    }

}