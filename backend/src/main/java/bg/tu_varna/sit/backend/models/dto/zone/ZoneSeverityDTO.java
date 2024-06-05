package bg.tu_varna.sit.backend.models.dto.zone;

import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

public record ZoneSeverityDTO(
        String zoneId,
        SeverityType severityType
) {}
