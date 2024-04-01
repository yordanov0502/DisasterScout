package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.IdRegex;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class IdRegexValidation implements ConstraintValidator<IdRegex,String> {

    @Override
    public void initialize(IdRegex constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
    @Override
    public boolean isValid(String id, ConstraintValidatorContext context) {
        //? Regex for EGN
        String regex = "\\b[0-9]{2}(?:0[1-9]|1[0-2]|2[1-9]|3[0-2]|4[1-9]|5[0-2])(?:0[1-9]|[1-2][0-9]|3[0-1])[0-9]{4}\\b";

        if(id == null) {return false;}

        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(id);
        return m.matches();
    }
}
