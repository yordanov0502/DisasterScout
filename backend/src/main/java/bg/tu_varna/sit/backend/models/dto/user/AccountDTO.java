package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.*;
import bg.tu_varna.sit.backend.validation.user.annotation.*;
import jakarta.validation.GroupSequence;
import lombok.Builder;

//? This DTO is used for updating a user data(this DTO arrives from frontend)
@Builder
public record AccountDTO(
        @NameRegex(groups = {NameRegexValidation.class})
        String firstName,
        @NameRegex(groups = {NameRegexValidation.class})
        String lastName,
        @EmailRegex(groups = {EmailRegexValidation.class})
        @ExistingEmailU(groups = {ExistingEmailValidationU.class})
        String email,
        @UsernameRegex(groups = {UsernameRegexValidation.class})
        @ExistingUsernameU(groups = {ExistingUsernameValidationU.class})
        String username)
        {
            //* @GroupSequence annotation is used to define the execution order of different validations.
            @GroupSequence({NameRegexValidation.class,EmailRegexValidation.class,ExistingEmailValidationU.class,UsernameRegexValidation.class,ExistingUsernameValidationU.class})
            public interface Group{}
        }