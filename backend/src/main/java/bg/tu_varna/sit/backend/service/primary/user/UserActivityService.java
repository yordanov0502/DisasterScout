package bg.tu_varna.sit.backend.service.primary.user;

import bg.tu_varna.sit.backend.models.entity.user.UserActivity;
import bg.tu_varna.sit.backend.models.enums.user.useractivity.Activity;
import bg.tu_varna.sit.backend.service.cache.user.UserActivityCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserActivityService {

    private final UserActivityCacheService userActivityCacheService;

    public UserActivity getUserActivityByActivity(Activity activity) {
        return userActivityCacheService.getUserActivityByActivity(activity);}
}
