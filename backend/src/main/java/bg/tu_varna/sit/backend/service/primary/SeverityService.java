package bg.tu_varna.sit.backend.service.primary;

import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;
import bg.tu_varna.sit.backend.service.cache.SeverityCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeverityService {

    private final SeverityCacheService severityCacheService;

    public Severity getSeverityBySeverityType(SeverityType severityType) {
        return severityCacheService.getSeverityBySeverityType(severityType);}
}
