package bg.tu_varna.sit.backend.service.primary;

import bg.tu_varna.sit.backend.models.dto.alert.AlertDTO;
import bg.tu_varna.sit.backend.models.dto.zone.ZoneDTO;
import bg.tu_varna.sit.backend.models.entity.Alert;
import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.entity.user.User;
import bg.tu_varna.sit.backend.models.entity.user.UserActivity;
import bg.tu_varna.sit.backend.models.entity.user.UserRole;
import bg.tu_varna.sit.backend.models.entity.user.UserStatus;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;
import bg.tu_varna.sit.backend.models.event.ZoneEvent;
import bg.tu_varna.sit.backend.service.cache.ZoneCacheService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static bg.tu_varna.sit.backend.models.enums.user.useractivity.Activity.OFFLINE;
import static bg.tu_varna.sit.backend.models.enums.user.userrole.Role.DISPATCHER;
import static bg.tu_varna.sit.backend.models.enums.user.userstatus.Status.ACTIVE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class ZoneServiceTest {

    private ZoneService zoneService;
    private ZoneCacheService zoneCacheService;
    private ApplicationEventPublisher eventPublisher;
    private SeverityService severityService;
    private User user;
    private ZoneDTO zoneDTO;

    @BeforeEach
    void setUp() {
        zoneCacheService = Mockito.mock(ZoneCacheService.class);
        eventPublisher = Mockito.mock(ApplicationEventPublisher.class);
        severityService = Mockito.mock(SeverityService.class);
        zoneService = new ZoneService(zoneCacheService, eventPublisher);

        user = new User("0242071340","Todor","Yordanov","auth@example.com","currentUsername","ASas2@dsadas12", new UserRole(2,DISPATCHER), new UserStatus(1,ACTIVE), new UserActivity(2,OFFLINE), new Date(),0, List.of(new Zone("st1", "Благоевград", 5, null)));
        zoneDTO = new ZoneDTO("st1", new AlertDTO(SeverityType.HIGH,"Очакват се проливни валежи"));
    }

    @Test
    void getZoneById() {
        Zone expectedZone = new Zone();
        Mockito.when(zoneCacheService.getZoneById("st1")).thenReturn(expectedZone);

        Zone result = zoneService.getZoneById("st1");

        assertEquals(expectedZone, result);
    }

    @Test
    void updateAlertOfZone() {
        Severity mockSeverity = new Severity(2, SeverityType.MEDIUM);
        Mockito.when(severityService.getSeverityBySeverityType(SeverityType.MEDIUM)).thenReturn(mockSeverity);

        Zone updatedZone = new Zone("st1", "Благоевград", 5, new Alert(1, mockSeverity, "Очаква се силен вятър"));
        Mockito.when(zoneCacheService.updateAlertOfZone(any(ZoneDTO.class))).thenReturn(updatedZone);

        ResponseEntity<?> response = zoneService.updateAlertOfZone(user, zoneDTO);

        assertEquals(200, response.getStatusCodeValue());
        Mockito.verify(eventPublisher).publishEvent(any(ZoneEvent.class));
    }

    @Test
    void deleteAlertOfZone() {
        Zone zoneWithoutAlert = new Zone("st1", "Благоевград", 5, null);

        Mockito.when(zoneCacheService.getZoneById("st1")).thenReturn(zoneWithoutAlert);

        ResponseEntity<?> response = zoneService.deleteAlertOfZone(user, "st1");

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void getAlertOfZone() {
        Severity mockSeverity = new Severity(2, SeverityType.MEDIUM);
        Mockito.when(severityService.getSeverityBySeverityType(SeverityType.MEDIUM)).thenReturn(mockSeverity);


        Zone zoneWithAlert = new Zone("st1", "Благоевград", 5, new Alert(1, mockSeverity, "Очаква се силен вятър"));
        Mockito.when(zoneCacheService.getZoneById("st1")).thenReturn(zoneWithAlert);

        ResponseEntity<?> response = zoneService.getAlertOfZone(user, "st1");

        assertEquals(200, response.getStatusCodeValue());
    }
}