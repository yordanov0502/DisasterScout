package bg.tu_varna.sit.backend.controller.internal.dispatcher;

import bg.tu_varna.sit.backend.models.dto.report.AcceptReportDTO;
import bg.tu_varna.sit.backend.models.dto.report.PageReportCardDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.service.primary.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher/reports")
public class ReportsController {

    private final ReportService reportService;

    @Operation(summary = "Get paginated reports",
            description = "Dispatcher/Admin gets paginated reports when this endpoint is called.")
    @GetMapping
    //! URL decoding is being handled automatically. ( character "+" from area is removed automatically(decoded))
    public PageReportCardDTO getReportsFromPage(@RequestParam(value = "page") Integer page, @RequestParam(value = "state") State state, @RequestParam(value = "severityType")String severityType, @RequestParam(value = "zoneId") String zoneId, @RequestParam(value = "area") String area, @RequestParam(value = "category")String category, @RequestParam(value = "issue")String issue){
        return reportService.getReportsFromPage(page-1,state,severityType,zoneId,area,category,issue); //? Number of pages starts from 0 in the PageRequest(default configuration), but on the frontend normally page numbers start from 1.
    }

    @Operation(summary = "Get report information",
            description = "Dispatcher/Admin gets all the information about a  report when this endpoint is called.")
    @GetMapping("/get")
    public ResponseEntity<?> getReportInformation(@RequestParam(value = "reportId") Integer reportId, @RequestParam(value = "state") State state, @RequestParam(value = "severityType")String severityType, @RequestParam(value = "zoneId") String zoneId, @RequestParam(value = "area") String area, @RequestParam(value = "category")String category, @RequestParam(value = "issue")String issue, @AuthenticationPrincipal User user){
        return reportService.getReportInformation(reportId,state,severityType,zoneId,area,category,issue,user);
    }

    @Operation(summary = "Accept report",
            description = "Dispatcher/Admin accepts a report when this endpoint is called. The state of the report changes from PENDING to ACTIVE.")
    @PutMapping("/accept")
    public ResponseEntity<String> acceptReport(@RequestParam(value = "reportId") Integer reportId, @RequestParam(value = "state") State state, @RequestParam(value = "severityType")String severityType, @RequestParam(value = "zoneId") String zoneId, @RequestParam(value = "area") String area, @RequestParam(value = "category")String category, @RequestParam(value = "issue")String issue, @AuthenticationPrincipal User user, @RequestBody AcceptReportDTO acceptReportDTO){
        return reportService.acceptReport(reportId,state,severityType,zoneId,area,category,issue,user,acceptReportDTO);
    }

    @Operation(summary = "Reject report",
            description = "Dispatcher/Admin rejects a report when this endpoint is called. The report is deleted.")
    @DeleteMapping("/reject")
    public ResponseEntity<String> rejectReport(@RequestParam(value = "reportId") Integer reportId, @RequestParam(value = "state") State state, @RequestParam(value = "severityType")String severityType, @RequestParam(value = "zoneId") String zoneId, @RequestParam(value = "area") String area, @RequestParam(value = "category")String category, @RequestParam(value = "issue")String issue, @AuthenticationPrincipal User user){
        return reportService.rejectReport(reportId,state,severityType,zoneId,area,category,issue,user);
    }


}
