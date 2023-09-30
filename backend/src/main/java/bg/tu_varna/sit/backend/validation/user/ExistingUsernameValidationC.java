package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingUsernameC;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

//* This validation implementation should be processed while creating a new user
@Component
@RequiredArgsConstructor
public class ExistingUsernameValidationC implements ConstraintValidator<ExistingUsernameC,String> {

    private final UserService userService;

    @Override
    public void initialize(ExistingUsernameC constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
      return !userService.isUsernameExists(username);
    }
}
