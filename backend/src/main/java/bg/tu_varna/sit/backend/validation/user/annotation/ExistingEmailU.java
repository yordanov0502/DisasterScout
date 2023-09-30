package bg.tu_varna.sit.backend.validation.user.annotation;

import bg.tu_varna.sit.backend.validation.user.ExistingEmailValidationU;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

//* This custom annotation should be used with logic related to updating email of already existing user
@Documented
@Target({FIELD,TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = ExistingEmailValidationU.class)
public @interface ExistingEmailU {
    String message() default "Email already exists.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
