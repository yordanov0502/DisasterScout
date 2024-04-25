package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface LoggerRepository extends JpaRepository<Log, Integer> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Log l WHERE l.createdAt < ?1")
    void deleteLogsOlderThan(Date date);
}
