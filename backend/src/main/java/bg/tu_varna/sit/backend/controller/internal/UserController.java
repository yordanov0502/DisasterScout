package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.UserDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.mapper.UserMapper;
import bg.tu_varna.sit.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/user")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    //GetMapping() -account information

    //? What return type best suits me ?
    //! For admin updating other users different endpoint should be created,
    //! The main reason for this is the fact that AuthenticationPrincipal User is updated with the provided fields from UserDTO
    //* This endpoint should be called only for PERSONAL update(including: user,admin)
    @Operation(summary = "Update user",
               description = "Update of a user account is performed when this endpoint is called.")
    @PutMapping()
    public UserDTO updateUser(@AuthenticationPrincipal User user, @Validated(value = UserDTO.Group.class) @RequestBody UserDTO userDTO) {
       return userMapper.mapToUserDTO(userService.updateUser(user, userDTO));
    }

    // /update/password

    // /delete/account
}
