package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegexAndExistence;
import com.github.benmanes.caffeine.cache.Cache;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class UsernameRegexAndExistenceValidation implements ConstraintValidator<UsernameRegexAndExistence,String> {

    private final UserService userService;
    private final CacheManager cacheManager;

    @Override
    public void initialize(UsernameRegexAndExistence constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        //* Username should only contain letters[a-zA-Z_.] and digits[0-9].
        //! It cannot start or end with a dot(.)
        //* Length is [3;20].
        String regex = "^(?![_\\.])[a-zA-Z0-9_.]{3,20}(?<![_.])$";

        Pattern p = Pattern.compile(regex);
        if(username == null) {return false;}
        else
        {
            Matcher m = p.matcher(username);
            if(m.matches())
            {
                if(!userService.isUsernameExists(username))
                {
                    deleteDispatcherFromCache(username); //? Even if username doesn't exist in DB, check user cache for cached user with the specified username and if available in cache, delete the user from cache.

                    context.buildConstraintViolationWithTemplate("Username doesn't exist.")
                            .addConstraintViolation()
                            .disableDefaultConstraintViolation();
                    return false;
                }
                else return true;
            }
            else return false;
        }
    }

    //? This method searches whether username of dispatcher exists in cache as it checks all cached dispatchers
    //? and if so, then deletes the dispatcher from cache if there is a match. This is useful in case a dispatcher
    //? is deleted manually from the DB and admin tries to delete cache for him by username and search performed by username
    //? in DB says there is no dispatcher, but indeed its cache still persists.
    private void deleteDispatcherFromCache(String username){
        Cache<Object, Object> caffeineCache = (Cache<Object, Object>) cacheManager.getCache("user").getNativeCache();

        caffeineCache.asMap().values().stream()
                .map(value -> (User) value)
                .filter(user -> username.equals(user.getUsername()))
                .findFirst()
                .ifPresent(userService::clearUserFromCacheWhenAbsentFromDB);
    }

}
