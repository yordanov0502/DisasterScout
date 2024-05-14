package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.service.primary.user.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingEmailU;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

//* This validation implementation should be processed while updating already existing user
@Component
@RequiredArgsConstructor
public class ExistingEmailValidationU implements ConstraintValidator<ExistingEmailU,String> {

    private final UserService userService;

    @Override
    public void initialize(ExistingEmailU constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        //* Gets email of authenticated user
        String emailOfAuthenticatedUser = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail();
        return !userService.isEmailExists(emailOfAuthenticatedUser,email);
    }
}
