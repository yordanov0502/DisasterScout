package bg.tu_varna.sit.backend.service.primary.user;

import bg.tu_varna.sit.backend.models.entity.user.UserStatus;
import bg.tu_varna.sit.backend.models.enums.user.userstatus.Status;
import bg.tu_varna.sit.backend.service.cache.user.UserStatusCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserStatusService {

    private final UserStatusCacheService userStatusCacheService;

    public UserStatus getUserStatusByStatus(Status status) {return userStatusCacheService.getUserStatusByStatus(status);}
}
