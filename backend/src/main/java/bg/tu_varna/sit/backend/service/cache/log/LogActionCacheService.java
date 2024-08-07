package bg.tu_varna.sit.backend.service.cache.log;

import bg.tu_varna.sit.backend.models.entity.log.LogAction;
import bg.tu_varna.sit.backend.models.enums.log.logaction.Action;
import bg.tu_varna.sit.backend.repository.log.LogActionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogActionCacheService {

    private final LogActionRepository logActionRepository;

    @Cacheable(value = "action", key = "#action", unless = "#result == null")
    public LogAction getLogActionByAction(Action action) {return logActionRepository.findByAction(action);}
}
