package bg.tu_varna.sit.backend.validation.zone;

import bg.tu_varna.sit.backend.validation.zone.annotation.ZoneIdRegex;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ZoneIdRegexValidation implements ConstraintValidator<ZoneIdRegex,String> {

    @Override
    public void initialize(ZoneIdRegex constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    //? zoneId should be non-null, match the format "stX" where X is an integer, and X should be in the range [1, 28]
    @Override
    public boolean isValid(String zoneId, ConstraintValidatorContext context) {

        if(zoneId == null || !zoneId.matches("^st(\\d+)$")){return false;}

        try
        {
            int zoneNumber = Integer.parseInt(zoneId.substring(2));
            return zoneNumber >= 1 && zoneNumber <= 28;
        }
        catch (NumberFormatException e)
        {
            return false;
        }
    }
}
