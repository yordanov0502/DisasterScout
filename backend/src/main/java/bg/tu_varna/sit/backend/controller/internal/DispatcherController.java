package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.AuthenticationResponseDTO;
import bg.tu_varna.sit.backend.models.dto.user.UserDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.mapper.user.UserMapper;
import bg.tu_varna.sit.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//? ADMIN has access to this controller's endpoints
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher")
public class DispatcherController {
    private final UserService userService;
    private final UserMapper userMapper;

    //GetMapping() -account information

    //? What return type best suits me ?
    //! AuthenticationPrincipal User is updated with the provided fields from UserDTO
    //* This endpoint should be called only for PERSONAL update(including: user,admin)
    @Operation(summary = "Update user",
            description = "User updates HIS account information when he calls this endpoint.")
    @PutMapping()
    public UserDTO updateUser(@AuthenticationPrincipal User user, @Validated(value = UserDTO.Group.class) @RequestBody UserDTO userDTO) {
        return userMapper.mapToUserDTO(userService.updateUser(user, userDTO));
    }

    @GetMapping()
    public ResponseEntity<String> getUser(@AuthenticationPrincipal User user){
        return new ResponseEntity<>("User "+ user.getFirstName() + "/"+user.getLastLogin()+" has been authenticated successfully", HttpStatus.OK);
    }

    @Operation(summary = "Check user's authentication",
            description = "This endpoint checks if a user is ALREADY authenticated and if so - returns AuthenticationResponseDTO, which is used to set the userContext on the frontend.")
    @GetMapping("/check-authentication")
    public AuthenticationResponseDTO isUserAuthenticated(@AuthenticationPrincipal User user){
        System.out.println("endpoint called.");
        return userMapper.mapToAuthenticationResponseDTO(user);
    }

    // /update/password

    // /delete/account

//    @PostMapping("/logout")
//    public void logout(@AuthenticationPrincipal User user){}
}
