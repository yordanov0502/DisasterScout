package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.models.enums.user.Role;
import lombok.Builder;

import java.util.List;

@Builder
public record AuthenticationResponseDTO(
        String firstName,
        String lastName,
        String email,
        String username,
        Role role,
        List<Integer> availableZones) {}