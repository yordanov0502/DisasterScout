package bg.tu_varna.sit.backend.models.dto.user;

public record PasswordChangeDTO(
        String id,
        String oldPassword,
        String newPassword) {
}
