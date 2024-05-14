package bg.tu_varna.sit.backend.service.cache.user;

import bg.tu_varna.sit.backend.models.entity.user.UserActivity;
import bg.tu_varna.sit.backend.models.enums.user.useractivity.Activity;
import bg.tu_varna.sit.backend.repository.user.UserActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserActivityCacheService {

    private final UserActivityRepository userActivityRepository;

    @Cacheable(value = "activity", key = "#activity", unless = "#result == null")
    public UserActivity getUserActivityByActivity(Activity activity) {return userActivityRepository.findByActivity(activity);}
}
