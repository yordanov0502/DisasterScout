package bg.tu_varna.sit.backend.controller.internal.admin;

import bg.tu_varna.sit.backend.models.dto.log.PageLogDTO;
import bg.tu_varna.sit.backend.service.LoggerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/admin/logger")
public class LoggerController {

    private final LoggerService loggerService;

    @Operation(summary = "Get paginated logs",
            description = "Admin gets paginated logs when this endpoint is called.")
    @GetMapping
    public PageLogDTO getLogsFromPage(@RequestParam(value = "page") Integer page){
        return loggerService.getLogsFromPage(page-1); //? Number of pages starts from 0 in the PageRequest(default configuration), but on the frontend normally page numbers start from 1.
    }

}
