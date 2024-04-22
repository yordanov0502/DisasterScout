package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.UserService;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UsernameRegexAndExistenceValidationTest {

    @InjectMocks
    private UsernameRegexAndExistenceValidation validator;

    @Mock
    private UserService userService;

    @Mock
    private ConstraintValidatorContext context;

    @Mock
    private ConstraintValidatorContext.ConstraintViolationBuilder violationBuilder;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        when(context.buildConstraintViolationWithTemplate(anyString())).thenReturn(violationBuilder);
        when(violationBuilder.addConstraintViolation()).thenReturn(context);
    }

    @Test
    void testValidUsername() {
        when(userService.isUsernameExists("validUsername123")).thenReturn(true);
        assertTrue(validator.isValid("validUsername123", context));
    }

    @Test
    void testUsernameTooShort() {
        assertFalse(validator.isValid("ab", context));
    }

    @Test
    void testUsernameTooLong() {
        assertFalse(validator.isValid("a".repeat(21), context));
    }

    @Test
    void testUsernameWithInvalidCharacters() {
        assertFalse(validator.isValid("invalid*username", context));
    }

    @Test
    void testUsernameStartsWithDot() {
        assertFalse(validator.isValid(".startsWithDot", context));
    }

    @Test
    void testUsernameEndsWithDot() {
        assertFalse(validator.isValid("endsWithDot.", context));
    }

    @Test
    void testUsernameIsNull() {
        assertFalse(validator.isValid(null, context));
    }

    @Test
    void testUsernameExists() {
        when(userService.isUsernameExists("existingUser")).thenReturn(true);
        assertTrue(validator.isValid("existingUser", context));
    }

    @Test
    void testUsernameDoesNotExist() {
        when(userService.isUsernameExists("nonExistingUser")).thenReturn(false);
        assertFalse(validator.isValid("nonExistingUser", context));
        verify(context).buildConstraintViolationWithTemplate("Username doesn't exist.");
        verify(violationBuilder).addConstraintViolation();
        verify(context).disableDefaultConstraintViolation();
    }
}