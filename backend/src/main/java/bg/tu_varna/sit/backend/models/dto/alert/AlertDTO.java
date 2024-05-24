package bg.tu_varna.sit.backend.models.dto.alert;

import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;

public record AlertDTO(
        SeverityType severityType,
        String message) {
}
