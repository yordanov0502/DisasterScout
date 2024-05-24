package bg.tu_varna.sit.backend.controller.external;

import bg.tu_varna.sit.backend.models.dto.report.SubmitReportDTO;
import bg.tu_varna.sit.backend.service.primary.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/external/reports")
public class ReportsController {

    private final ReportService reportService;

    @Operation(summary = "Submit a report",
            description = "When this endpoint is called a new report is submitted.")
    @PostMapping("/submit")
    public ResponseEntity<?> submitReport(@RequestBody SubmitReportDTO submitReportDTO) {
        return reportService.submitReport(submitReportDTO);}
}
