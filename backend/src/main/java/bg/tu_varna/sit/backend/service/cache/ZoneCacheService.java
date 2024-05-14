package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.Alert;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.repository.ZoneRepository;
import bg.tu_varna.sit.backend.service.SeverityService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;

//TODO: TEST HOW CACHE BEHAVES WHEN DEALING WITH ZONES
@Service
@RequiredArgsConstructor
public class ZoneCacheService {

    private final ZoneRepository zoneRepository;
    private final SeverityService severityService;
    //private final CacheManager cacheManager;

    //? This method is used for both - adding new / updating existing alert of zone.
    //? When used for updating existing alert, actually a new alert is created and saved replacing the old one.
    //? Then the old one is deleted automatically due to orphanRemoval=true configuration in the Zone entity.
    //? This is because when the new alert is saved in place of the old one. The reference of the old alert becomes
    //? unused, because it gets replaced by the reference of the new alert, thus triggering orphanRemoval.
    @Caching(
            evict = {@CacheEvict(value = "zones", allEntries = true, beforeInvocation = true)},
            put = {@CachePut(value = "zone", key = "#result.id", unless = "#result == null")}
    )
    public Zone updateAlertOfZone(ZoneDTO zoneDTO){
        Zone zone = getZoneById(zoneDTO.zoneId());

        Zone updatedZone = zone.toBuilder()
                .alert(Alert.builder()
                        .severity(severityService.getSeverityBySeverityType(zoneDTO.alertDTO().severityType()))
                        .message(zoneDTO.alertDTO().message())
                        .build())
                .build();

        return zoneRepository.save(updatedZone);
    }

    @Caching(
            evict = {@CacheEvict(value = "zones", allEntries = true, beforeInvocation = true)},
            put = {@CachePut(value = "zone", key = "#result.id", unless = "#result == null")}
    )
    public Zone deleteAlertOfZone(Zone zone){
        Zone updatedZone = zone.toBuilder()
                .alert(null)
                .build();

        return zoneRepository.save(updatedZone);
    }

    @Cacheable(value = "zone", key = "#id", unless = "#result == null")
    public Zone getZoneById(String id) {return zoneRepository.findZoneById(id);}

    @Cacheable(value = "zones", key = "'allZones'", unless = "#result == null or #result.isEmpty()")
    public List<Zone> getAllZones(){return zoneRepository.findAll();}

    @Caching(evict = {
            @CacheEvict(value = "zone", key = "#id", beforeInvocation = true)
    })
    public void evictZoneFromCache(String id){}

    @Caching(evict = {
            @CacheEvict(value = "zones", allEntries = true, beforeInvocation = true)
    })
    public void evictCacheOfAllZones(){}

    @Caching(evict = {
            @CacheEvict(value = "zones", allEntries = true, beforeInvocation = true),
            @CacheEvict(value = "zone", allEntries = true, beforeInvocation = true)
    })
    public void evictAllCachesOfAllZones(){}

//    @PostConstruct
//    public void printCacheContentZONE_ID() {
//
//        Cache<Object, Object> caffeineCache1 = (Cache<Object, Object>) cacheManager.getCache("zone").getNativeCache();
//
//        System.out.println("********zone-ID*********");
//        caffeineCache1.asMap().forEach((key, value) -> {
//            System.out.println("Key: " + key + ", Value: " + value);
//        });
//        System.out.println("*****************");
//
//        Cache<Object, Object> caffeineCache2 = (Cache<Object, Object>) cacheManager.getCache("zones").getNativeCache();
//
//        System.out.println("-------------zones----------------");
//        caffeineCache2.asMap().forEach((key, value) -> {
//            System.out.println("Key: " + key + ", Value: " + value);
//        });
//        System.out.println("------------------------------------");
//    }
}
