package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.service.primary.user.UserService;
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
class IsIdExistsValidationTest {

    @Mock
    private UserService userService;
    @Mock
    private ConstraintValidatorContext constraintValidatorContext;

    @InjectMocks
    IsIdExistsValidation isIdExistsValidation;

    @BeforeEach
    void setUp() {
        //? @ExtendWith(MockitoExtension.class) can be replaced with the following line here:
        //MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testIsValid_WhenIdDoesExist_ShouldReturnTrue() {
        // Given
        String existingId = "5508079668";
        when(userService.isIdExists(existingId)).thenReturn(true);

        // When
        boolean result = isIdExistsValidation.isValid(existingId, constraintValidatorContext);

        // Then
        assertTrue(result);
    }

    @Test
    public void testIsValid_WhenIdExists_ShouldReturnFalse() {
        // Given
        String noneExistingId = "5508079668";
        when(userService.isIdExists(noneExistingId)).thenReturn(false);

        // When
        boolean result = isIdExistsValidation.isValid(noneExistingId, constraintValidatorContext);

        // Then
        assertFalse(result);
    }
}