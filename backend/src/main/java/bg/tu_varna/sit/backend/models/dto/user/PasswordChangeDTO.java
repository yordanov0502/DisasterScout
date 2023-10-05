package bg.tu_varna.sit.backend.models.dto.user;

//? In future I intend to implement forgot password/reset password though email service(sending email for password reset / new password).

import bg.tu_varna.sit.backend.validation.user.PasswordRegexValidation;
import bg.tu_varna.sit.backend.validation.user.annotation.PasswordRegex;
import jakarta.validation.GroupSequence;

public record PasswordChangeDTO(
        //! Do I really need id here?
        String id,
        @PasswordRegex(groups = {PasswordRegexValidation.class})
                //! Additional logic should be performed to check whether the old password is the actual old password of the specific user
        String oldPassword,
        @PasswordRegex(groups = {PasswordRegexValidation.class})
        String newPassword) {
    @GroupSequence({PasswordRegexValidation.class})
    public interface Group{}
}