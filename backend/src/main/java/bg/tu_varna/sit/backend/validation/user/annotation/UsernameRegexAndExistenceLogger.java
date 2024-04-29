package bg.tu_varna.sit.backend.validation.user.annotation;

import bg.tu_varna.sit.backend.validation.user.UsernameRegexAndExistenceLoggerValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Target({FIELD,TYPE, PARAMETER})
@Retention(RUNTIME)
@Constraint(validatedBy = UsernameRegexAndExistenceLoggerValidation.class)
public @interface UsernameRegexAndExistenceLogger {
    String message() default "Invalid type of username.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
