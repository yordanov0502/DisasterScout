package bg.tu_varna.sit.backend.models.dto.report;

import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

public record AcceptReportDTO(
        Issue issue,
        SeverityType severityType,
        Integer expectedDuration,
        String description,
        String zoneId,
        String area,
        String address,
        String locationUrl,
        String firstName,
        String lastName,
        String phoneNumber
)
{}
