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
class ExistingUsernameValidationCTest {

    @Mock
    private UserService userService;
    @Mock
    private ConstraintValidatorContext constraintValidatorContext;
    @InjectMocks
    private ExistingUsernameValidationC existingUsernameValidationC;

    @BeforeEach
    void setUp() {
        //? @ExtendWith(MockitoExtension.class) can be replaced with the following line here:
        //MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testIsValid_WhenUsernameDoesNotExist_ShouldReturnTrue() {
        // Given
        String nonExistingUsername = "nonExistingUsername";
        when(userService.isUsernameExists(nonExistingUsername)).thenReturn(false);

        // When
        boolean result = existingUsernameValidationC.isValid(nonExistingUsername, constraintValidatorContext);

        // Then
        assertTrue(result);
    }

    @Test
    public void testIsValid_WhenUsernameExists_ShouldReturnFalse() {
        // Given
        String existingUsername = "existingUsername";
        when(userService.isUsernameExists(existingUsername)).thenReturn(true);

        // When
        boolean result = existingUsernameValidationC.isValid(existingUsername, constraintValidatorContext);

        // Then
        assertFalse(result);
    }
}