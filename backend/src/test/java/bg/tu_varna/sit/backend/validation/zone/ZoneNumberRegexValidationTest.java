package bg.tu_varna.sit.backend.validation.zone;

import bg.tu_varna.sit.backend.validation.zone.annotation.ZoneNumberRegex;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class ZoneNumberRegexValidationTest {

    private ZoneNumberRegexValidation zoneNumberRegexValidation;
    private ConstraintValidatorContext constraintValidatorContext;

    @BeforeEach
    void setUp() {
        zoneNumberRegexValidation = new ZoneNumberRegexValidation();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }

    @Test
    void initialize() {
        ZoneNumberRegex constraintAnnotation = mock(ZoneNumberRegex.class);
        zoneNumberRegexValidation.initialize(constraintAnnotation);
    }

    @Test
    void isValid() {
        assertTrue(zoneNumberRegexValidation.isValid(1,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(2,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(3,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(4,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(5,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(6,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(7,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(8,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(9,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(10,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(11,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(12,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(13,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(14,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(15,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(16,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(17,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(18,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(19,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(20,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(21,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(22,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(23,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(24,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(25,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(26,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(27,constraintValidatorContext));
        assertTrue(zoneNumberRegexValidation.isValid(28,constraintValidatorContext));

        assertFalse(zoneNumberRegexValidation.isValid(0,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(-1,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(-2,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(-3,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(-455,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(29,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(222,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(555,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(611,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(-20,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(55,constraintValidatorContext));
        assertFalse(zoneNumberRegexValidation.isValid(null,constraintValidatorContext));
    }
}