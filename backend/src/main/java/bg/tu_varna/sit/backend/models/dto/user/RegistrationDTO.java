package bg.tu_varna.sit.backend.models.dto.user;

public record RegistrationDTO(
        String firstName,
        String lastName,
        String email,
        String username,
        String password)
        /*roles*/{
}
