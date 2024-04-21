package bg.tu_varna.sit.backend.controller.internal.admin;

import bg.tu_varna.sit.backend.service.UserService;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegexAndExistence;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("adminSettingsController")
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/internal/admin/settings")
public class SettingsController {

    private final UserService userService;

    @Operation(summary = "Clear cached data of dispatcher",
            description = "User(admin) clears the cached data of a dispatcher by username when this endpoint is called.")
    @DeleteMapping("/clear-dispatcher-cache/{username}")
    public void clearDispatcherCache(@PathVariable (value = "username") @UsernameRegexAndExistence String username){
        userService.clearDispatcherCache(username);
    }

}
