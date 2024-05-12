package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.LogAction;
import bg.tu_varna.sit.backend.models.enums.logaction.Action;
import bg.tu_varna.sit.backend.service.cache.LogActionCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogActionService {

    private final LogActionCacheService logActionCacheService;

    public LogAction getLogActionByAction(Action action) {return logActionCacheService.getLogActionByAction(action);}
}
