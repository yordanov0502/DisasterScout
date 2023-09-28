package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserCacheService {

    private final UserRepository userRepository;

    @Cacheable(value = "user", key = "#id", unless = "#result == null")
    public User getUserById(String id) {return userRepository.findUserById(id);}

    //@CachePut(value = "user", key = "#user.id", unless = "#result == null")
    //public User updateUserCache(User user){return userRepository.save(user);}

    @Cacheable(value = "username", key = "#username", unless = "#result == null")
    public User getUserByUsername(String username){return userRepository.findUserByUsername(username);}

}