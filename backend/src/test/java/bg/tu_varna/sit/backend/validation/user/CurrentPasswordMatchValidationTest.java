package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.UserService;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class CurrentPasswordMatchValidationTest {

    @Mock
    private UserService userService;

    @Mock
    private ConstraintValidatorContext context;

    @InjectMocks
    private CurrentPasswordMatchValidation currentPasswordMatchValidation;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testIsValidTrue() {
        String currentPasswordField = "correctPassword";
        when(userService.checkPasswordsMatch(currentPasswordField)).thenReturn(true);

        boolean result = currentPasswordMatchValidation.isValid(currentPasswordField, context);

        assertTrue(result);
    }

    @Test
    public void testIsValidFalse() {
        String currentPasswordField = "incorrectPassword";
        when(userService.checkPasswordsMatch(currentPasswordField)).thenReturn(false);

        boolean result = currentPasswordMatchValidation.isValid(currentPasswordField, context);

        assertFalse(result);
    }
}