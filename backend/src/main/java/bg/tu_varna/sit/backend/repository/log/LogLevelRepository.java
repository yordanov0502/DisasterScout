package bg.tu_varna.sit.backend.repository.log;

import bg.tu_varna.sit.backend.models.entity.log.LogLevel;
import bg.tu_varna.sit.backend.models.enums.log.loglevel.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogLevelRepository extends JpaRepository<LogLevel,Integer> {
    LogLevel findByLevel(Level level);
}