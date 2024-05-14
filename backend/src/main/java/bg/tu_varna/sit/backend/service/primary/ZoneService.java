package bg.tu_varna.sit.backend.service.primary;

import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.enums.log.logaction.Action;
import bg.tu_varna.sit.backend.models.event.ZoneEvent;
import bg.tu_varna.sit.backend.service.cache.ZoneCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZoneService {

    private final ZoneCacheService zoneCacheService;
    private final ApplicationEventPublisher eventPublisher;

    public Zone getZoneById(String id) {return zoneCacheService.getZoneById(id);}

    public void updateAlertOfZone(User user, ZoneDTO zoneDTO) {
        Zone updatedZone = zoneCacheService.updateAlertOfZone(zoneDTO);
        eventPublisher.publishEvent(new ZoneEvent(this,user,updatedZone,Action.ZONE_ALERT_SET));
    }

    public void deleteAlertOfZone(User user, String zoneId) {
        Zone zoneBeforeAlertRemoval = getZoneById(zoneId);
        if(zoneBeforeAlertRemoval.getAlert() == null) {return;} //? Safe check to prevent unintentional NullPointerException while trying to delete alert of zone, while the zone does NOT have any alert.
        zoneCacheService.deleteAlertOfZone(zoneBeforeAlertRemoval);
        eventPublisher.publishEvent(new ZoneEvent(this,user,zoneBeforeAlertRemoval,Action.ZONE_ALERT_REMOVED));
    }

    public List<Zone> getAllZones(){return zoneCacheService.getAllZones();}

    public void clearCacheOfZone(String zoneId){
        zoneCacheService.evictCacheOfAllZones();
        zoneCacheService.evictZoneFromCache(zoneId);
    }

    public void clearAllCachesOfAllZones(){
        zoneCacheService.evictAllCachesOfAllZones();
    }
}
