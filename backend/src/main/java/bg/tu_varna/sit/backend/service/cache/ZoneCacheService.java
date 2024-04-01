package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.Alert;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.repository.ZoneRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class ZoneCacheService {

    private final ZoneRepository zoneRepository;

    //? This method is used for both - adding new / updating existing alert of zone.
    //? When used for updating existing alert, actually a new alert is created and saved replacing the old one.
    //? Then the old one is deleted automatically due to orphanRemoval=true configuration in the Zone entity.
    //? This is because when the new alert is saved in place of the old one. The reference of the old alert becomes
    //? unused, because it gets replaced by the reference of the new alert, thus triggering orphanRemoval.
    @Caching(
            put = {
                    @CachePut(value = "zone", key = "#result.id", unless = "#result == null"),
                    @CachePut(value = "zones", key = "#result.id", unless = "#result == null")
            })
    public Zone updateAlertOfZone(ZoneDTO zoneDTO){
        Zone zone = getZoneById(zoneDTO.zoneId());

        Zone updatedZone = zone.toBuilder()
                .alert(Alert.builder()
                        .severity(zoneDTO.alertDTO().severity())
                        .message(zoneDTO.alertDTO().message())
                        .build())
                .build();

        return zoneRepository.save(updatedZone);
    }

    @Caching(
            put = {
                    @CachePut(value = "zone", key = "#result.id", unless = "#result == null"),
                    @CachePut(value = "zones", key = "#result.id", unless = "#result == null")
            })
    public Zone deleteAlertOfZone(String id){
        Zone zone = getZoneById(id);

        Zone updatedZone = zone.toBuilder()
                .alert(null)
                .build();

        return zoneRepository.save(updatedZone);
    }

    @Cacheable(value = "zone", key = "#id", unless = "#result == null")
    public Zone getZoneById(String id) {return zoneRepository.findZoneById(id);}

}
