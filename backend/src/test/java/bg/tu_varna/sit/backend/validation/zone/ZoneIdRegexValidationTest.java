package bg.tu_varna.sit.backend.validation.zone;

import bg.tu_varna.sit.backend.validation.zone.annotation.ZoneIdRegex;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class ZoneIdRegexValidationTest {

    private ZoneIdRegexValidation zoneIdRegexValidation;
    private ConstraintValidatorContext constraintValidatorContext;

    @BeforeEach
    void setUp() {
        zoneIdRegexValidation = new ZoneIdRegexValidation();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }

    @Test
    void initialize() {
        ZoneIdRegex constraintAnnotation = mock(ZoneIdRegex.class);
        zoneIdRegexValidation.initialize(constraintAnnotation);
    }

    @Test
    void isValid() {
        assertTrue(zoneIdRegexValidation.isValid("st1",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st2",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st3",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st4",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st5",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st6",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st7",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st8",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st9",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st10",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st11",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st12",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st13",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st14",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st15",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st16",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st17",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st18",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st19",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st20",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st21",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st22",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st23",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st24",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st25",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st26",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st27",constraintValidatorContext));
        assertTrue(zoneIdRegexValidation.isValid("st28",constraintValidatorContext));

        assertFalse(zoneIdRegexValidation.isValid("st0",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st-1",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st-2",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st-3",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st-455",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st25.0",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st222",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st555",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st611",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st-22",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st29",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("st",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("s",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid(" ",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("ststst2",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid("stSDADSAasd@414125+__))?><<?",constraintValidatorContext));
        assertFalse(zoneIdRegexValidation.isValid(null,constraintValidatorContext));
    }
}