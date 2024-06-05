package bg.tu_varna.sit.backend.models.dto.zone;

import bg.tu_varna.sit.backend.models.dto.alert.AlertDTO;

public record ZoneDTO(
        String zoneId,
        AlertDTO alertDTO
) {}
