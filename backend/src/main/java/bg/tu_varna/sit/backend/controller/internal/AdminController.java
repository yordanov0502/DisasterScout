package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.RegistrationDTO;
import bg.tu_varna.sit.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/admin")
public class AdminController {

    private final UserService userService;

    //? What return type best suits me ?
    @Operation(summary = "Registration",
               description = "Registration of a new dispatcher is performed when this endpoint is called.")
    @PostMapping("/register/dispatcher")
    public void registerNewDispatcher(@Validated(value = RegistrationDTO.Group.class) @RequestBody RegistrationDTO registrationDTO){
           userService.registerNewDispatcher(registrationDTO);
    }
}