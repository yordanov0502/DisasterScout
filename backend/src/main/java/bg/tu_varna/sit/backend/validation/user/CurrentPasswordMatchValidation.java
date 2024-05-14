package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.primary.user.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.CurrentPasswordMatch;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CurrentPasswordMatchValidation implements ConstraintValidator<CurrentPasswordMatch,String> {

    private final UserService userService;

    @Override
    public void initialize(CurrentPasswordMatch constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    //? Checks whether the currentPasswordField matches with the currently authenticated user's password
    @Override
    public boolean isValid(String currentPasswordField, ConstraintValidatorContext context) {
        return userService.checkPasswordsMatch(currentPasswordField);
    }
}
