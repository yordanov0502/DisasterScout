package bg.tu_varna.sit.backend.models.dto.user;

//? In future I intend to implement forgot password/reset password though email service(sending email for password reset / new password).

public record PasswordChangeDTO(
        //! Do I really need id here?
        String id,
        String oldPassword,
        String newPassword) {
}
