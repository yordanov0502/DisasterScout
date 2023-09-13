package bg.tu_varna.sit.backend.models.dto.user;

import lombok.Builder;

@Builder
public record AccountDTO(
        String id,
        String firstName,
        String lastName,
        String email,
        String username)
        /*roles*/{
}
