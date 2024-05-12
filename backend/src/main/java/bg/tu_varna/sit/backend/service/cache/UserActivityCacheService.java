package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.UserActivity;
import bg.tu_varna.sit.backend.models.enums.useractivity.Activity;
import bg.tu_varna.sit.backend.repository.UserActivityRepository;
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
