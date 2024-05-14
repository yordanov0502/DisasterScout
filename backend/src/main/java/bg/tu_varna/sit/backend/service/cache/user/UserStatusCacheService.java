package bg.tu_varna.sit.backend.service.cache.user;

import bg.tu_varna.sit.backend.models.entity.user.UserStatus;
import bg.tu_varna.sit.backend.models.enums.user.userstatus.Status;
import bg.tu_varna.sit.backend.repository.user.UserStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserStatusCacheService {

    private final UserStatusRepository userStatusRepository;

    @Cacheable(value = "status", key = "#status", unless = "#result == null")
    public UserStatus getUserStatusByStatus(Status status) {return userStatusRepository.findByStatus(status);}
}
