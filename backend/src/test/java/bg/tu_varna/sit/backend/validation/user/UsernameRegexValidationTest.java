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
        assertTrue(usernameRegexValidation.isValid("bob", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("maq", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("pepa", constraintValidatorContext));
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
        assertTrue(usernameRegexValidation.isValid("a_a", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("777.777", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("0_developer_0", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("Mustang5.0GT", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("Yordano_V5.00000000", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("YordanoV5.0.0.0.0", constraintValidatorContext));
        assertTrue(usernameRegexValidation.isValid("BBB", constraintValidatorContext));

        assertFalse(usernameRegexValidation.isValid("_Yorda_.__.o0_", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("_.proba._", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("aa", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("_YordanoV5..000_", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("__YordanoV5_", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("_YordanoV__", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("_......._", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid("_________", constraintValidatorContext));
        assertFalse(usernameRegexValidation.isValid(".NikolaMinov.", constraintValidatorContext));
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