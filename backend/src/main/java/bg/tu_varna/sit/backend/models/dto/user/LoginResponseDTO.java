package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.models.enums.user.Role;
import lombok.Builder;

@Builder
public record LoginResponseDTO(
        String firstName,
        String lastName,
        String email,
        String username,
        Role role
        //array of integers(ids of zones active for the specific user)
        )
{

}