package bg.tu_varna.sit.backend.models.dto.user;

public record PasswordChangeDTO(
        //! Do I really need id here?
        String id,
        String oldPassword,
        String newPassword) {
}
