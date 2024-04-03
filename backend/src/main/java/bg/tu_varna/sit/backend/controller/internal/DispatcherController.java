package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

//* ADMIN has access to this controller's endpoints.
//TODO: Delete this controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher")
public class DispatcherController {
//    private final UserService userService;
//    private final UserMapper userMapper;
//    private final UserCacheService userCacheService;
//    private final ZoneService zoneService;

    //GetMapping() -account information



    //? To be deleted as it is unnecessary
    @GetMapping()
    public ResponseEntity<String> getUser(@AuthenticationPrincipal User user){
        return new ResponseEntity<>("User "+ user.getFirstName() + "/"+user.getLastLogin()+" has been authenticated successfully", HttpStatus.OK);
    }

    //! MUST APPLY REGEX MANUALLY IN THE METHOD ARGUMENTS
//    @PostMapping ("/{zoneId}")
//    public ResponseEntity<?> updateAlertOfZone(@PathVariable String zoneId){
//        zoneService.updateAlertOfZone(new ZoneDTO(zoneId,new AlertDTO(Severity.HIGH,"Гръмотевични бури")));
//        return ResponseEntity.ok().build();
//    }

    //! MUST APPLY REGEX MANUALLY IN THE METHOD ARGUMENTS
//    @PostMapping("/{zoneId}") ?SHOULD IT BE "@DeleteMapping" or not as we delete the alert, but actually apply update to the Zone, or should it be "@PutMapping" ?
//    public ResponseEntity<String> deleteAlertByZoneId(@PathVariable String zoneId){
//        zoneService.deleteAlertOfZone(zoneId);
//        return new ResponseEntity<>("Alert of zone was successfully deleted.",HttpStatus.OK);
//    }



    // /update/password

    // /delete/account
}
