package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.RegistrationDTO;
import bg.tu_varna.sit.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/admin")
public class AdminController {

    private final UserService userService;

    //? What return type best suits me ?
    @Operation(summary = "Registration",
               description = "Registration of a new user is performed when this endpoint is called.")
    @PostMapping("/register/account")
    // HttpStatus.CREATED
    public void registerNewAccount(@Validated(value = RegistrationDTO.Group.class) @RequestBody RegistrationDTO registrationDTO){
           userService.registerNewUser(registrationDTO);
    }
}