package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.RegistrationRequestDTO;
import bg.tu_varna.sit.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//TODO: Delete this controller and move the endpoint to the related dispatcher controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/admin")
public class AdminController {

    private final UserService userService;

    @Operation(summary = "Register a new dispatcher",
               description = "Registration of a new dispatcher is performed when this endpoint is called.")
    @PostMapping("/register-new-dispatcher")
    public ResponseEntity<?> registerNewDispatcher(@Validated(value = RegistrationRequestDTO.Group.class) @RequestBody RegistrationRequestDTO registrationRequestDTO){
           return userService.registerNewDispatcher(registrationRequestDTO);
    }

}