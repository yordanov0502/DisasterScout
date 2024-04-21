package bg.tu_varna.sit.backend.validation.zone.annotation;

import bg.tu_varna.sit.backend.validation.zone.ZoneIdRegexValidation;
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
@Constraint(validatedBy = ZoneIdRegexValidation.class)
public @interface ZoneIdRegex {
    String message() default "Invalid zoneId.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
