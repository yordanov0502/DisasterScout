package bg.tu_varna.sit.backend.models.mapper.zone;

import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.service.primary.ZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ZoneMapper {
    private final ZoneService zoneService;

    public List<Zone> mapToListOfZones(List<String> zoneIds)
    {
        return zoneIds
                .stream()
                .map(zoneService::getZoneById)
                .toList();
    }
}
