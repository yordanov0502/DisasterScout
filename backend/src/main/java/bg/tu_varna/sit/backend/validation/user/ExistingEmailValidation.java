package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.primary.user.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingEmail;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

//* This validation implementation is intended to check whether an email exists,
//* when a user requests a new password from the "forgot password" feature
@Component
@RequiredArgsConstructor
public class ExistingEmailValidation implements ConstraintValidator<ExistingEmail,String> {

    private final UserService userService;

    @Override
    public void initialize(ExistingEmail constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return userService.isEmailExists(email);
    }
}
