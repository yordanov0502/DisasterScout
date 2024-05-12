package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.UserStatus;
import bg.tu_varna.sit.backend.models.enums.userstatus.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatusRepository extends JpaRepository<UserStatus,Integer> {
    UserStatus findByStatus(Status status);
}
