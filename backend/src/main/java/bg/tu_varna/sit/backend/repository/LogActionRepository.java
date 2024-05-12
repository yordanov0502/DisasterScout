package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.LogAction;
import bg.tu_varna.sit.backend.models.enums.logaction.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogActionRepository extends JpaRepository<LogAction,Integer> {
    LogAction findByAction(Action action);
}
