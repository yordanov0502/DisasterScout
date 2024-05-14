package bg.tu_varna.sit.backend.repository.user;

import bg.tu_varna.sit.backend.models.entity.user.UserActivity;
import bg.tu_varna.sit.backend.models.enums.user.useractivity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity,Integer> {
    UserActivity findByActivity(Activity activity);
}
