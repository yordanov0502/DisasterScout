package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.EmailRegex;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class EmailRegexValidation implements ConstraintValidator<EmailRegex,String> {

    @Override
    public void initialize(EmailRegex constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        //* Email should begin with a lowercase letter[a-z].
        //* It can contain lowercase letters[a-z], digits[0-9], dot[.], hyphen[-] and underscore[_].
        //* The email should end with a proper pattern.(@abv.bg, @gmail.com, @yahoo.com, etc.)
        String regex = "^[a-z][a-z0-9_.-]{2,29}@[a-z]{3,20}[.][a-z0-9.-]{2,20}$";

        Pattern p = Pattern.compile(regex);
        if(email == null) {return false;}
        else
        {
            Matcher m = p.matcher(email);
            return m.matches();
        }
    }
}
