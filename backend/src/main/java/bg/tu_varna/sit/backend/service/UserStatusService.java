package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.UserStatus;
import bg.tu_varna.sit.backend.models.enums.userstatus.Status;
import bg.tu_varna.sit.backend.service.cache.UserStatusCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserStatusService {

    private final UserStatusCacheService userStatusCacheService;

    public UserStatus getUserStatusByStatus(Status status) {return userStatusCacheService.getUserStatusByStatus(status);}
}
