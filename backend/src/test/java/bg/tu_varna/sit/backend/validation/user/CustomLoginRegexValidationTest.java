package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.dto.user.LoginDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomLoginRegexValidationTest {

    @Autowired
    private CustomLoginRegexValidation customLoginRegexValidation;

    @Test
    public void testValidLoginDTO() {
        LoginDTO validLoginDTO = new LoginDTO("ValidUser123", "Passw0rd!");
        customLoginRegexValidation.validateLoginDTO(validLoginDTO);
    }

    @Test
    public void testInvalidUsername() {
        LoginDTO invalidUsernameDTO = new LoginDTO("Invalid User", "Passw0rd!");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginDTO(invalidUsernameDTO));
    }

    @Test
    public void testInvalidPassword() {
        LoginDTO invalidPasswordDTO = new LoginDTO("ValidUser123", "invalidpassword");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginDTO(invalidPasswordDTO));
    }

    @Test
    public void testInvalidNonAsciiPrintablePassword() {
        LoginDTO invalidPasswordDTO = new LoginDTO("ValidUser123", "invalidpassword©");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginDTO(invalidPasswordDTO));
    }

    @Test
    public void testNullUsername() {
        LoginDTO nullUsernameDTO = new LoginDTO(null, "Passw0rd!");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginDTO(nullUsernameDTO));
    }

    @Test
    public void testNullPassword() {
        LoginDTO nullPasswordDTO = new LoginDTO("ValidUser123", null);
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginDTO(nullPasswordDTO));
    }

}