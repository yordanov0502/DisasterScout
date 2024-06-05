package bg.tu_varna.sit.backend.controller.internal;

import bg.tu_varna.sit.backend.models.entity.user.User;
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





    //? To be deleted as it is unnecessary
    @GetMapping()
    public ResponseEntity<String> getUser(@AuthenticationPrincipal User user){
        return new ResponseEntity<>("User "+ user.getFirstName() + "/"+user.getLastLogin()+" has been authenticated successfully", HttpStatus.OK);
    }


}
