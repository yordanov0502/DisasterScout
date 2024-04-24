package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.dto.alert.AlertDTO;
import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.alert.Severity;
import bg.tu_varna.sit.backend.service.ZoneService;
import bg.tu_varna.sit.backend.validation.zone.annotation.ZoneIdRegex;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//* ADMIN has access to this controller's endpoints.
//TODO: Delete this controller
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/internal/dispatcher")
public class DispatcherController {
//    private final UserService userService;
//    private final UserMapper userMapper;
//    private final UserCacheService userCacheService;
    private final ZoneService zoneService;

    //GetMapping() -account information



    //? To be deleted as it is unnecessary
    @GetMapping()
    public ResponseEntity<String> getUser(@AuthenticationPrincipal User user){
        return new ResponseEntity<>("User "+ user.getFirstName() + "/"+user.getLastLogin()+" has been authenticated successfully", HttpStatus.OK);
    }

    //TODO: when time reached, move ZoneDTO  to method argument
    @PostMapping ("/update/{zoneId}")
    public ResponseEntity<?> updateAlertOfZone(@AuthenticationPrincipal User user ,@PathVariable @ZoneIdRegex String zoneId){
        zoneService.updateAlertOfZone(user, new ZoneDTO(zoneId,new AlertDTO(Severity.CRITICAL,"Гръмотевични бури")));
        return ResponseEntity.ok().build();
    }

    @PutMapping("/delete/{zoneId}") //?SHOULD IT BE "@DeleteMapping" or not as we delete the alert, but actually apply update to the Zone, or should it be "@PutMapping" ?
    public ResponseEntity<String> deleteAlertByZoneId(@AuthenticationPrincipal User user, @PathVariable @ZoneIdRegex String zoneId){
        zoneService.deleteAlertOfZone(user, zoneId);
        return new ResponseEntity<>("Alert of zone was successfully deleted.",HttpStatus.OK);
    }



    // /update/password

    // /delete/account
}
