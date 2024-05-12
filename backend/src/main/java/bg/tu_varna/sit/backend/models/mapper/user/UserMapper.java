package bg.tu_varna.sit.backend.models.mapper.user;

import bg.tu_varna.sit.backend.models.dto.user.AuthenticationResponseDTO;
import bg.tu_varna.sit.backend.models.dto.user.DispatcherDTO;
import bg.tu_varna.sit.backend.models.dto.user.PageDispatcherDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserUpdateDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {

    public AuthenticationResponseDTO mapToAuthenticationResponseDTO(User user)
    {
        return AuthenticationResponseDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getUserRole().getRole())
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

    public PageDispatcherDTO mapToPageDispatcherDTO(Page<User> pageDispatcher)
    {
        List<DispatcherDTO> dispatcherDTOList = pageDispatcher.getContent()
                .stream()
                .map(dispatcher -> new DispatcherDTO(
                        dispatcher.getId(),
                        dispatcher.getFirstName()+" "+dispatcher.getLastName(),
                        dispatcher.getEmail(),
                        dispatcher.getUsername(),
                        dispatcher.getStatus(),
                        dispatcher.getActivity(),
                        dispatcher.getAvailableZoneIds()))
                .toList();

        return PageDispatcherDTO.builder()
                .content(dispatcherDTOList)
                .totalPages(pageDispatcher.getTotalPages())
                .number(pageDispatcher.getNumber())
                .build();
    }
}
