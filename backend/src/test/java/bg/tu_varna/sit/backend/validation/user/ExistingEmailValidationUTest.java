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

import java.util.Date;

import static bg.tu_varna.sit.backend.models.enums.user.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.user.Role.ADMIN;
import static bg.tu_varna.sit.backend.models.enums.user.Status.ACTIVE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

//@RunWith(MockitoJUnitRunner.class) //for JUnit 4
@ExtendWith(MockitoExtension.class) //for JUnit 5
class ExistingEmailValidationUTest {

    @Mock
    private UserService userService;
    @Mock
    private ConstraintValidatorContext constraintValidatorContext;
    @InjectMocks
    private ExistingEmailValidationU existingEmailValidationU;

    @BeforeEach
    void setUp() {
        //? @ExtendWith(MockitoExtension.class) can be replaced with the following line here:
        //MockitoAnnotations.openMocks(this);
    }

    @Test
    void isValid_withDifferentEmail_shouldReturnTrue() {
        // Mocking authentication
        User authenticatedUser = new User("6505d8f5bbda1e36bbc2bdea","Todor","Yordanov","auth@example.com","tosheto","ASas2@dsadas12", ADMIN, ACTIVE, OFFLINE, new Date(),0);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.getUserById("6505d8f5bbda1e36bbc2bdea")).thenReturn(authenticatedUser);
        when(userService.isEmailExists("auth@example.com", "new@example.com")).thenReturn(false);

        assertTrue(existingEmailValidationU.isValid("new@example.com", constraintValidatorContext));
    }

    @Test
    void isValid_withSameEmail_shouldReturnTrue() {
        // Mocking authentication
        User authenticatedUser = new User("6505d8f5bbda1e36bbc2bdea","Todor","Yordanov","auth@example.com","tosheto","ASas2@dsadas12", ADMIN, ACTIVE, OFFLINE, new Date(),0);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.getUserById("6505d8f5bbda1e36bbc2bdea")).thenReturn(authenticatedUser);
        when(userService.isEmailExists("auth@example.com", "auth@example.com")).thenReturn(false);

        assertTrue(existingEmailValidationU.isValid("auth@example.com", constraintValidatorContext));
    }

    @Test
    void isValid_withExistingEmail_shouldReturnFalse() {
        // Mocking authentication
        User authenticatedUser = new User("6505d8f5bbda1e36bbc2bdea","Todor","Yordanov","auth@example.com","tosheto","ASas2@dsadas12", ADMIN, ACTIVE, OFFLINE, new Date(),0);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.getUserById("6505d8f5bbda1e36bbc2bdea")).thenReturn(authenticatedUser);
        when(userService.isEmailExists("auth@example.com", "different@example.com")).thenReturn(true);

        assertFalse(existingEmailValidationU.isValid("different@example.com", constraintValidatorContext));
    }
}