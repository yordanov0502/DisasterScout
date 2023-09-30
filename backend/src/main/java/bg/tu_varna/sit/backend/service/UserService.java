package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.user.AccountDTO;
import bg.tu_varna.sit.backend.models.dto.user.LoginDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.cache.UserCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserCacheService userCacheService;
    private final PasswordEncoder passwordEncoder;


    public User getUserById(String id) {return userCacheService.getUserById(id);}

    //* Used for validation when creating a new user
    public boolean isUsernameExists(String username) {return userCacheService.getUserByUsername(username) != null;}

    //* Used for validation when creating a new user
    public boolean isEmailExists(String email) {return userCacheService.getUserByEmail(email) != null;}

    //* Used for validation when updating already existing user
    public boolean isUsernameExists(String usernameOfAuthenticatedUser,String username) {return !usernameOfAuthenticatedUser.equals(username) && isUsernameExists(username);}

    //* Used for validation when updating already existing user
    public boolean isEmailExists(String emailOfAuthenticatedUser,String email) {return !emailOfAuthenticatedUser.equals(email) && isEmailExists(email);}

    public User checkUserCredentials(LoginDTO loginDTO){
        User user = userCacheService.getUserByUsername(loginDTO.getUsername());

        if (!(user!=null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())))
        {throw new BadCredentialsException("Invalid username or password.");}

        else {return user;}
    }

    public User editUser(User user, AccountDTO accountDTO){
        String oldUsername = user.getUsername();
        String oldEmail = user.getEmail();
       /* System.out.println("BEFORE");
        userCacheService.printCacheContentUSER_ID();
        userCacheService.printCacheContentsUSERNAME_USERNAME();
        userCacheService.printCacheContentEMAIL_EMAIL();*/

        user.setFirstName(accountDTO.firstName());
        user.setLastName(accountDTO.lastName());
        user.setEmail(accountDTO.email());
        user.setUsername(accountDTO.username());

        /*System.out.println("After");
        userCacheService.printCacheContentUSER_ID();
        userCacheService.printCacheContentsUSERNAME_USERNAME();
        userCacheService.printCacheContentEMAIL_EMAIL();*/

        return userCacheService.updateUser(user,oldUsername,oldEmail);
    }
}