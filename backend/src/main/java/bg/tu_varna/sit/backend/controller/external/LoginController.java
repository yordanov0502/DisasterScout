package bg.tu_varna.sit.backend.controller.external;

import bg.tu_varna.sit.backend.models.dto.user.AccountDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.mapper.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "Login",
               description = "When this endpoint is called LoginAuthenticationFilter is triggered. Inside the filter is performed all logic related to the login process.")
    @PostMapping
    public AccountDTO login(@AuthenticationPrincipal User user) {return userMapper.mapToAccountDTO(user);}
}
