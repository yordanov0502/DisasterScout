package bg.tu_varna.sit.backend.validation.user.annotation;

import bg.tu_varna.sit.backend.validation.user.ExistingUsernameValidationU;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

//* This custom annotation should be used with logic related to updating username of already existing user
@Documented
@Target({FIELD,TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = ExistingUsernameValidationU.class)
public @interface ExistingUsernameU {
        String message() default  "Username already exists.";

        Class<?>[] groups() default {};

        Class<? extends Payload>[] payload() default {};
}
