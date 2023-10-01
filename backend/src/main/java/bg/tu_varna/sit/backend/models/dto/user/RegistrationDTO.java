package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.*;
import bg.tu_varna.sit.backend.validation.user.annotation.EmailRegex;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingEmailU;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingUsernameU;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegex;
import jakarta.validation.GroupSequence;

public record RegistrationDTO(
        String firstName,
        String lastName,
        @EmailRegex(groups = {EmailRegexValidation.class})
        @ExistingEmailU(groups = {ExistingEmailValidationC.class})
        String email,
        @UsernameRegex(groups = {UsernameRegexValidation.class})
        @ExistingUsernameU(groups = {ExistingUsernameValidationC.class})
        String username,
        String password)
        /*roles*/{
    //* @GroupSequence annotation is used to define the execution order of different validations.
    @GroupSequence({EmailRegexValidation.class, ExistingEmailValidationC.class, UsernameRegexValidation.class, ExistingUsernameValidationC.class})
    public interface Group{}
}
