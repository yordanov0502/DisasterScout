package bg.tu_varna.sit.backend.service.primary.log;

import bg.tu_varna.sit.backend.models.entity.log.LogAction;
import bg.tu_varna.sit.backend.models.enums.log.logaction.Action;
import bg.tu_varna.sit.backend.service.cache.log.LogActionCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogActionService {

    private final LogActionCacheService logActionCacheService;

    public LogAction getLogActionByAction(Action action) {return logActionCacheService.getLogActionByAction(action);}
}
