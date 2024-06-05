package bg.tu_varna.sit.backend.service.primary;

import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.enums.log.logaction.Action;
import bg.tu_varna.sit.backend.models.event.ZoneEvent;
import bg.tu_varna.sit.backend.service.cache.ZoneCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static bg.tu_varna.sit.backend.models.enums.user.userrole.Role.DISPATCHER;

@Service
@RequiredArgsConstructor
public class ZoneService {

    private final ZoneCacheService zoneCacheService;
    private final ApplicationEventPublisher eventPublisher;

    public Zone getZoneById(String id) {return zoneCacheService.getZoneById(id);}

    //? Only dispatchers have access to this feature, because the admin is restricted by validation on the frontend
    public ResponseEntity<?> updateAlertOfZone(User user, ZoneDTO zoneDTO) {

        if(user.getUserRole().getRole().equals(DISPATCHER))
        {
            if(!user.getAvailableZoneIds().contains(zoneDTO.zoneId())) {return new ResponseEntity<>("Available zones of dispatcher have been changed.", HttpStatus.BAD_REQUEST);} //? DO FULL PAGE RELOAD OF CmsZonesPage.
        }

        Zone updatedZone = zoneCacheService.updateAlertOfZone(zoneDTO);
        eventPublisher.publishEvent(new ZoneEvent(this,user,updatedZone,Action.ZONE_ALERT_SET));
        return ResponseEntity.ok().build();
    }

    //? Only dispatchers have access to this feature, because the admin is restricted by validation on the frontend
    public ResponseEntity<?> deleteAlertOfZone(User user, String zoneId) {

        if(user.getUserRole().getRole().equals(DISPATCHER))
        {
            if(!user.getAvailableZoneIds().contains(zoneId)) {return new ResponseEntity<>("Available zones of dispatcher have been changed.", HttpStatus.BAD_REQUEST);} //? DO FULL PAGE RELOAD OF CmsZonesPage.
        }

        //! Validation for when we try to delete alert of zone, but the zone doesn't have alert
        Zone zone = getZoneById(zoneId);
        if(zone.getAlert() == null) {return new ResponseEntity<>("Zone doesn't have an alert.", HttpStatus.NOT_FOUND);}


        Zone zoneCarryingAlert = zone.toBuilder().build(); //? It is used another zone to carry the old data, because when event is published error is thrown in the entity listener when we try to access data of already deleted alert of zone
        zoneCacheService.deleteAlertOfZone(zone);
        eventPublisher.publishEvent(new ZoneEvent(this,user,zoneCarryingAlert,Action.ZONE_ALERT_REMOVED));
        return ResponseEntity.ok().build();
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
