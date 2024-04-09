package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.dto.user.ChangePasswordDTO;
import bg.tu_varna.sit.backend.validation.user.annotation.PasswordFieldsMatch;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PasswordFieldsMatchValidationTest {

    private PasswordFieldsMatchValidation passwordFieldsMatchValidation;

    @Mock
    private PasswordFieldsMatch constraintAnnotation;

    @Mock
    private ConstraintValidatorContext context;

    @Mock
    private ConstraintValidatorContext.ConstraintViolationBuilder constraintViolationBuilder;

    @Mock
    private ConstraintValidatorContext.ConstraintViolationBuilder.NodeBuilderCustomizableContext nodeBuilderCustomizableContext;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        passwordFieldsMatchValidation = new PasswordFieldsMatchValidation();

        when(constraintAnnotation.first()).thenReturn("newPassword");
        when(constraintAnnotation.second()).thenReturn("confirmNewPassword");
        when(constraintAnnotation.message()).thenReturn("Password fields doesn't match");

        when(context.buildConstraintViolationWithTemplate("Password fields doesn't match")).thenReturn(constraintViolationBuilder);
        when(constraintViolationBuilder.addPropertyNode("confirmNewPassword")).thenReturn(nodeBuilderCustomizableContext);

        when(nodeBuilderCustomizableContext.addConstraintViolation()).thenReturn(context);
        passwordFieldsMatchValidation.initialize(constraintAnnotation);
    }

    @Test
    public void testIsValidWithMatchingPasswords() {
        ChangePasswordDTO obj = new ChangePasswordDTO("currentPassword","password123","password123");
        assertTrue(passwordFieldsMatchValidation.isValid(obj, context));
    }

    @Test
    public void testIsValidWithNonMatchingPasswords() {
        ChangePasswordDTO obj = new ChangePasswordDTO("currentPassword","password123","password321");
        assertFalse(passwordFieldsMatchValidation.isValid(obj, context));
    }
}