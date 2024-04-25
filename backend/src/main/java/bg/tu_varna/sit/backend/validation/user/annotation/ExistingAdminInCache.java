package bg.tu_varna.sit.backend.validation.user.annotation;

import bg.tu_varna.sit.backend.validation.user.ExistingAdminInCacheValidation;
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
@Constraint(validatedBy = ExistingAdminInCacheValidation.class)
public @interface ExistingAdminInCache {
    String message() default "Currently there is no user with role ADMIN in database.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
