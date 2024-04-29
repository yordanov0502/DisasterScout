package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegexAndExistenceLogger;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class UsernameRegexAndExistenceLoggerValidation implements ConstraintValidator<UsernameRegexAndExistenceLogger,String> {

    private final UserService userService;

    @Override
    public void initialize(UsernameRegexAndExistenceLogger constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        //* Username should only contain letters[a-zA-Z_.] and digits[0-9].
        //! It cannot start or end with a dot(.)
        //* Length is [3;20].
        String regex = "^(?![_\\.])[a-zA-Z0-9_.]{3,20}(?<![_.])$";
        Pattern p = Pattern.compile(regex);

        if(Objects.equals(username, "")) {return true;} //? If username is empty it means no username was entered
        else
        {
            Matcher m = p.matcher(username);
            if(m.matches())
            {
                if(!userService.isUsernameExists(username))
                {

                    context.buildConstraintViolationWithTemplate("Username doesn't exist.")
                            .addConstraintViolation()
                            .disableDefaultConstraintViolation();
                    return false;
                }
                else return true;
            }
            else return false;
        }
    }
}
