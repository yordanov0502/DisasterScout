package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.user.UserDTO;
import bg.tu_varna.sit.backend.models.dto.user.LoginDTO;
import bg.tu_varna.sit.backend.models.dto.user.RegistrationDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.Activity;
import bg.tu_varna.sit.backend.service.cache.UserCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static bg.tu_varna.sit.backend.models.enums.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.Role.DISPATCHER;
import static bg.tu_varna.sit.backend.models.enums.Status.ACTIVE;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserCacheService userCacheService;
    private final PasswordEncoder passwordEncoder;


    public User getUserById(String id) {return userCacheService.getUserById(id);}

    //* Used for validation when creating a new user.
    public boolean isUsernameExists(String username) {return userCacheService.getUserByUsername(username) != null;}

    //* Used for validation when creating a new user.
    public boolean isEmailExists(String email) {return userCacheService.getUserByEmail(email) != null;}

    //* Used for validation when updating already existing user.
    public boolean isUsernameExists(String usernameOfAuthenticatedUser,String username) {return !usernameOfAuthenticatedUser.equals(username) && isUsernameExists(username);}

    //* Used for validation when updating already existing user.
    public boolean isEmailExists(String emailOfAuthenticatedUser,String email) {return !emailOfAuthenticatedUser.equals(email) && isEmailExists(email);}

    //! This method should be called only by admin or by scheduled security methods
    public User updateUserActivity(User user, Activity activity) {return userCacheService.updateUserActivity(user,activity);}


    //! Should be called only by LoginAuthenticationFilter, because it updates user's activity to ONLINE on successful login
    public User checkUserCredentials(LoginDTO loginDTO){
        User user = userCacheService.getUserByUsername(loginDTO.getUsername());

        if (!(user!=null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())))
        {throw new BadCredentialsException("Invalid username or password.");}

        else {return  userCacheService.updateUserActivity(user,ONLINE);}
    }

    public void registerNewDispatcher(RegistrationDTO registrationDTO){
        User user = User.builder()
                .firstName(registrationDTO.firstName())
                .lastName(registrationDTO.lastName())
                .email(registrationDTO.email())
                .username(registrationDTO.username())
                .password(passwordEncoder.encode(registrationDTO.password()))
                .role(DISPATCHER)
                .status(ACTIVE)
                .activity(OFFLINE)
                .build();

        userCacheService.saveUser(user);
    }

    public User updateUser(User user, UserDTO userDTO){
        String oldUsername = user.getUsername();
        String oldEmail = user.getEmail();

        /*System.out.println("BEFORE");
        userCacheService.printCacheContentUSER_ID();
        userCacheService.printCacheContentsUSERNAME_USERNAME();
        userCacheService.printCacheContentEMAIL_EMAIL();*/

        user.setFirstName(userDTO.firstName());
        user.setLastName(userDTO.lastName());
        user.setEmail(userDTO.email());
        user.setUsername(userDTO.username());

        //? This variable is used for better monitoring. When done it should be inlined to the return statement.
        User updatedUser = userCacheService.updateUser(user,oldUsername,oldEmail);

        /*System.out.println("After");
        userCacheService.printCacheContentUSER_ID();
        userCacheService.printCacheContentsUSERNAME_USERNAME();
        userCacheService.printCacheContentEMAIL_EMAIL();*/

        return updatedUser;
    }
}