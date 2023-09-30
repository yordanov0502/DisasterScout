package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingUsernameU;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

//* This validation implementation should be processed while updating already existing user
@Component
@RequiredArgsConstructor
public class ExistingUsernameValidationU implements ConstraintValidator<ExistingUsernameU,String> {

    private final UserService userService;

    @Override
    public void initialize(ExistingUsernameU constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        //* Gets username of authenticated user
        String usernameOfAuthenticatedUser = userService.getUserById(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()).getUsername();
        return !userService.isUsernameExists(usernameOfAuthenticatedUser,username);
    }
}
