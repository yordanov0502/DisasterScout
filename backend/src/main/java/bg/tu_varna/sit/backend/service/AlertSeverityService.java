package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.AlertSeverity;
import bg.tu_varna.sit.backend.models.enums.alertseverity.Severity;
import bg.tu_varna.sit.backend.service.cache.AlertSeverityCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertSeverityService {

    private final AlertSeverityCacheService alertSeverityCacheService;

    public AlertSeverity getAlertSeverityBySeverity(Severity severity) {
        return alertSeverityCacheService.getAlertSeverityBySeverity(severity);}
}
