package bg.tu_varna.sit.backend.models.mapper.user;

import bg.tu_varna.sit.backend.models.dto.user.AuthenticationResponseDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserUpdateDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public AuthenticationResponseDTO mapToAuthenticationResponseDTO(User user)
    {
        return AuthenticationResponseDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                .availableZoneIds(user.getAvailableZoneIds())
                .build();
    }

    public UserUpdateDTO mapToUserUpdateDTO(User user)
    {
        return UserUpdateDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }
}
