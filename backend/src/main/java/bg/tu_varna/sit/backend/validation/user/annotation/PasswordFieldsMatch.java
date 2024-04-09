package bg.tu_varna.sit.backend.validation.user.annotation;

import bg.tu_varna.sit.backend.validation.user.PasswordFieldsMatchValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Target({TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = PasswordFieldsMatchValidation.class)
public @interface PasswordFieldsMatch {
    String message() default "Password fields doesn't match";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String first();
    String second();

//    @Target({ TYPE })
//    @Retention(RUNTIME)
//    @Documented
//    @interface List {
//        PasswordFieldsMatch[] value();
//    }

    //? This will be needed if I apply the @PasswordFieldsMatch multiple times in the same DTO (at class level)
    //? Example:
//    @PasswordFieldsMatch.List({
//            @PasswordFieldsMatch(first = "newPassword", second = "confirmNewPassword"),
//            @PasswordFieldsMatch(first = "newEmailPassword", second = "confirmEmailPassword")
//    })
//    public class AccountSettings {
//        private String newPassword;
//        private String confirmNewPassword;
//        private String newEmailPassword;
//        private String confirmEmailPassword;
//        // getters and setters
//    }
}
