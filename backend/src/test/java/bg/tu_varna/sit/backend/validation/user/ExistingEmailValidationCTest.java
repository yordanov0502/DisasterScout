package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.UserService;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

//@RunWith(MockitoJUnitRunner.class) //for JUnit 4
@ExtendWith(MockitoExtension.class) //for JUnit 5
class ExistingEmailValidationCTest {

    @Mock
    private UserService userService;
    @Mock
    private ConstraintValidatorContext constraintValidatorContext;
    @InjectMocks
    private ExistingEmailValidationC existingEmailValidationC;

    @BeforeEach
    void setUp() {
        //? @ExtendWith(MockitoExtension.class) can be replaced with the following line here:
        //MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testIsValid_WhenEmailDoesNotExist_ShouldReturnTrue() {
        // Given
        String nonExistingEmail = "nonExistingEmail";
        when(userService.isEmailExists(nonExistingEmail)).thenReturn(false);

        // When
        boolean result = existingEmailValidationC.isValid(nonExistingEmail, constraintValidatorContext);

        // Then
        assertTrue(result);
    }

    @Test
    public void testIsValid_WhenEmailExists_ShouldReturnFalse() {
        // Given
        String existingEmail = "existingEmail";
        when(userService.isEmailExists(existingEmail)).thenReturn(true);

        // When
        boolean result = existingEmailValidationC.isValid(existingEmail, constraintValidatorContext);

        // Then
        assertFalse(result);
    }
}