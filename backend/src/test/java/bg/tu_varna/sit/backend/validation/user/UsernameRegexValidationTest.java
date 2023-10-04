package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegex;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class UsernameRegexValidationTest {

    private UsernameRegexValidation usernameRegexValidation;
    private ConstraintValidatorContext constraintValidatorContext;
    @BeforeEach
    void setUp() {
        usernameRegexValidation = new UsernameRegexValidation();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }

    @Test
    void initialize() {
        UsernameRegex constraintAnnotation = mock(UsernameRegex.class);
        usernameRegexValidation.initialize(constraintAnnotation);
    }

    @Test
    void isValid() {
        assertTrue(usernameRegexValidation.isValid("yordanov50", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("0developer0", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("nikola", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("todor", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("svetlin", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("Toshko", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("MARIN", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("454323", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("TTT0921Ssdad", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("000000000000000", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("yordanov500000000000", constraintValidatorContext));

        assertFalse(usernameRegexValidation.isValid("yordanov5.0", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("0_developer_0", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid(" ", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid(" john", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("           ", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid(".........", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("Тошко", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("ЛЛЛЛЛЛЛ", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("-№3е,!?+%=:/–№", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("yordanov5000000000000", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid(null, constraintValidatorContext));
    }
}