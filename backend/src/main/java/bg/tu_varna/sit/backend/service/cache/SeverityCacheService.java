package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;
import bg.tu_varna.sit.backend.repository.SeverityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeverityCacheService {

    private final SeverityRepository severityRepository;

    @Cacheable(value = "severity", key = "#severityType", unless = "#result == null")
    public Severity getSeverityBySeverityType(SeverityType severityType) {return severityRepository.findBySeverityType(severityType);}
}
