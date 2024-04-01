package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ZoneRepository extends JpaRepository<Zone,String> {
    Zone findZoneById(String id);
    List<Zone> findByAlertIsNull(); //? Gets all zones without alerts
}
