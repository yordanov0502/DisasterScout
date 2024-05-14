package bg.tu_varna.sit.backend.controller.internal.admin;

import bg.tu_varna.sit.backend.service.primary.user.UserService;
import bg.tu_varna.sit.backend.service.primary.ZoneService;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegexAndExistence;
import bg.tu_varna.sit.backend.validation.zone.annotation.ZoneIdRegex;
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
    private final ZoneService zoneService;

    @Operation(summary = "Clear cached data of dispatcher",
            description = "User(admin) clears the cached data of a dispatcher by username when this endpoint is called.")
    @DeleteMapping("/clear-dispatcher-cache/{username}")
    public void clearDispatcherCache(@PathVariable(value = "username") @UsernameRegexAndExistence String username){
        userService.clearDispatcherCache(username);
    }

    @Operation(summary = "Clear cached data of all users",
            description = "User(admin) clears the cached data of all users when this endpoint is called.")
    @DeleteMapping("/clear-all-user-cache")
    public void clearCacheOfAllUsers(){
        userService.clearCacheOfAllUsers();
    }

    @Operation(summary = "Clear cached data of a zone",
            description = "User(admin) clears the cached data of a zone when this endpoint is called.")
    @DeleteMapping("/clear-zone-cache/{zoneId}")
    public void clearZoneCache(@PathVariable(value = "zoneId") @ZoneIdRegex String zoneId){
        zoneService.clearCacheOfZone(zoneId);
    }

    @Operation(summary = "Clear all caches of all zones",
            description = "User(admin) clears all caches of all zones when this endpoint is called.")
    @DeleteMapping("/clear-all-zones-caches")
    public void clearCachesOfAllZones(){
        zoneService.clearAllCachesOfAllZones();
    }

}
