package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.RegistrationRequestDTO;
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
    //
    //private final UserCacheService userCacheService;
    //

    //? What return type best suits me ?
    @Operation(summary = "Register a new dispatcher",
               description = "Registration of a new dispatcher is performed when this endpoint is called.")
    @PostMapping("/register/dispatcher")
    public void registerNewDispatcher(@Validated(value = RegistrationRequestDTO.Group.class) @RequestBody RegistrationRequestDTO registrationRequestDTO){
           userService.registerNewDispatcher(registrationRequestDTO);
    }



    @GetMapping("/testt")
    public void testingCache(){
        System.out.println("CONTROLLEER");
        System.out.println(userService.getUserById("65c007400dd2a26b5450bc56").toString());
    }

}