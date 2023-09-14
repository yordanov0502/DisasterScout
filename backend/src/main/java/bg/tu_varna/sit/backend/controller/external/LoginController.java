package bg.tu_varna.sit.backend.controller.external;

import bg.tu_varna.sit.backend.models.dto.user.AccountDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/external/login")
public class LoginController {

    private final UserMapper userMapper;
    @PostMapping
    public AccountDTO login(@AuthenticationPrincipal User user) {return userMapper.mapToAccountDTO(user);}
}
