package bg.tu_varna.sit.backend.models.mapper.zone;

import bg.tu_varna.sit.backend.models.dto.zone.SeveritiesOfAllZones;
import bg.tu_varna.sit.backend.models.dto.zone.SeveritiesOfAvailableZones;
import bg.tu_varna.sit.backend.models.dto.zone.ZoneSeverityDTO;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.entity.user.User;
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

    public SeveritiesOfAvailableZones mapToAvailableZonesWithAlertsDTO(User dispatcher)
    {
        List<ZoneSeverityDTO> zoneDTOList = dispatcher.getAvailableZoneIds()
                .stream()
                .map(z -> new ZoneSeverityDTO(z, zoneService.getZoneById(z).getAlert() != null ? zoneService.getZoneById(z).getAlert().getSeverity().getSeverityType() : null) )
                .toList();

        return new SeveritiesOfAvailableZones(zoneDTOList);
    }

    public SeveritiesOfAllZones mapToAllZonesWithAlertsDTO()
    {
        List<ZoneSeverityDTO> zoneDTOList = zoneService.getAllZones()
                .stream()
                .map(z -> new ZoneSeverityDTO(z.getId(), z.getAlert() != null ? z.getAlert().getSeverity().getSeverityType() : null) )
                .toList();

        return new SeveritiesOfAllZones(zoneDTOList);
    }
}
