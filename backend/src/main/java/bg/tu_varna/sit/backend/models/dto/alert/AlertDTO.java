package bg.tu_varna.sit.backend.models.dto.alert;

import bg.tu_varna.sit.backend.models.enums.alert.Severity;

//???????????SHOULD THE DTO BE VALIDATED
public record AlertDTO(
        Severity severity,
        String message) {
}
