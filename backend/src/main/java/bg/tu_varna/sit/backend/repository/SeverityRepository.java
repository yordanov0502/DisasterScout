package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeverityRepository extends JpaRepository<Severity,Integer> {
    Severity findBySeverityType(SeverityType severityType);
}
