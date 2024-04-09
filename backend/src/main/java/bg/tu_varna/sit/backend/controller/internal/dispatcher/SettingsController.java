package bg.tu_varna.sit.backend.controller.internal.dispatcher;

import bg.tu_varna.sit.backend.models.dto.user.ChangePasswordDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher/settings")
public class SettingsController {

    private final UserService userService;

    @Operation(summary = "Change password",
            description = "User changes his password when this endpoint is called.")
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal User user, @Validated(value = ChangePasswordDTO.Group.class) @RequestBody ChangePasswordDTO changePasswordDTO) {
        return userService.changePassword(user,changePasswordDTO.newPassword());
    }

}
