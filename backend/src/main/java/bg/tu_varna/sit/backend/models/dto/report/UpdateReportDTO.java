package bg.tu_varna.sit.backend.models.dto.report;

import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

public record UpdateReportDTO(
        SeverityType severityType,
        Integer expectedDuration, //? hours
        String description,
        String zoneId,
        String area,
        String address,
        String locationUrl)
{

}