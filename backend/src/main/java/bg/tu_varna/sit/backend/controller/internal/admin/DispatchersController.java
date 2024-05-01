package bg.tu_varna.sit.backend.controller.internal.admin;

import bg.tu_varna.sit.backend.models.dto.user.IdDTO;
import bg.tu_varna.sit.backend.models.dto.user.PageDispatcherDTO;
import bg.tu_varna.sit.backend.service.UserService;
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

    //TODO: add register dispatcher endpoint

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



    @Operation(summary = "Delete dispatcher",
            description = "Admin deletes dispatcher when this endpoint is called.")
    @DeleteMapping
    public ResponseEntity<?> deleteDispatcher(@Validated(value = IdDTO.Group.class) @RequestBody IdDTO idDTO){
        return userService.deleteDispatcher(idDTO.id());
    }

    //TODO: Create endpoints for different actions with selected user

}
