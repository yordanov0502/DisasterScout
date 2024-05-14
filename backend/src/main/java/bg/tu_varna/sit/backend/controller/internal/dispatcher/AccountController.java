package bg.tu_varna.sit.backend.controller.internal.dispatcher;

import bg.tu_varna.sit.backend.models.dto.user.UserUpdateDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.mapper.user.UserMapper;
import bg.tu_varna.sit.backend.service.primary.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//* ADMIN has access to this controller.
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher/account")
public class AccountController {

    private final UserService userService;
    private final UserMapper userMapper;

    //! AuthenticationPrincipal User is updated with the provided fields from UserUpdateDTO
    //* This endpoint should be called only for PERSONAL update(including: dispatcher,admin)
    @Operation(summary = "Update user",
            description = "User updates his account information when this endpoint is called.")
    @PutMapping("/update")
    public UserUpdateDTO updateUser(@AuthenticationPrincipal User user, @Validated(value = UserUpdateDTO.Group.class) @RequestBody UserUpdateDTO userUpdateDTO) {
        return userMapper.mapToUserUpdateDTO(userService.updateUser(user, userUpdateDTO));
    }
}
