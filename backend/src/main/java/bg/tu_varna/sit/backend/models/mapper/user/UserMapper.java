package bg.tu_varna.sit.backend.models.mapper.user;

import bg.tu_varna.sit.backend.models.dto.user.LoginResponseDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public LoginResponseDTO mapToLoginResponseDTO(User user)
    {
        return LoginResponseDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                //! .array of integers(id of available zones)
                .build();
    }

    public UserDTO mapToUserDTO(User user)
    {
        return UserDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }
}
