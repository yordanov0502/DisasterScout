package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.service.cache.ZoneCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZoneService {

    private final ZoneCacheService zoneCacheService;

    public Zone getZoneById(String id) {return zoneCacheService.getZoneById(id);}

    public Zone updateAlertOfZone(ZoneDTO zoneDTO) {return zoneCacheService.updateAlertOfZone(zoneDTO);}

    public Zone deleteAlertOfZone(String zoneId) {return zoneCacheService.deleteAlertOfZone(zoneId);}

    public List<Zone> getAllZones(){return zoneCacheService.getAllZones();}

    public void clearCacheOfZone(String zoneId){
        zoneCacheService.evictCacheOfAllZones();
        zoneCacheService.evictZoneFromCache(zoneId);
    }

    public void clearAllCachesOfAllZones(){
        zoneCacheService.evictAllCachesOfAllZones();
    }
}
