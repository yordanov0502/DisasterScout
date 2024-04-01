package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingId;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ExistingIdValidation implements ConstraintValidator<ExistingId,String> {

    private final UserService userService;

    @Override
    public void initialize(ExistingId constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String id, ConstraintValidatorContext context) {
        return !userService.isIdExists(id);
    }
}
