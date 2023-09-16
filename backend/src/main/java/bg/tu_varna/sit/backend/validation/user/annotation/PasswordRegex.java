package bg.tu_varna.sit.backend.validation.user.annotation;

import bg.tu_varna.sit.backend.validation.user.PasswordRegexValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Target({FIELD,TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = PasswordRegexValidation.class)
public @interface PasswordRegex {
    String message() default "Invalid type of password.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
