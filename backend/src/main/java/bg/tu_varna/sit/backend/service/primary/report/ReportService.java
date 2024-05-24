package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.dto.report.SubmitReportDTO;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.entity.report.Report;
import bg.tu_varna.sit.backend.repository.report.ReportRepository;
import bg.tu_varna.sit.backend.service.primary.SeverityService;
import bg.tu_varna.sit.backend.service.primary.ZoneService;
import bg.tu_varna.sit.backend.service.util.TimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

import static bg.tu_varna.sit.backend.models.enums.report.reportstate.State.PENDING;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportIssueService reportIssueService;
    private final SeverityService severityService;
    private final ReportStateService reportStateService;
    private final ZoneService zoneService;
    private final ReporterService reporterService;
    private final TimeService timeService;

    public ResponseEntity<?> submitReport(SubmitReportDTO submitReportDTO){

        Zone zone = zoneService.getZoneById(submitReportDTO.zoneId());
        String zoneName = String.format("обл.%s", zone.getName());
        String area = !submitReportDTO.area().isBlank() ? submitReportDTO.area() : null;
        String address = !submitReportDTO.address().isBlank() ? submitReportDTO.address() : null;
        String fullAddress;
        if(area != null && address != null)
        {
            fullAddress = String.format("%s~%s~%s", zoneName,area,address);
        }
        else if(area != null)
        {
            fullAddress = String.format("%s~%s", zoneName,area);
        }
        else if(address != null)
        {
            fullAddress = String.format("%s~%s", zoneName,address);
        }
        else
        {
            fullAddress = zoneName;
        }

        Date timeOfReportSubmission = new Date();
        //? if expectedDuration is -1, it means "не знам" option was chosen from frontend which sets +24 hours
        //? in all other cases sets the expectedDuration
        Date whenReportExpires = timeService.addHoursToDateAndTime(timeOfReportSubmission, submitReportDTO.expectedDuration() == -1 ? 24: submitReportDTO.expectedDuration());


        Report submittedReport = Report.builder()
                .reportIssue(reportIssueService.getReportIssueByIssue(submitReportDTO.issue()))
                .description(submitReportDTO.description())
                .severity(severityService.getSeverityBySeverityType(submitReportDTO.severityType()))
                .reportState(reportStateService.getReportStateByState(PENDING))
                .zone(zone)
                .user(null) //? when report is submitted its user(admin/dispatcher) is set to null initially until it is processed by any dispatcher or admin
                .reporter(reporterService.getReporter(submitReportDTO.firstName(), submitReportDTO.lastName(), submitReportDTO.phoneNumber())) //! If a reporter exists it is returned, otherwise it is created in the method from the ReportService and is again returned
                .imageUrl(submitReportDTO.imageUrl())
                .locationUrl(submitReportDTO.locationUrl())
                .address(fullAddress)
                .submittedAt(timeOfReportSubmission)
                .publishedAt(null)
                .expiresAt(whenReportExpires)
                .build();

        reportRepository.save(submittedReport);

        return ResponseEntity.ok().build();
    }

}
