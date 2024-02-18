package bg.tu_varna.sit.backend.validation.zone.annotation;

import bg.tu_varna.sit.backend.validation.zone.ZoneNumberRegexValidation;
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
@Constraint(validatedBy = ZoneNumberRegexValidation.class)
public @interface ZoneNumberRegex {
    String message() default "Invalid zone number.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
