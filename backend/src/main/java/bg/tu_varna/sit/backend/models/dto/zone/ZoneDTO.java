package bg.tu_varna.sit.backend.models.dto.zone;

import bg.tu_varna.sit.backend.models.dto.alert.AlertDTO;

//???????????SHOULD THE DTO BE VALIDATED
public record ZoneDTO(
        String zoneId,
        AlertDTO alertDTO
) {
}
