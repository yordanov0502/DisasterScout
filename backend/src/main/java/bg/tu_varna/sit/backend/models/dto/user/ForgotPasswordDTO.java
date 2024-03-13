package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.*;
import bg.tu_varna.sit.backend.validation.user.annotation.EmailRegex;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingEmail;
import jakarta.validation.GroupSequence;

public record ForgotPasswordDTO(
        @EmailRegex(groups = {EmailRegexValidation.class})
        @ExistingEmail(groups = {ExistingEmailValidation.class})
        String email) {
    @GroupSequence({EmailRegexValidation.class,ExistingEmailValidation.class})
    public interface Group{}
}
