package bg.tu_varna.sit.backend.models.dto.zone;

import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

public record ZoneAlertDTO(
        String zoneId,
        SeverityType severityType,
        String message
) {}