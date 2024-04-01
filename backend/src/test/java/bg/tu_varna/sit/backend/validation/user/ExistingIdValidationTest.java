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
class ExistingIdValidationTest {

    @Mock
    private UserService userService;
    @Mock
    private ConstraintValidatorContext constraintValidatorContext;
    @InjectMocks
    private ExistingIdValidation existingIdValidation;
    @BeforeEach
    void setUp() {
        //? @ExtendWith(MockitoExtension.class) can be replaced with the following line here:
        //MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testIsValid_WhenIdDoesNotExist_ShouldReturnTrue() {
        // Given
        String nonExistingId = "5508079668";
        when(userService.isIdExists(nonExistingId)).thenReturn(false);

        // When
        boolean result = existingIdValidation.isValid(nonExistingId, constraintValidatorContext);

        // Then
        assertTrue(result);
    }

    @Test
    public void testIsValid_WhenIdExists_ShouldReturnFalse() {
        // Given
        String existingId = "5508079668";
        when(userService.isIdExists(existingId)).thenReturn(true);

        // When
        boolean result = existingIdValidation.isValid(existingId, constraintValidatorContext);

        // Then
        assertFalse(result);
    }
}