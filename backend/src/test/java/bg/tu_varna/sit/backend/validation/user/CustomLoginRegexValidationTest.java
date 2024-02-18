package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.dto.user.LoginRequestDTO;
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
        LoginRequestDTO validLoginRequestDTO = new LoginRequestDTO("ValidUser123", "Passw0rd!");
        customLoginRegexValidation.validateLoginRequestDTO(validLoginRequestDTO);
    }

    @Test
    public void testInvalidUsername() {
        LoginRequestDTO invalidUsernameDTO = new LoginRequestDTO("Invalid User", "Passw0rd!");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginRequestDTO(invalidUsernameDTO));
    }

    @Test
    public void testInvalidPassword() {
        LoginRequestDTO invalidPasswordDTO = new LoginRequestDTO("ValidUser123", "invalidpassword");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginRequestDTO(invalidPasswordDTO));
    }

    @Test
    public void testInvalidNonAsciiPrintablePassword() {
        LoginRequestDTO invalidPasswordDTO = new LoginRequestDTO("ValidUser123", "invalidpassword©");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginRequestDTO(invalidPasswordDTO));
    }

    @Test
    public void testNullUsername() {
        LoginRequestDTO nullUsernameDTO = new LoginRequestDTO(null, "Passw0rd!");
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginRequestDTO(nullUsernameDTO));
    }

    @Test
    public void testNullPassword() {
        LoginRequestDTO nullPasswordDTO = new LoginRequestDTO("ValidUser123", null);
        assertThrows(BadCredentialsException.class, () -> customLoginRegexValidation.validateLoginRequestDTO(nullPasswordDTO));
    }

}