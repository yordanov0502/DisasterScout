package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.NameRegex;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class NameRegexValidation implements ConstraintValidator<NameRegex,String> {
    @Override
    public void initialize(NameRegex constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    //! To be implemented
    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        return false;
    }
}