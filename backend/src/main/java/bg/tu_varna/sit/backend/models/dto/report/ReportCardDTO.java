package bg.tu_varna.sit.backend.models.dto.report;

import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

import java.util.Date;

public record ReportCardDTO(Integer id, Issue issue, String imageUrl, SeverityType severityType, Date submittedAt, Date expiresAt, String address, String description) {}
