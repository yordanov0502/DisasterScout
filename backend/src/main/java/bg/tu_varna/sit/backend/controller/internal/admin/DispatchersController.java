package bg.tu_varna.sit.backend.controller.internal.admin;

import bg.tu_varna.sit.backend.models.dto.user.IdDTO;
import bg.tu_varna.sit.backend.models.dto.user.PageDispatcherDTO;
import bg.tu_varna.sit.backend.models.dto.user.RegistrationRequestDTO;
import bg.tu_varna.sit.backend.models.dto.user.UpdateZonesOfDispatcherDTO;
import bg.tu_varna.sit.backend.service.primary.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/admin/dispatchers")
public class DispatchersController {

    private final UserService userService;

    @Operation(summary = "Get paginated dispatchers",
            description = "Admin gets paginated dispatchers when this endpoint is called.")
    @GetMapping
    public PageDispatcherDTO getDispatchersFromPage(@RequestParam(value = "page") Integer page){
        return userService.getDispatchersFromPage(page-1); //? Number of pages starts from 0 in the PageRequest(default configuration), but on the frontend normally page numbers start from 1.
    }

    @Operation(summary = "Register a new dispatcher",
            description = "Admin does a registration of a new dispatcher when this endpoint is called.")
    @PostMapping("/registration")
    public ResponseEntity<?> registerNewDispatcher(@Validated(value = RegistrationRequestDTO.Group.class) @RequestBody RegistrationRequestDTO registrationRequestDTO){
        return userService.registerNewDispatcher(registrationRequestDTO);
    }

    @Operation(summary = "Lock account of dispatcher",
            description = "Admin locks account of dispatcher when this endpoint is called.")
    @PutMapping("/lock")
    public ResponseEntity<?> lockDispatcherManually(@Validated(value = IdDTO.Group.class) @RequestBody IdDTO idDTO){
        return userService.lockDispatcherManually(idDTO.id());
    }

    @Operation(summary = "Unlock account of dispatcher",
            description = "Admin unlocks account of dispatcher when this endpoint is called.")
    @PutMapping("/unlock")
    public ResponseEntity<?> unlockDispatcherManually(@Validated(value = IdDTO.Group.class) @RequestBody IdDTO idDTO){
        return userService.unlockDispatcherManually(idDTO.id());
    }

    @Operation(summary = "Update available zones of dispatcher",
            description = "Admin updates available zones of dispatcher when this endpoint is called.")
    @PutMapping("/available-zones")
    public ResponseEntity<?> updateAvailableZonesOfDispatcher(@Validated(value = UpdateZonesOfDispatcherDTO.Group.class) @RequestBody UpdateZonesOfDispatcherDTO updateZonesOfDispatcherDTO){
        return userService.updateAvailableZonesOfDispatcher(updateZonesOfDispatcherDTO);
    }

    @Operation(summary = "Delete dispatcher",
            description = "Admin deletes dispatcher when this endpoint is called.")
    @DeleteMapping
    public ResponseEntity<?> deleteDispatcher(@Validated(value = IdDTO.Group.class) @RequestBody IdDTO idDTO){
        return userService.deleteDispatcher(idDTO.id());
    }

}