package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggerRepository extends JpaRepository<Log, Integer> {
}
