package bg.tu_varna.sit.backend.controller.internal.dispatcher;

import bg.tu_varna.sit.backend.models.dto.report.PageReportCardDTO;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.service.primary.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher/reports")
public class ReportsController {

    private final ReportService reportService;

    @Operation(summary = "Get paginated reports",
            description = "Dispatcher/Admin gets paginated reports when this endpoint is called.")
    @GetMapping
    public PageReportCardDTO getReportsFromPage(@RequestParam(value = "page") Integer page, @RequestParam(value = "state") State state, @RequestParam(value = "severityType")String severityType, @RequestParam(value = "zoneId") String zoneId,  @RequestParam(value = "category")String category, @RequestParam(value = "issue")String issue){
        return reportService.getReportsFromPage(page-1,state,severityType,zoneId,category,issue); //? Number of pages starts from 0 in the PageRequest(default configuration), but on the frontend normally page numbers start from 1.
    }
}
