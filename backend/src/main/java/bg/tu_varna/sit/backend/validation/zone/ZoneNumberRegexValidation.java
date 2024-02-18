package bg.tu_varna.sit.backend.validation.zone;

import bg.tu_varna.sit.backend.validation.zone.annotation.ZoneNumberRegex;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ZoneNumberRegexValidation implements ConstraintValidator<ZoneNumberRegex,Integer> {

    @Override
    public void initialize(ZoneNumberRegex constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Integer zoneNumber, ConstraintValidatorContext context) {
        //* zoneNumber should be a valid Integer and MUST be in the interval [1,28]

        if(zoneNumber == null || !String.valueOf(zoneNumber).matches("^-?\\d+$")){return false;}

        else {return zoneNumber >= 1 && zoneNumber <= 28;} //returns true if ONLY the zoneNumber is within [1,28]
    }
}
