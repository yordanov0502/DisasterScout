package bg.tu_varna.sit.backend.controller.external;

import bg.tu_varna.sit.backend.models.dto.user.ForgotPasswordDTO;
import bg.tu_varna.sit.backend.service.primary.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/external/user")
public class ForgotPasswordController {

    private final UserService userService;

    @Operation(summary = "Reset password",
            description = "When this endpoint is called, the backend generates automatically a new password and sends it to the user via the provided email.")
    @PutMapping("/forgot-password")
    public ResponseEntity<?> requestNewPassword(@Validated(value = ForgotPasswordDTO.Group.class) @RequestBody ForgotPasswordDTO forgotPasswordDTO){
        return userService.setNewRandomPassword(forgotPasswordDTO.email());
    }
}
