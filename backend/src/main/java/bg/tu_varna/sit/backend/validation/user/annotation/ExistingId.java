package bg.tu_varna.sit.backend.validation.user.annotation;

import bg.tu_varna.sit.backend.validation.user.ExistingIdValidation;
import bg.tu_varna.sit.backend.validation.user.IdRegexValidation;
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
@Constraint(validatedBy = ExistingIdValidation.class)
public @interface ExistingId {
    String message() default "Id already exists.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
