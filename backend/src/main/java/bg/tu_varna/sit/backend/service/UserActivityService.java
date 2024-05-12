package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.UserActivity;
import bg.tu_varna.sit.backend.models.enums.useractivity.Activity;
import bg.tu_varna.sit.backend.service.cache.UserActivityCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserActivityService {

    private final UserActivityCacheService userActivityCacheService;

    public UserActivity getUserActivityByActivity(Activity activity) {
        return userActivityCacheService.getUserActivityByActivity(activity);}
}
