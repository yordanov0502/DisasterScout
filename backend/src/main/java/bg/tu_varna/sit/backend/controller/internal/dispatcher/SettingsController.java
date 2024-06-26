package bg.tu_varna.sit.backend.controller.internal.dispatcher;

import bg.tu_varna.sit.backend.models.dto.user.ChangePasswordDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.enums.user.userrole.Role;
import bg.tu_varna.sit.backend.service.primary.user.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingAdminInCache;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController("dispatcherSettingsController")
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/internal/dispatcher/settings")
public class SettingsController {

    private final UserService userService;

    @Operation(summary = "Change password",
            description = "User changes his password when this endpoint is called.")
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal User user, @Validated(value = ChangePasswordDTO.Group.class) @RequestBody ChangePasswordDTO changePasswordDTO) {
        return userService.changePassword(user,changePasswordDTO.newPassword());
    }

    @Operation(summary = "Clear personal cache",
            description = "User clears his own cached data when this endpoint is called.")
    @DeleteMapping("/clear-my-cache")
    public void clearMyCache(@AuthenticationPrincipal User user){
        userService.clearMyCache(user);
    }

    @Operation(summary = "Clear cached data of admin",
            description = "User(dispatcher) clears the cached data of the admin when this endpoint is called.")
    @DeleteMapping("/clear-admin-cache/{role}")
    public void clearAdminCache(@PathVariable(value = "role") @ExistingAdminInCache Role role){ //? Role is used as path variable ONLY in order to trigger needed validation, but in reality the path variable is not used.
        userService.clearAdminCache();
    }

}
