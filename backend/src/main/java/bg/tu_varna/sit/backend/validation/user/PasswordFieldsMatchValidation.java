package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.dto.user.ChangePasswordDTO;
import bg.tu_varna.sit.backend.validation.user.annotation.PasswordFieldsMatch;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class PasswordFieldsMatchValidation implements ConstraintValidator<PasswordFieldsMatch,Object> {

    private String firstFieldName;
    private String secondFieldName;
    private String message;

    @Override
    public void initialize(PasswordFieldsMatch constraintAnnotation) {
        firstFieldName = constraintAnnotation.first();
        secondFieldName = constraintAnnotation.second();
        message = constraintAnnotation.message();
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    //! This validation must be used only on ChangePasswordDTO
    //? Object value is instance of ChangePasswordDTO
    //? Changing the method argument to a specific class type could lead to runtime exceptions. (If the annotation is used on a different DTO, it will likely result in a ClassCastException)
    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {

        if(obj instanceof ChangePasswordDTO)
        {
            boolean valid;

            //? The BeanWrapperImpl class provides a way to manipulate JavaBean properties dynamically, which is a form of reflection.
            final String newPassword = (String) new BeanWrapperImpl(obj).getPropertyValue(firstFieldName);
            final String confirmNewPassword = (String) new BeanWrapperImpl(obj).getPropertyValue(secondFieldName);
            valid = Objects.equals(newPassword,confirmNewPassword);

            //? "The framework doesn't inherently know which fields to associate the violation with unless you explicitly define it.
            //? This is why you need to build the constraint violation manually."
            if (!valid) {
                context.buildConstraintViolationWithTemplate(message)
                        .addPropertyNode(secondFieldName)
                        .addConstraintViolation()
                        .disableDefaultConstraintViolation();
            }

            return valid;
        }
        return false;
    }
}
