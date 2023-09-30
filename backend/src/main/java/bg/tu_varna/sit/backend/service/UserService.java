package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.user.AccountDTO;
import bg.tu_varna.sit.backend.models.dto.user.LoginDTO;
import bg.tu_varna.sit.backend.models.entity.User;
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
    private final PasswordEncoder passwordEncoder;
    private final CustomLoginRegexValidation customLoginRegexValidation;


    public User getUserById(String id) {return userCacheService.getUserById(id);}

    public boolean isUsernameExists(String username) {return userCacheService.getUserByUsername(username) != null;}

    public boolean isEmailExists(String email) {return userCacheService.existsEmail(email);}

    public void validateLoginDTO(LoginDTO loginDTO)
    {
        customLoginRegexValidation.validateLoginFields(loginDTO);
    }

    public User checkUserCredentials(LoginDTO loginDTO){
        User user = userCacheService.getUserByUsername(loginDTO.getUsername());

        if (!(user!=null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())))
        {throw new BadCredentialsException("Invalid username or password.");}

        else {return user;}
    }

    public User editUser(User user, AccountDTO accountDTO){
        String oldUsername = user.getUsername();
        String oldEmail = user.getEmail();

        user.setFirstName(accountDTO.firstName());
        user.setLastName(accountDTO.lastName());
        user.setEmail(accountDTO.email());
        user.setUsername(accountDTO.username());

        return userCacheService.updateUser(user,oldUsername,oldEmail);
    }
}