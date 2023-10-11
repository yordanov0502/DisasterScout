package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.models.dto.user.LoginDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

//* This validation logic is separate from the rest as it is performed
//* not in a controller/s, but in a security filter.
@Service
public class CustomLoginRegexValidation {


    public void validateLoginDTO(LoginDTO loginDTO){
        if(!validateUsername(loginDTO.getUsername()) || !validatePassword(loginDTO.getPassword()))
            throw new BadCredentialsException("Invalid username or password.");
    }

    private boolean validateUsername(String username) {
        //* Username should only contain letters[a-zA-Z] and digits[0-9].
        String regex = "[a-zA-Z0-9]{4,20}$";

        Pattern p = Pattern.compile(regex);
        if(username == null) {return false;}
        else
        {
            Matcher m = p.matcher(username);
            return m.matches();
        }
    }

    private boolean validatePassword(String password) {
        //* At least one digit (0-9).
        //* At least one lowercase letter (a-z).
        //* At least one uppercase letter (A-Z).
        //* At least one special character from the provided set.
        //* No whitespace characters.
        //* The overall length of the password must be between 8 and 30 characters.
        //! The password should contain only ASCII printable characters
        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_*~!)(./:;<>?{}|`',-])(?=\\S+$).{8,30}$";

        Pattern p = Pattern.compile(regex);
        if(password == null) {return false;}
        else if(StringUtils.isAsciiPrintable(password))//checks if the password contains only of ASCII symbols
        {
            Matcher m = p.matcher(password);
            return m.matches();
        }
        else {return false;}
    }
}
