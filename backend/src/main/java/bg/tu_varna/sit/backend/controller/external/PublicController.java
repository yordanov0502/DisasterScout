package bg.tu_varna.sit.backend.controller.external;

import bg.tu_varna.sit.backend.models.dto.report.PageReportCardDTO;
import bg.tu_varna.sit.backend.models.dto.report.SubmitReportDTO;
import bg.tu_varna.sit.backend.models.dto.zone.AlertsOfAllZones;
import bg.tu_varna.sit.backend.models.dto.zone.SeveritiesOfAllZones;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.models.mapper.zone.ZoneMapper;
import bg.tu_varna.sit.backend.service.primary.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/external/reports")
public class PublicController {

    private final ReportService reportService;
    private final ZoneMapper zoneMapper;

    @Operation(summary = "Submit a report",
            description = "When this endpoint is called a new report is submitted.")
    @PostMapping("/submit")
    public ResponseEntity<?> submitReport(@RequestBody SubmitReportDTO submitReportDTO) {
        return reportService.submitReport(submitReportDTO);}

    @Operation(summary = "Get severities of alerts(if any exist) of all zones.",
            description = "This endpoint returns all available zones' ids along with their alerts'(if any exist) severities. This helps in coloring the Bulgarian map in the public website.")
    @GetMapping("/alerts-severities")
    public SeveritiesOfAllZones getSeveritiesOfAllZones() {return zoneMapper.mapToAllZonesWithAlertsDTO();}

    @Operation(summary = "Get alerts(if any exist) of all zones.",
            description = "This endpoint returns all available zones' ids along with their alerts'(if any exist).")
    @GetMapping("/zones-alerts")
    public AlertsOfAllZones getAlertsOfAllZones() {return zoneMapper.mapToAlertsOfAllZones();}

    @Operation(summary = "Get paginated reports",
            description = "Every website visitor gets paginated FRESH reports when this endpoint is called.")
    @GetMapping
    //! URL decoding is being handled automatically. ( character "+" from area is removed automatically(decoded))
    public PageReportCardDTO getReportsFromPage(@RequestParam(value = "page") Integer page, @RequestParam(value = "severityType")String severityType, @RequestParam(value = "zoneId") String zoneId, @RequestParam(value = "area") String area, @RequestParam(value = "category")String category, @RequestParam(value = "issue")String issue){
        return reportService.getReportsFromPage(page-1,State.FRESH,severityType,zoneId,area,category,issue); //? Number of pages starts from 0 in the PageRequest(default configuration), but on the frontend normally page numbers start from 1.
    }

    @Operation(summary = "Get public report information",
            description = "Website visitor gets all the information about a FRESH report when this endpoint is called.")
    @GetMapping("/get")
    public ResponseEntity<?> getReportInformation(@RequestParam(value = "reportId") Integer reportId, @RequestParam(value = "severityType")String severityType, @RequestParam(value = "zoneId") String zoneId, @RequestParam(value = "area") String area, @RequestParam(value = "category")String category, @RequestParam(value = "issue")String issue){
        return reportService.getPublicReportInformation(reportId,State.FRESH,severityType,zoneId,area,category,issue);
    }
}