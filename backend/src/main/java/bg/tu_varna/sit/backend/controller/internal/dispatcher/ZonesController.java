package bg.tu_varna.sit.backend.controller.internal.dispatcher;

import bg.tu_varna.sit.backend.models.dto.zone.ZoneIdDTO;
import bg.tu_varna.sit.backend.models.dto.zone.SeveritiesOfAvailableZones;
import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.mapper.zone.ZoneMapper;
import bg.tu_varna.sit.backend.service.primary.ZoneService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher/zones")
public class ZonesController {

    private final ZoneMapper zoneMapper;
    private final ZoneService zoneService;

    @Operation(summary = "Get severities of alerts(if any exist) of dispatcher's available zones.",
            description = "This endpoint returns dispatcher's available zones along with their alerts'(if any exist) severities. This helps in coloring the Bulgarian map in the CmsZonesPage")
    @GetMapping("/alerts-severities")
    public SeveritiesOfAvailableZones getSeveritiesOfAvailableZones(@AuthenticationPrincipal User user){
        return zoneMapper.mapToAvailableZonesWithAlertsDTO(user);
    }

    @Operation(summary = "Add alert for zone",
            description = "When this endpoint is called, a new alert is created with the given data and is added to specific zone.(if the zone had an alert previously, it is replaced with the new one, and the old one is deleted)")
    @PostMapping("/publish-alert")
    public ResponseEntity<?> publishAlertForZone(@AuthenticationPrincipal User user ,@RequestBody ZoneDTO zoneDTO){
        return zoneService.updateAlertOfZone(user, zoneDTO);
    }

    @Operation(summary = "Delete alert of zone",
            description = "When this endpoint is called, the existing alert of zone is deleted.")
    @PutMapping("/delete-alert")
    public ResponseEntity<?> deleteAlertOfZone(@AuthenticationPrincipal User user, @RequestBody ZoneIdDTO zoneIdDTO){
        return zoneService.deleteAlertOfZone(user, zoneIdDTO.zoneId());
    }

    @Operation(summary = "Get alert of zone",
            description = "When this endpoint is called, the information of alert related to the specific zone is returned.")
    @GetMapping("/alert")
    public ResponseEntity<?> getAlertOfZone(@RequestParam(value = "zoneId") String zoneId, @AuthenticationPrincipal User user){
        return zoneService.getAlertOfZone(user, zoneId);
    }

}
