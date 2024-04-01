package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.*;
import bg.tu_varna.sit.backend.validation.user.annotation.*;
import bg.tu_varna.sit.backend.validation.zone.ZoneIdRegexValidation;
import bg.tu_varna.sit.backend.validation.zone.annotation.ZoneIdRegex;
import jakarta.validation.GroupSequence;

public record RegistrationRequestDTO(
        @IdRegex(groups = {IdRegexValidation.class})
        @ExistingId(groups ={ExistingIdValidation.class} )
        String id,
        @NameRegex(groups = {NameRegexValidation.class})
        String firstName,
        @NameRegex(groups = {NameRegexValidation.class})
        String lastName,
        @EmailRegex(groups = {EmailRegexValidation.class})
        @ExistingEmailC(groups = {ExistingEmailValidationC.class})
        String email,
        @UsernameRegex(groups = {UsernameRegexValidation.class})
        @ExistingUsernameC(groups = {ExistingUsernameValidationC.class})
        String username,
        @PasswordRegex(groups = {PasswordRegexValidation.class})
        String password,
        @ZoneIdRegex(groups = {ZoneIdRegexValidation.class})
        String initialZoneId)
        {
    //* @GroupSequence annotation is used to define the execution order of different validations.
    @GroupSequence({IdRegexValidation.class,ExistingIdValidation.class,NameRegexValidation.class,EmailRegexValidation.class, ExistingEmailValidationC.class, UsernameRegexValidation.class, ExistingUsernameValidationC.class, PasswordRegexValidation.class, ZoneIdRegexValidation.class})
    public interface Group{}
}
