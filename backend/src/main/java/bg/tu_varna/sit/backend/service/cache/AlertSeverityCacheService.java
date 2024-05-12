package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.AlertSeverity;
import bg.tu_varna.sit.backend.models.enums.alertseverity.Severity;
import bg.tu_varna.sit.backend.repository.AlertSeverityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertSeverityCacheService {

    private final AlertSeverityRepository alertSeverityRepository;

    @Cacheable(value = "severity", key = "#severity", unless = "#result == null")
    public AlertSeverity getAlertSeverityBySeverity(Severity severity) {return alertSeverityRepository.findBySeverity(severity);}
}
