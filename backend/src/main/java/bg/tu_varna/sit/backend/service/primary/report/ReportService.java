package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.dto.report.AcceptReportDTO;
import bg.tu_varna.sit.backend.models.dto.report.PageReportCardDTO;
import bg.tu_varna.sit.backend.models.dto.report.ReportDTO;
import bg.tu_varna.sit.backend.models.dto.report.SubmitReportDTO;
import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.entity.report.Report;
import bg.tu_varna.sit.backend.models.entity.report.ReportIssue;
import bg.tu_varna.sit.backend.models.entity.report.ReportState;
import bg.tu_varna.sit.backend.models.entity.user.User;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

import static bg.tu_varna.sit.backend.models.enums.report.reportstate.State.*;
import static bg.tu_varna.sit.backend.models.enums.user.userrole.Role.DISPATCHER;

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
        String area = submitReportDTO.area();
        String address = !submitReportDTO.address().isBlank() ? submitReportDTO.address() : null;
        String fullAddress;
        if(address != null)
        {
            fullAddress = String.format("%s~%s~%s", zoneName,area,address);
        }
        else
        {
            fullAddress = String.format("%s~%s", zoneName,area);
        }

        Date timeOfReportSubmission = new Date();
        //? if expectedDuration is -1, it means "не знам" option was chosen from frontend which sets +24 hours
        //? in all other cases sets the expectedDuration

        Date whenReportExpires = submitReportDTO.expectedDuration() == -1 ? null : timeService.addHoursToDateAndTime(timeOfReportSubmission,submitReportDTO.expectedDuration());

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

    public PageReportCardDTO getReportsFromPage(Integer page, State state, String severityTypeValue, String zoneId, String area, String categoryValue, String issueValue){

        Pageable pageable = PageRequest.of(page,15, Sort.by("submittedAt").ascending());

        //* state will be always available
        ReportState reportState = reportStateService.getReportStateByState(state);

        //? severityTypeValue will always be available, but if it is "All" the severityType will be null,
        //? THUS not searching for a concrete severityType, but all of them
        SeverityType severityType = convertStringToSeverityType(severityTypeValue);
        Severity severity;

        //* zoneId will always be available {when dispatcher has no available zones, the request will not reach the server because of proper validation on the frontend}
        Zone zone = zoneService.getZoneById(zoneId);

        //* area will always be available ("Всички" by default)
        String partialAddress = area.equals("Всички") ? null : String.format("обл.%s~%s", zone.getName(),area);

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
            if(partialAddress != null) {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneAreaReportStateSeverityReportIssue(zone,partialAddress,reportState,severity,reportIssue,pageable));}
            else {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateSeverityReportIssue(zone,reportState,severity,reportIssue,pageable));}
        }
        else if(severityType!=null && category!=null)
        {
            severity = severityService.getSeverityBySeverityType(severityType);
            if(partialAddress != null) {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneAreaReportStateSeverityCategory(zone,partialAddress,reportState,severity,category,pageable));}
            else {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateSeverityCategory(zone,reportState,severity,category,pageable));}
        }
        else if(severityType!=null)
        {
            severity = severityService.getSeverityBySeverityType(severityType);
            if(partialAddress != null) {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneAreaReportStateSeverity(zone,partialAddress,reportState,severity,pageable));}
            else {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateSeverity(zone,reportState,severity,pageable));}
        }
        else if(category!=null && issue!=null)
        {
            reportIssue = reportIssueService.getReportIssueByIssue(issue);
            if(partialAddress != null) {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneAreaReportStateReportIssue(zone,partialAddress,reportState,reportIssue,pageable));}
            else {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateReportIssue(zone,reportState,reportIssue,pageable));}
        }
        else if(category!=null)
        {
            if(partialAddress != null) {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneAreaReportStateCategory(zone,partialAddress,reportState,category,pageable));}
            else {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportStateCategory(zone,reportState,category,pageable));}
        }
        else
        {
            if(partialAddress != null) {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneAreaReportState(zone,partialAddress,reportState,pageable));}
            else {return reportMapper.mapToPageReportCardDTO(reportRepository.findAllByZoneReportState(zone,reportState,pageable));}
        }
    }

    public ResponseEntity<?> getReportInformation(Integer reportId, State state, String severityTypeValue, String zoneId, String area, String categoryValue, String issueValue, User user){

        //? Validation whether the report exists or not.
        Optional<Report> report = reportRepository.findById(reportId);
        if(report.isEmpty()) {return new ResponseEntity<>("Report doesn't exist.", HttpStatus.NOT_FOUND);}


        //?--------Validation whether the searchParams from frontend match with their related fields from the report
        //* state will be always available
        if(!report.get().getReportState().getState().equals(state)) {return new ResponseEntity<>("Report info mismatch.[state]", HttpStatus.BAD_REQUEST);}

        //? severityTypeValue will always be available, but if it is "All" the severityType will be null,
        SeverityType severityType = convertStringToSeverityType(severityTypeValue);
        if(severityType != null)
        {
            if(!report.get().getSeverity().getSeverityType().equals(severityType)) {return new ResponseEntity<>("Report info mismatch.[severityType]", HttpStatus.BAD_REQUEST);}
        }

        //* zoneId will always be available {when dispatcher has no available zones, the request will not reach the server because of proper validation on the frontend}
        if(!report.get().getZone().getId().equals(zoneId)) {return new ResponseEntity<>("Report info mismatch.[zoneId]", HttpStatus.BAD_REQUEST);}

        //* area will always be available ("Всички" by default)
        Zone zone = zoneService.getZoneById(zoneId);
        String partialAddress = area.equals("Всички") ? null : String.format("обл.%s~%s", zone.getName(),area);
        if(partialAddress != null)
        {
            if(!report.get().getAddress().contains(partialAddress)) {return new ResponseEntity<>("Report info mismatch.[area]", HttpStatus.BAD_REQUEST);}
        }

        //? category  will always be available, but if it is "All" the category will be null,
        Category category = convertStringToCategory(categoryValue);
        if(category != null)
        {
            if(!report.get().getReportIssue().getCategory().equals(category)) {return new ResponseEntity<>("Report info mismatch.[category]", HttpStatus.BAD_REQUEST);}
        }

        //? issue  will always be available, but if it is "All" the issue will be null,
        Issue issue = convertStringToIssue(issueValue);
        if(issue != null)
        {
            if(!report.get().getReportIssue().getIssue().equals(issue)) {return new ResponseEntity<>("Report info mismatch.[issue]", HttpStatus.BAD_REQUEST);}
        }
        //?---------

        //?validation for user zones and report's zone match BUT ONLY FOR DISPATCHER as ADMIN doesn't have any zones at all.
        if(user.getUserRole().getRole().equals(DISPATCHER))
        {
            if(!user.getAvailableZoneIds().contains(zoneId)) {return new ResponseEntity<>("Available zones of dispatcher have been changed.", HttpStatus.BAD_REQUEST);} //!DO FULL PAGE RELOAD OF CmsReportsPage.
        }

        String userNames = report.get().getUser() == null ? "" : report.get().getUser().getFirstName()+" "+report.get().getUser().getLastName();
        String imageUrl = report.get().getImageUrl() == null ? "" : report.get().getImageUrl();


        return new ResponseEntity<>(
                new ReportDTO(
                        report.get().getReportIssue().getIssue(),
                        report.get().getSeverity().getSeverityType(),
                        report.get().getReportState().getState(),
                        getExpectedDuration(report.get().getExpiresAt(),report.get().getSubmittedAt()),
                        report.get().getSubmittedAt(),
                        report.get().getExpiresAt(),
                        report.get().getDescription(),
                        report.get().getZone().getId(),
                        getAreaFromAddress(report.get().getAddress()),
                        getAddressFromFullAddress(report.get().getAddress()),
                        imageUrl,
                        report.get().getLocationUrl(),
                        report.get().getReporter().getFirstName(),
                        report.get().getReporter().getLastName(),
                        report.get().getReporter().getPhoneNumber(),
                        userNames
                )
                ,HttpStatus.OK);
    }





    public ResponseEntity<String> acceptReport(Integer reportId, State state, String severityTypeValue, String zoneId, String area, String categoryValue, String issueValue, User user, AcceptReportDTO acceptReportDTO){

        //? Validation whether the report exists or not.
        Optional<Report> report = reportRepository.findById(reportId);
        if(report.isEmpty()) {return new ResponseEntity<>("Report doesn't exist.", HttpStatus.NOT_FOUND);}


        //?--------Validation whether the searchParams from frontend match with their related fields from the report
        //* state will be always available
        if(!report.get().getReportState().getState().equals(state)) {return new ResponseEntity<>("Report info mismatch.[state]", HttpStatus.BAD_REQUEST);}

        //? severityTypeValue will always be available, but if it is "All" the severityType will be null,
        SeverityType severityType = convertStringToSeverityType(severityTypeValue);
        if(severityType != null)
        {
            if(!report.get().getSeverity().getSeverityType().equals(severityType)) {return new ResponseEntity<>("Report info mismatch.[severityType]", HttpStatus.BAD_REQUEST);}
        }

        //* zoneId will always be available {when dispatcher has no available zones, the request will not reach the server because of proper validation on the frontend}
        if(!report.get().getZone().getId().equals(zoneId)) {return new ResponseEntity<>("Report info mismatch.[zoneId]", HttpStatus.BAD_REQUEST);}

        //* area will always be available ("Всички" by default)
        Zone zone = zoneService.getZoneById(zoneId);
        String partialAddress = area.equals("Всички") ? null : String.format("обл.%s~%s", zone.getName(),area);
        if(partialAddress != null)
        {
            if(!report.get().getAddress().contains(partialAddress)) {return new ResponseEntity<>("Report info mismatch.[area]", HttpStatus.BAD_REQUEST);}
        }

        //? category  will always be available, but if it is "All" the category will be null,
        Category category = convertStringToCategory(categoryValue);
        if(category != null)
        {
            if(!report.get().getReportIssue().getCategory().equals(category)) {return new ResponseEntity<>("Report info mismatch.[category]", HttpStatus.BAD_REQUEST);}
        }

        //? issue  will always be available, but if it is "All" the issue will be null,
        Issue issue = convertStringToIssue(issueValue);
        if(issue != null)
        {
            if(!report.get().getReportIssue().getIssue().equals(issue)) {return new ResponseEntity<>("Report info mismatch.[issue]", HttpStatus.BAD_REQUEST);}
        }
        //?---------

        //?validation for user zones and report's zone match BUT ONLY FOR DISPATCHER as ADMIN doesn't have any zones at all.
        if(user.getUserRole().getRole().equals(DISPATCHER))
        {
            if(!user.getAvailableZoneIds().contains(zoneId)) {return new ResponseEntity<>("Available zones of dispatcher have been changed.", HttpStatus.BAD_REQUEST);} //? DO FULL PAGE RELOAD OF CmsReportsPage.
        }




        //? all required for validation fields of acceptReportDTO are validated on the frontEnd
        Date whenReportExpires = timeService.addHoursToDateAndTime(report.get().getSubmittedAt(),acceptReportDTO.expectedDuration());

        Zone selectedZone = zoneService.getZoneById(acceptReportDTO.zoneId());
        String zoneName = String.format("обл.%s", selectedZone.getName());
        String selectedArea = acceptReportDTO.area();
        String address = !acceptReportDTO.address().isBlank() ? acceptReportDTO.address() : null;
        String fullAddress;
        if(address != null)
        {
            fullAddress = String.format("%s~%s~%s", zoneName,selectedArea,address);
        }
        else
        {
            fullAddress = String.format("%s~%s", zoneName,selectedArea);
        }

        Report acceptedReport = report.get().toBuilder()
                .reportState(reportStateService.getReportStateByState(FRESH)) //! report state is set to FRESH
                .reportIssue(reportIssueService.getReportIssueByIssue(acceptReportDTO.issue()))
                .severity(severityService.getSeverityBySeverityType(acceptReportDTO.severityType()))
                .expiresAt(whenReportExpires)
                .description(acceptReportDTO.description())
                .zone(selectedZone)
                .address(fullAddress)
                .locationUrl(acceptReportDTO.locationUrl())
                .reporter(reporterService.getReporter(acceptReportDTO.firstName(), acceptReportDTO.lastName(), acceptReportDTO.phoneNumber())) //! If a reporter exists it is returned, otherwise it is created in the method from the ReporterService and is again returned
                .user(user) //! set user who accepted the report
                .build();

        reportRepository.save(acceptedReport);

        return new ResponseEntity<>("Report has been accepted successfully.", HttpStatus.OK);
    }






    //TODO: for all methods about to be written here, to be made validations inside the methods themselves
    //TODO: whether the status or whatever is going to change is actually the one from the frontend, because
    //TODO: FOR EXAMPLE THERE COULD BE SITUATION WHERE MORE THAN 1 PERSON HAS ACCESS TO A REPORT
    //TODO: and while one person sees the page of report where it is pending, the other person might actually
    //TODO: made the same report fresh already  and when the first person clicks to button to update the report
    //TODO: normally he will update the report with the same FRESH state which is not right.
    //TODO: INSTEAD IT IS BETTER TO SHOW SNACKBAR WITH ERROR MESSAGE AND REFETCH THE ERROR INFORMATION
    //TODO: SO IT IS DISPLAYED WITH THE MOST RECENT INFORMATION BECAUSE THE POSSIBLE OPERATIONS(BUTTONS FOR CLICKS)
    //TODO: WILL ALSO BE DIFFERENT BASED ON THE REPORT INFORMATION.

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

    //? returns hours
    private int getExpectedDuration(Date expiresAt, Date submittedAt){
        if(expiresAt == null) {return -1;}

        final int MILLI_TO_HOUR = 1000 * 60 * 60;
        return (int) ((expiresAt.getTime() - submittedAt.getTime()) / MILLI_TO_HOUR);
    }

    private String getAreaFromAddress(String fullAddress) {
        int firstIndex = fullAddress.indexOf('~');
        int secondIndex = fullAddress.indexOf('~', firstIndex + 1);

        if (secondIndex == -1)
        {
            //? Only one ~ found, return the substring after the first ~
            return fullAddress.substring(firstIndex + 1);
        }
        else
        {
            //? Two or more ~ found, return the substring between the first and second ~
            return fullAddress.substring(firstIndex + 1, secondIndex);
        }
    }

    private String getAddressFromFullAddress(String fullAddress) {
        int firstIndex = fullAddress.indexOf('~');
        int secondIndex = fullAddress.indexOf('~', firstIndex + 1);

        if (secondIndex == -1) {
            //? Second ~ not found, return empty string
            return "";
        } else {
            //? Two or more ~ found, return the substring after the second ~
            return fullAddress.substring(secondIndex + 1);
        }
    }



}
