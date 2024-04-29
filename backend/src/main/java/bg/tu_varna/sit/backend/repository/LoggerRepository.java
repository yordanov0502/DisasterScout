package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.Log;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.log.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    Page<Log> findAllByLevelAndUser(Pageable pageable, Level level, User user);
    Page<Log> findAllByLevel(Pageable pageable, Level level);
    Page<Log> findAllByUser(Pageable pageable, User user);
    Page<Log> findAll(Pageable pageable);
}
