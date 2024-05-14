package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.enums.user.userrole.Role;
import bg.tu_varna.sit.backend.service.primary.user.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingAdminInCache;
import com.github.benmanes.caffeine.cache.Cache;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import static bg.tu_varna.sit.backend.models.enums.user.userrole.Role.ADMIN;

@Component
@RequiredArgsConstructor
public class ExistingAdminInCacheValidation implements ConstraintValidator<ExistingAdminInCache, Role> {

    private final UserService userService;
    private final CacheManager cacheManager;

    @Override
    public void initialize(ExistingAdminInCache constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Role uselessArgument, ConstraintValidatorContext context) {
        User admin = userService.getUserByRole(ADMIN);

        if(admin==null)
        {
            deleteAdminFromCache(); //? Even if user with ADMIN role doesn't exist in DB, check user cache for cached user with ADMIN role and if available in cache, delete the user from cache.

            context.buildConstraintViolationWithTemplate("User with role ADMIN doesn't exist.")
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }
        else {return true;}
    }

    //? This method searches whether user with role ADMIN exists in cache
    //? and if so, then deletes the user with role ADMIN from cache if there is a match. This is useful in case ADMIN
    //? is deleted manually from the DB and dispatcher tries to delete cache for him and search performed
    //? in DB says there is no ADMIN, but indeed its cache still persists.
    private void deleteAdminFromCache(){
        Cache<Object, Object> caffeineCache = (Cache<Object, Object>) cacheManager.getCache("user").getNativeCache();

        caffeineCache.asMap().values().stream()
                .map(value -> (User) value)
                .filter(user -> ADMIN.equals(user.getUserRole().getRole()))
                .findFirst()
                .ifPresent(userService::clearUserFromCacheWhenAbsentFromDB);
    }
}
