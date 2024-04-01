package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.IdRegex;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class IdRegexValidationTest {

    private IdRegexValidation idRegexValidation;
    private ConstraintValidatorContext constraintValidatorContext;

    @BeforeEach
    void setUp() {
        idRegexValidation = new IdRegexValidation();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }

    @Test
    void initialize() {
        IdRegex constrainAnnotation = mock(IdRegex.class);
        idRegexValidation.initialize(constrainAnnotation);
    }

    @Test
    void isValid() {
        assertTrue(idRegexValidation.isValid("0509046844",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("0641204041",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("0647020530",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("3212312522",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("3605143906",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("3709261515",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("3909116520",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("4907021010",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("5508079668",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("6007048049",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("7207207237",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("7704053080",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("8001222352",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("8202109965",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("8210090560",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("8504113380",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("8612230407",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("8807280210",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("9310154417",constraintValidatorContext));
        assertTrue(idRegexValidation.isValid("9503069242",constraintValidatorContext));

        assertFalse(idRegexValidation.isValid("",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid(" ",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid(null,constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("321231252",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("0000000000",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("37092615151",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("abcdefg",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("%%%%%%%%%%",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("!@$%^&**(()_+?><'",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("..........",constraintValidatorContext));
        assertFalse(idRegexValidation.isValid("____",constraintValidatorContext));
    }
}