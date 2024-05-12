package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.UserStatus;
import bg.tu_varna.sit.backend.models.enums.userstatus.Status;
import bg.tu_varna.sit.backend.repository.UserStatusRepository;
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
