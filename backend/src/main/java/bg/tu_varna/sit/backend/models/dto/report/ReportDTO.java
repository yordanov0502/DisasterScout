package bg.tu_varna.sit.backend.models.dto.report;

import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

import java.util.Date;

public record ReportDTO(
        Issue issue,
        SeverityType severityType,
        State state,
        Integer expectedDuration, //? hours (expiresAt - submittedAt)
        Date submittedAt,
        Date expiresAt,
        String description,
        String zoneId,
        String area,
        String address,
        String imageUrl,
        String locationUrl,
        String firstName,
        String lastName,
        String phoneNumber,
        String userNames //? first name and last name of dispatcher/admin who last processed the report
) {
}
