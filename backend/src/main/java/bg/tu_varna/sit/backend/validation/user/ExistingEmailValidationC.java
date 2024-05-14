package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.primary.user.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingEmailC;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

//* This validation implementation should be processed while creating a new user
@Component
@RequiredArgsConstructor
public class ExistingEmailValidationC implements ConstraintValidator<ExistingEmailC,String> {

    private final UserService userService;

    @Override
    public void initialize(ExistingEmailC constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return !userService.isEmailExists(email);
    }
}