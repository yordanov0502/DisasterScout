package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.UserService;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

//@RunWith(MockitoJUnitRunner.class) //for JUnit 4
@ExtendWith(MockitoExtension.class) //for JUnit 5
class ExistingUsernameValidationUTest {

    @Mock
    private UserService userService;
    @Mock
    private ConstraintValidatorContext constraintValidatorContext;
    @InjectMocks
    private ExistingUsernameValidationU existingUsernameValidationU;

    @BeforeEach
    void setUp() {
        //? @ExtendWith(MockitoExtension.class) can be replaced with the following line here:
        //MockitoAnnotations.openMocks(this);
    }

    @Test
    void isValid_withDifferentUsername_shouldReturnTrue() {
        // Mocking authentication
        User authenticatedUser = new User();
        authenticatedUser.setId("6505d8f5bbda1e36bbc2bdea");
        authenticatedUser.setUsername("currentUsername");
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.getUserById("6505d8f5bbda1e36bbc2bdea")).thenReturn(authenticatedUser);
        when(userService.isUsernameExists("currentUsername", "newUsername")).thenReturn(false);

        assertTrue(existingUsernameValidationU.isValid("newUsername", constraintValidatorContext));
    }

    @Test
    void isValid_withSameUsername_shouldReturnTrue() {
        // Mocking authentication
        User authenticatedUser = new User();
        authenticatedUser.setId("6505d8f5bbda1e36bbc2bdea");
        authenticatedUser.setUsername("currentUsername");
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.getUserById("6505d8f5bbda1e36bbc2bdea")).thenReturn(authenticatedUser);
        when(userService.isUsernameExists("currentUsername", "currentUsername")).thenReturn(false);

        assertTrue(existingUsernameValidationU.isValid("currentUsername", constraintValidatorContext));
    }

    @Test
    void isValid_withExistingUsername_shouldReturnTrue() {
        // Mocking authentication
        User authenticatedUser = new User();
        authenticatedUser.setId("6505d8f5bbda1e36bbc2bdea");
        authenticatedUser.setUsername("currentUsername");
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.getUserById("6505d8f5bbda1e36bbc2bdea")).thenReturn(authenticatedUser);
        when(userService.isUsernameExists("currentUsername", "differentUsername")).thenReturn(true);

        assertFalse(existingUsernameValidationU.isValid("differentUsername", constraintValidatorContext));
    }
}