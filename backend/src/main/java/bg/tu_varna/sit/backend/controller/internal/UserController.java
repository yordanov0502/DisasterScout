package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.user.AccountDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.mapper.UserMapper;
import bg.tu_varna.sit.backend.service.UserService;
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

    @PutMapping("/update/account")
    public AccountDTO updateAccount(@AuthenticationPrincipal User user, @Validated(value = AccountDTO.Group.class) @RequestBody AccountDTO accountDTO) {
       return userMapper.mapToAccountDTO(userService.editUser(user, accountDTO));
    }

    // /update/password

    // /delete/account
}
