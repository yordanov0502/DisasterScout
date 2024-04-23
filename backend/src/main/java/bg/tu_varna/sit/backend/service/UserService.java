package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.user.LoginRequestDTO;
import bg.tu_varna.sit.backend.models.dto.user.RegistrationRequestDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserUpdateDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.log.Action;
import bg.tu_varna.sit.backend.models.event.EntityEvent;
import bg.tu_varna.sit.backend.service.cache.UserCacheService;
import bg.tu_varna.sit.backend.service.util.EmailService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static bg.tu_varna.sit.backend.models.enums.user.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Activity.ONLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Role.ADMIN;
import static bg.tu_varna.sit.backend.models.enums.user.Role.DISPATCHER;
import static bg.tu_varna.sit.backend.models.enums.user.Status.ACTIVE;
import static bg.tu_varna.sit.backend.models.enums.user.Status.LOCKED;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserCacheService userCacheService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final ApplicationEventPublisher eventPublisher;

    public User getUserById(String id) {return userCacheService.getUserById(id);}

    //public User getUserByEmail(String email) {return userCacheService.getUserByEmail(email);}
    public boolean isIdExists(String id){return userCacheService.isIdExists(id);}

    public boolean isUsernameExists(String username) {return userCacheService.isUsernameExists(username);}

    public boolean isEmailExists(String email) {return userCacheService.isEmailExists(email);}

    public boolean isUsernameExists(String usernameOfAuthenticatedUser,String username) {return !usernameOfAuthenticatedUser.equals(username) && isUsernameExists(username);}

    public boolean isEmailExists(String emailOfAuthenticatedUser,String email) {return !emailOfAuthenticatedUser.equals(email) && isEmailExists(email);}

    //! This method should only be called by the successHandler of LoginAuthenticationFilter
    public User login(User user) {
        User loggedInUser = userCacheService.updateUserActivityAndLastLogin(user);
        eventPublisher.publishEvent(new EntityEvent<>(loggedInUser, Action.LOGIN));
        return loggedInUser;
    }

    //! This method should only be called when a user sent a request to logout
    public void logout(User user) {
        User loggedOutUser = userCacheService.updateUserActivityOnLogout(user);
        eventPublisher.publishEvent(new EntityEvent<>(loggedOutUser,Action.LOGOUT));
    }

    //? Should be called when a dispatcher or "someone" tries to log in several times but fails (unsuccessful login attempts rate limit is exceeded)
    public void lockUserAutomatically(User user) {
        User lockedUser = userCacheService.lockUser(user);
        eventPublisher.publishEvent(new EntityEvent<>(lockedUser,Action.ACCOUNT_LOCKED_AUTOMATICALLY));
    }

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

                    if(updatedUser.getRole().equals(ADMIN) && updatedUser.getUnsuccessfulLoginAttempts()>=3)
                    {
                        lockUserAutomatically(updatedUser);
                        throw new BadCredentialsException("Admin has been locked.");
                    }

                    if(updatedUser.getRole().equals(DISPATCHER) && updatedUser.getUnsuccessfulLoginAttempts()>=5)
                    {
                        lockUserAutomatically(updatedUser);
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
    public ResponseEntity<?> registerNewDispatcher(RegistrationRequestDTO registrationRequestDTO){
        try{
            userCacheService.registerNewDispatcher(registrationRequestDTO,passwordEncoder.encode(registrationRequestDTO.password()));
        }
        catch (Exception e)
        {
           return new ResponseEntity<>("Please try again. Error occurred while registering a new dispatcher.", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().build();
    }

    //! This method should be called ONLY by a user, who intends to update HIS data
    public User updateUser(User user, UserUpdateDTO userUpdateDTO){return userCacheService.updateUser(user, userUpdateDTO);}

    public String generateRandomPassword(){
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&+=_*~!)(./:;?{}|`',-";
        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_*~!)(./:;?{}|`',-])[0-9a-zA-Z@#$%^&+=_*~!)(./:;?{}|`',-]{8,30}$";
        Pattern pattern = Pattern.compile(regex);
        int counter=0;

        while(true) //? Loop until regex is passed successfully.
        {
            if(counter>=50) {return null;}
            else
            {
                counter++;
                String generatedPassword = RandomStringUtils.random(12, characters);
                Matcher matcher = pattern.matcher(generatedPassword);
                if(matcher.matches()) {
                    return generatedPassword;}
            }
        }
    }

    public ResponseEntity<?> setNewRandomPassword(String email){
        User user = userCacheService.getUserByEmail(email);
        if(user.getStatus().equals(ACTIVE) && user.getActivity().equals(OFFLINE))
        {
            String newPassword = generateRandomPassword();
            if(newPassword==null) {return new ResponseEntity<>("Please try again. Error occurred while generating the new password.", HttpStatus.BAD_REQUEST);} //? In case of infinite loop(after 50 unsuccessful tries) in generateRandomPassword() method
            else
            {
                userCacheService.updatePassword(user,passwordEncoder.encode(newPassword));
                boolean isEmailSentSuccessfully = emailService.sendEmail(user.getFirstName(),email,newPassword);
                if(isEmailSentSuccessfully) return ResponseEntity.ok().build();
                else return new ResponseEntity<>("Please try again. Error occurred while sending email with the new password.", HttpStatus.BAD_REQUEST);
            }
        }
        else
        {
            emailService.sendWarningEmail(user.getFirstName(),email);
            return ResponseEntity.badRequest().build();
        }
    }

    //? Check whether the currentPasswordField matches with the currently authenticated user's password
    public boolean checkPasswordsMatch(String currentPasswordField){
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return passwordEncoder.matches(currentPasswordField, authenticatedUser.getPassword());
    }

    public ResponseEntity<?> changePassword(User user, String newPassword){
        userCacheService.updatePassword(user,passwordEncoder.encode(newPassword));
        return ResponseEntity.ok().build();
    }

    //? Called by both ADMIN and DISPATCHER to clear their own cached data
    public void clearMyCache(User user){userCacheService.evictUserFromCache(user);}

    //? Called by DISPATCHER to clear cached data of ADMIN
    public void clearAdminCache(){
        User admin = userCacheService.getUserByRole(ADMIN);
        userCacheService.evictUserFromCache(admin);
    }

    //? Called by ADMIN to clear cached data of DISPATCHER
    public void clearDispatcherCache(String username){
        User dispatcher = userCacheService.getUserByUsername(username);
        userCacheService.evictUserFromCache(dispatcher);
    }

    //? Called by ADMIN to clear cached data of all users
    public void clearCacheOfAllUsers(){userCacheService.evictCacheOfAllUsers();}

}