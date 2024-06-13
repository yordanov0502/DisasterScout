package bg.tu_varna.sit.backend.models.dto.report;

import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

import java.util.Date;

public record PublicReportDTO(
        Issue issue,
        SeverityType severityType,
        Date submittedAt,
        Date expiresAt,
        String description,
        String zoneId,
        String area,
        String imageUrl,
        String locationUrl
)
{}