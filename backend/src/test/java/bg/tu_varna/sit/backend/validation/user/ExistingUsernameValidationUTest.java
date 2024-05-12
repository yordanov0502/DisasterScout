package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.entity.UserRole;
import bg.tu_varna.sit.backend.models.entity.UserStatus;
import bg.tu_varna.sit.backend.models.entity.Zone;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static bg.tu_varna.sit.backend.models.enums.user.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.userrole.Role.ADMIN;
import static bg.tu_varna.sit.backend.models.enums.userstatus.Status.ACTIVE;
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
        User authenticatedUser = new User("0242071340","Todor","Yordanov","auth@example.com","currentUsername","ASas2@dsadas12", new UserRole(1,ADMIN), new UserStatus(1,ACTIVE), OFFLINE, new Date(),0,new ArrayList<>(List.of(new Zone("st3","Варна",5,null))));
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.isUsernameExists("currentUsername", "newUsername")).thenReturn(false);

        assertTrue(existingUsernameValidationU.isValid("newUsername", constraintValidatorContext));
    }

    @Test
    void isValid_withSameUsername_shouldReturnTrue() {
        // Mocking authentication
        User authenticatedUser = new User("0242071340","Todor","Yordanov","auth@example.com","currentUsername","ASas2@dsadas12", new UserRole(1,ADMIN), new UserStatus(1,ACTIVE), OFFLINE, new Date(),0,new ArrayList<>(List.of(new Zone("st3","Варна",5,null))));
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.isUsernameExists("currentUsername", "currentUsername")).thenReturn(false);

        assertTrue(existingUsernameValidationU.isValid("currentUsername", constraintValidatorContext));
    }

    @Test
    void isValid_withExistingUsername_shouldReturnTrue() {
        // Mocking authentication
        User authenticatedUser = new User("0242071340","Todor","Yordanov","auth@example.com","currentUsername","ASas2@dsadas12", new UserRole(1,ADMIN), new UserStatus(1,ACTIVE), OFFLINE, new Date(),0,new ArrayList<>(List.of(new Zone("st3","Варна",5,null))));
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(authenticatedUser, null));
        SecurityContextHolder.setContext(securityContext);

        when(userService.isUsernameExists("currentUsername", "differentUsername")).thenReturn(true);

        assertFalse(existingUsernameValidationU.isValid("differentUsername", constraintValidatorContext));
    }
}