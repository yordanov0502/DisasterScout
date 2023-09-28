package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.user.LoginDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.repository.UserRepository;
import bg.tu_varna.sit.backend.service.cache.UserCacheService;
import bg.tu_varna.sit.backend.validation.user.CustomLoginRegexValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserCacheService userCacheService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomLoginRegexValidation customLoginRegexValidation;


    public User getUserById(String id) {return userCacheService.getUserById(id);}

    public User getUserByUsername(String username) {return userCacheService.getUserByUsername(username);}

    public boolean isUsernameExists(String username) {return userCacheService.getUserByUsername(username) != null;}

    public User getUserByEmail(String email) {return userRepository.findUserByEmail(email);}

    public boolean isEmailExists(String email) {return getUserByEmail(email) != null;}

    public void validateLoginDTO(LoginDTO loginDTO)
    {
        customLoginRegexValidation.validateLoginFields(loginDTO);
    }

    public void checkUserCredentials(LoginDTO loginDTO){
        User user = getUserByUsername(loginDTO.getUsername());
        if (!(user!=null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())))
            throw new BadCredentialsException("Invalid username or password.");
    }
}
