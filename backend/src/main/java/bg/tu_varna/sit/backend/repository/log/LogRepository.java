package bg.tu_varna.sit.backend.repository.log;

import bg.tu_varna.sit.backend.models.entity.log.Log;
import bg.tu_varna.sit.backend.models.entity.log.LogLevel;
import bg.tu_varna.sit.backend.models.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface LogRepository extends JpaRepository<Log, Integer> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Log l WHERE l.createdAt < ?1")
    void deleteLogsOlderThan(Date date);
    Page<Log> findAllByLogLevelAndUser(Pageable pageable, LogLevel logLevel, User user);
    Page<Log> findAllByLogLevel(Pageable pageable, LogLevel logLevel);
    Page<Log> findAllByUser(Pageable pageable, User user);
    Page<Log> findAll(Pageable pageable);
}
