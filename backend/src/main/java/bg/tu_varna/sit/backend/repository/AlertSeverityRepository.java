package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.AlertSeverity;
import bg.tu_varna.sit.backend.models.enums.alertseverity.Severity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertSeverityRepository extends JpaRepository<AlertSeverity,Integer> {
    AlertSeverity findBySeverity(Severity severity);
}
