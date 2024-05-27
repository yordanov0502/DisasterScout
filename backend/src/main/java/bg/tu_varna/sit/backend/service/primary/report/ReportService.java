package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.dto.report.PageReportCardDTO;
import bg.tu_varna.sit.backend.models.dto.report.SubmitReportDTO;
import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.entity.report.Report;
import bg.tu_varna.sit.backend.models.entity.report.ReportIssue;
import bg.tu_varna.sit.backend.models.entity.report.ReportState;
import bg.tu_varna.sit.backend.models.enums.report.reportissue.Category;
import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;
import bg.tu_varna.sit.backend.models.mapper.report.ReportMapper;
import bg.tu_varna.sit.backend.repository.report.ReportRepository;
import bg.tu_varna.sit.backend.service.primary.SeverityService;
import bg.tu_varna.sit.backend.service.primary.ZoneService;
import bg.tu_varna.sit.backend.service.util.TimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

import static bg.tu_varna.sit.backend.models.enums.report.reportstate.State.*;

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
    private final ReportMapper reportMapper;

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

    public PageReportCardDTO getReportsFromPage(Integer page, State state, String severityTypeValue, String zoneId, String categoryValue, String issueValue){

        Pageable pageable = PageRequest.of(page,15, Sort.by("submittedAt").ascending());

        //* state will be always available
        ReportState reportState = reportStateService.getReportStateByState(state);

        //? severityTypeValue will always be available, but if it is "All" the severityType will be null,
        //? THUS not searching for a concrete severityType, but all of them
        SeverityType severityType = convertStringToSeverityType(severityTypeValue);
        Severity severity;

        //* zoneId will always be available {when dispatcher has no available zones, the request will not reach the server because of proper validation on the frontend}
        Zone zone = zoneService.getZoneById(zoneId);

        //? category  will always be available, but if it is "All" the category will be null,
        //? THUS not searching for a concrete category, but all of them
        Category category = convertStringToCategory(categoryValue);

        //? issue  will always be available, but if it is "All" the issue will be null,
        //? THUS not searching for a concrete issue, but all of them
        Issue issue = convertStringToIssue(issueValue);

        ReportIssue reportIssue; //? initialized only when both category and issue are not null (meaning they are not "All", but have concrete values)


        if(severityType!=null && category!=null && issue!=null)
        {
            severity = severityService.getSeverityBySeverityType(severityType);
            reportIssue = reportIssueService.getReportIssueByIssue(issue);
            return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateSeverityReportIssue(zone,reportState,severity,reportIssue,pageable));
        }
        else if(severityType!=null && category!=null)
        {
            severity = severityService.getSeverityBySeverityType(severityType);
            return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateSeverityCategory(zone,reportState,severity,category,pageable));
        }
        else if(severityType!=null)
        {
            severity = severityService.getSeverityBySeverityType(severityType);
            return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateSeverity(zone,reportState,severity,pageable));
        }
        else if(category!=null && issue!=null)
        {
            reportIssue = reportIssueService.getReportIssueByIssue(issue);
            return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateReportIssue(zone,reportState,reportIssue,pageable));
        }
        else if(category!=null)
        {
            return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateCategory(zone,reportState,category,pageable));
        }
        else
        {
            return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportState(zone,reportState,pageable));
        }
    }

    private SeverityType convertStringToSeverityType(String severityTypeValue){
        try
        {
            return SeverityType.valueOf(severityTypeValue);
        }
        catch (Exception ignoredException)
        {
            return null; //? severityTypeValue is "ALL"
        }
    }

    private Category convertStringToCategory(String categoryValue){
        try
        {
            return Category.valueOf(categoryValue);
        }
        catch (Exception ignoredException)
        {
            return null; //? categoryValue is "ALL"
        }
    }

    private Issue convertStringToIssue(String issueValue){
        try
        {
            return Issue.valueOf(issueValue);
        }
        catch (Exception ignoredException)
        {
            return null; //? issueValue is "ALL"
        }
    }




}
