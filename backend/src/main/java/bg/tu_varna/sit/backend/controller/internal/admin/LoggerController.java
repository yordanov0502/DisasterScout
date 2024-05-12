package bg.tu_varna.sit.backend.controller.internal.admin;

import bg.tu_varna.sit.backend.models.dto.log.PageLogDTO;
import bg.tu_varna.sit.backend.service.LogService;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegexAndExistenceLogger;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/internal/admin/logger")
public class LoggerController {

    private final LogService logService;

    @Operation(summary = "Get paginated logs",
            description = "Admin gets paginated logs when this endpoint is called.")
    @GetMapping
    public PageLogDTO getLogsFromPage(@RequestParam(value = "page") Integer page,@RequestParam(value = "level") String level,@RequestParam(value = "username") @UsernameRegexAndExistenceLogger String username){
        return logService.getLogsFromPage(page-1,level,username); //? Number of pages starts from 0 in the PageRequest(default configuration), but on the frontend normally page numbers start from 1.
    }

}
