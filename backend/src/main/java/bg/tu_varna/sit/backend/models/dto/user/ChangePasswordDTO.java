package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.CurrentPasswordMatchValidation;
import bg.tu_varna.sit.backend.validation.user.PasswordFieldsMatchValidation;
import bg.tu_varna.sit.backend.validation.user.PasswordRegexValidation;
import bg.tu_varna.sit.backend.validation.user.annotation.CurrentPasswordMatch;
import bg.tu_varna.sit.backend.validation.user.annotation.PasswordFieldsMatch;
import bg.tu_varna.sit.backend.validation.user.annotation.PasswordRegex;
import jakarta.validation.GroupSequence;

@PasswordFieldsMatch(first = "newPassword", second = "confirmNewPassword", groups = PasswordFieldsMatchValidation.class) //? validates whether "confirmNewPassword" value is equal to "newPassword"
public record ChangePasswordDTO(
        @PasswordRegex(groups = {PasswordRegexValidation.class}, message = "Invalid type of currentPassword.")
        @CurrentPasswordMatch(groups = {CurrentPasswordMatchValidation.class})
        String currentPassword,
        @PasswordRegex(groups = {PasswordRegexValidation.class}, message = "Invalid type of newPassword.")
        String newPassword,
        @PasswordRegex(groups = {PasswordRegexValidation.class}, message = "Invalid type of confirmNewPassword.")
        String confirmNewPassword
) {
    @GroupSequence({PasswordRegexValidation.class, CurrentPasswordMatchValidation.class, PasswordFieldsMatchValidation.class})
    public interface Group{}
}