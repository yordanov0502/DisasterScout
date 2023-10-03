package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.*;
import bg.tu_varna.sit.backend.validation.user.annotation.*;
import jakarta.validation.GroupSequence;

public record RegistrationDTO(
        @NameRegex(groups = {NameRegexValidation.class})
        String firstName,
        @NameRegex(groups = {NameRegexValidation.class})
        String lastName,
        @EmailRegex(groups = {EmailRegexValidation.class})
        @ExistingEmailU(groups = {ExistingEmailValidationC.class})
        String email,
        @UsernameRegex(groups = {UsernameRegexValidation.class})
        @ExistingUsernameU(groups = {ExistingUsernameValidationC.class})
        String username,
        @PasswordRegex(groups = {PasswordRegexValidation.class})
        String password)
        /*roles*/{
    //* @GroupSequence annotation is used to define the execution order of different validations.
    @GroupSequence({NameRegexValidation.class,EmailRegexValidation.class, ExistingEmailValidationC.class, UsernameRegexValidation.class, ExistingUsernameValidationC.class, PasswordRegexValidation.class})
    public interface Group{}
}
