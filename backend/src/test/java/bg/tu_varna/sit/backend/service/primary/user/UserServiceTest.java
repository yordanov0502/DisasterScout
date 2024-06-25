package bg.tu_varna.sit.backend.service.primary.user;

import bg.tu_varna.sit.backend.models.dto.user.LoginRequestDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.service.cache.user.UserCacheService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.BadCredentialsException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class UserServiceTest {
    @Mock
    private UserCacheService userCacheService;


    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById() {
        User user = new User();
        when(userCacheService.getUserById("0346281024")).thenReturn(user);

        User result = userService.getUserById("0346281024");

        assertEquals(user, result);
    }


    @Test
    void checkUserCredentials_invalidUser() {
        when(userCacheService.getUserByUsername("dispatcher333")).thenReturn(null);

        assertThrows(BadCredentialsException.class, () -> userService.checkUserCredentials(new LoginRequestDTO("dispatcher333", "ppRR0b@1")));
    }


    @Test
    void generateRandomPassword() {
        String password = userService.generateRandomPassword();

        assertNotNull(password);
        assertTrue(password.length() >= 8 && password.length() <= 30);
    }


}