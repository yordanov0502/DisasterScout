package bg.tu_varna.sit.backend.controller.external;

import bg.tu_varna.sit.backend.models.dto.report.SubmitReportDTO;
import bg.tu_varna.sit.backend.models.dto.zone.SeveritiesOfAllZones;
import bg.tu_varna.sit.backend.models.mapper.zone.ZoneMapper;
import bg.tu_varna.sit.backend.service.primary.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/external/reports")
public class PublicReportsController {

    private final ReportService reportService;
    private final ZoneMapper zoneMapper;

    @Operation(summary = "Submit a report",
            description = "When this endpoint is called a new report is submitted.")
    @PostMapping("/submit")
    public ResponseEntity<?> submitReport(@RequestBody SubmitReportDTO submitReportDTO) {
        return reportService.submitReport(submitReportDTO);}

    @Operation(summary = "Get severities of alerts(if any exist) of all zones.",
            description = "This endpoint returns all available zones' ids along with their alerts'(if any exist) severities. This helps in coloring the Bulgarian map in the public website")
    @GetMapping("/alerts-severities")
    public SeveritiesOfAllZones getSeveritiesOfAllZones() {return zoneMapper.mapToAllZonesWithAlertsDTO();}
}