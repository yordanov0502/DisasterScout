package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.NameRegex;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class NameRegexValidationTest {

    private NameRegexValidation nameRegexValidation;
    private ConstraintValidatorContext constraintValidatorContext;
    @BeforeEach
    void setUp() {
        nameRegexValidation = new NameRegexValidation();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }

    @Test
    void initialize() {
        NameRegex constrainAnnotation = mock(NameRegex.class);
        nameRegexValidation.initialize(constrainAnnotation);
    }

    @Test
    void isValid() {
        assertTrue(nameRegexValidation.isValid("Тодор", constraintValidatorContext));
        assertTrue(nameRegexValidation.isValid("Йорданов", constraintValidatorContext));
        assertTrue(nameRegexValidation.isValid("Никола", constraintValidatorContext));
        assertTrue(nameRegexValidation.isValid("Минов", constraintValidatorContext));
        assertTrue(nameRegexValidation.isValid("Svetlin", constraintValidatorContext));
        assertTrue(nameRegexValidation.isValid("Мая", constraintValidatorContext));
        assertTrue(nameRegexValidation.isValid("Константиннннннннннн", constraintValidatorContext));

        assertFalse(nameRegexValidation.isValid("Тодор ", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid(" Йорданов", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("никола", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("МИНОВ", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("svetlin", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("Ма", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("Konstantinnnnnnnnnnnn", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("Konstantinnnnnnnnnnn@", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid(" ", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("               ", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("Иван.", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid("И$.,/..,/.@#!#@#@@#$%^&&*^^&*())(()0ван.", constraintValidatorContext));
        assertFalse(nameRegexValidation.isValid(null, constraintValidatorContext));
    }
}