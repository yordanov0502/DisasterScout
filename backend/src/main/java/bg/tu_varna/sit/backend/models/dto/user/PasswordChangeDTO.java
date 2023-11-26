package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.PasswordRegexValidation;
import bg.tu_varna.sit.backend.validation.user.annotation.PasswordRegex;
import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

//? In future I intend to implement forgot password/reset password though email service(sending email for password reset / new password).

public record PasswordChangeDTO(
        //! Do I really need id here?
        //@NotBlank
        //@NotEmpty
        //@NotNull
        //String id,
        @PasswordRegex(groups = {PasswordRegexValidation.class})
                //! Additional logic should be performed to check whether the old password is the actual old password of the specific user
        String oldPassword,
        @PasswordRegex(groups = {PasswordRegexValidation.class})
        String newPassword
        //TODO:  @PasswordRegex(groups = {PasswordRegexValidation.class})
        //? this confirmNewPassword string should be validated except that it matches the regex but also whether it is the same as the previous "newPassword" string field
    //TODO: String confirmNewPassword
) {
    @GroupSequence({PasswordRegexValidation.class})
    public interface Group{}
}