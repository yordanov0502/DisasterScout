package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.cache.UserCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//? UserDetailsServiceImpl is called everytime a user tries to login
//? and everytime a user tries to call a secured endpoint(requiring a valid JWT)
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    //! Here UserCacheService is used directly instead of UserService in order to avoid Circular Dependency issues
    private final UserCacheService userCacheService;

    @Override
    public User loadUserByUsername(String id) throws UsernameNotFoundException {
        final User user = userCacheService.getUserById(id);
        if(user == null){throw new UsernameNotFoundException(id);}
        return user;
    }
}
