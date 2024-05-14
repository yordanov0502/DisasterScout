package bg.tu_varna.sit.backend.repository.log;

import bg.tu_varna.sit.backend.models.entity.log.LogAction;
import bg.tu_varna.sit.backend.models.enums.log.logaction.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogActionRepository extends JpaRepository<LogAction,Integer> {
    LogAction findByAction(Action action);
}
