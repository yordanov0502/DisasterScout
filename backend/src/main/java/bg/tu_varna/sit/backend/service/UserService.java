package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.user.LoginRequestDTO;
import bg.tu_varna.sit.backend.models.dto.user.RegistrationRequestDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.cache.UserCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static bg.tu_varna.sit.backend.models.enums.user.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Role.ADMIN;
import static bg.tu_varna.sit.backend.models.enums.user.Role.DISPATCHER;
import static bg.tu_varna.sit.backend.models.enums.user.Status.LOCKED;

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

    //! This method should only be called by the successHandler of LoginAuthenticationFilter
    public User login(User user) {return userCacheService.updateUserActivityAndLastLogin(user);}

    //! This method should only be called when a user sent a request to logout
    public User logout(User user) {return userCacheService.updateUserActivityOnLogout(user);}

    //? Should be called when a dispatcher or "someone" tries to log in several times but fails (unsuccessful login attempts rate limit is exceeded)
    public User lockUser(User user) {return userCacheService.lockUser(user);}

    //? Should be called only by admin (to unlock a certain dispatcher)
    public User unlockUser(User user) {return userCacheService.unlockUser(user);}

    //! Should be called only by LoginAuthenticationFilter
    //? Unsuccessful login attempts(valid username, BUT invalid password) are incremented only if user is OFFLINE AND ACTIVE
    public User checkUserCredentials(LoginRequestDTO loginRequestDTO){
        User user = userCacheService.getUserByUsername(loginRequestDTO.getUsername());

        //* if user does NOT exist or password from loginRequestDTO does NOT match the password of the existing user
        if (user == null || !passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {

            //*user DOES exist BUT the password from loginRequestDTO does NOT match the password of the existing user
            if (user != null)
            {
                //? Checks if a user is already logged in, in order to prevent incrementing unsuccessful login attempts
                //!!!!!!!!! Exception might need to be more clearly defined with a CUSTOM exception in future
                if(user.getActivity().equals(ONLINE))
                {throw new BadCredentialsException("User is already logged in.");}

                //? Checks if a user's account is locked, in order to prevent incrementing unsuccessful login attempts
                //!!!!!!!!! Exception might need to be more clearly defined with a CUSTOM exception in future
                else if(user.getStatus().equals(LOCKED))
                {throw new BadCredentialsException("User is currently locked.");}

                else
                {
                    User updatedUser = userCacheService.incrementUnsuccessfulLoginAttemptsOfUser(user);

                    if(updatedUser.getRole().equals(ADMIN) && updatedUser.getUnsuccessfulLoginAttempts()>3)
                    {   lockUser(updatedUser);
                        throw new BadCredentialsException("Admin has been locked.");
                    }

                    if(updatedUser.getRole().equals(DISPATCHER) && updatedUser.getUnsuccessfulLoginAttempts()>5)
                    {   lockUser(updatedUser);
                        throw new BadCredentialsException("Dispatcher has been locked.");
                    }
                }

            }
            throw new BadCredentialsException("Invalid username or password.");
        }

        //* username and password from loginRequestDTO matched the username and password of existing user
        else
        {
            //? Checks if a user is already logged in, in order to prevent logging in
            //? 2nd time from another device, if a user is already logged in.(This is done for security reasons)
            //!!!!!!!!! Exception might need to be more clearly defined with a CUSTOM exception in future
            if(user.getActivity().equals(ONLINE))
            {throw new BadCredentialsException("User is already logged in.");}

            //? Checks if a user's account is locked, in order to prevent logging in, if a user's account is indeed locked
            //!!!!!!!!! Exception might need to be more clearly defined with a CUSTOM exception in future
            else if(user.getStatus().equals(LOCKED))
            {throw new BadCredentialsException("User is currently locked.");}

            else {return user;}
        }
    }

    //? password from registrationRequestDTO is encoded here in the method and sent to the userCacheService,
    //? because PasswordEncoder cannot be injected into userCacheService, due to circular dependency issue
    public User registerNewDispatcher(RegistrationRequestDTO registrationRequestDTO){return userCacheService.registerNewDispatcher(registrationRequestDTO,passwordEncoder.encode(registrationRequestDTO.password()));}

    //! This method should be called ONLY by a user, who intends to update HIS data
    public User updateUser(User user, UserDTO userDTO){return userCacheService.updateUser(user,userDTO);}
}