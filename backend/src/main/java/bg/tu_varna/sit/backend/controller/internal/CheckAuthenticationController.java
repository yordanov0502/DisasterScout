package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.AuthenticationResponseDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.mapper.user.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher")
public class CheckAuthenticationController {

    private final UserMapper userMapper;

    @Operation(summary = "Check user's authentication",
            description = "This endpoint checks if a user is ALREADY authenticated and if so - returns AuthenticationResponseDTO, which is used to set the userContext on the frontend.")
    @GetMapping("/check-authentication")
    public AuthenticationResponseDTO isUserAuthenticated(@AuthenticationPrincipal User user){
        return userMapper.mapToAuthenticationResponseDTO(user);
    }
}
