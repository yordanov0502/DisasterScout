package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.EmailRegexValidation;
import bg.tu_varna.sit.backend.validation.user.ExistingEmailValidationU;
import bg.tu_varna.sit.backend.validation.user.ExistingUsernameValidationU;
import bg.tu_varna.sit.backend.validation.user.UsernameRegexValidation;
import bg.tu_varna.sit.backend.validation.user.annotation.EmailRegex;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingEmailU;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingUsernameU;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegex;
import jakarta.validation.GroupSequence;
import lombok.Builder;

@Builder
public record AccountDTO(
        String id,
        String firstName,
        String lastName,
        @EmailRegex(groups = {EmailRegexValidation.class})
        @ExistingEmailU(groups = {ExistingEmailValidationU.class})
        String email,
        @UsernameRegex(groups = {UsernameRegexValidation.class})
        @ExistingUsernameU(groups = {ExistingUsernameValidationU.class})
        String username)
        {
            //* @GroupSequence annotation is used to define the execution order of different validations.
            @GroupSequence({EmailRegexValidation.class,ExistingEmailValidationU.class,UsernameRegexValidation.class,ExistingUsernameValidationU.class})
            public interface Group{}
        }