package bg.tu_varna.sit.backend.service.primary.log;

import bg.tu_varna.sit.backend.models.entity.log.LogLevel;
import bg.tu_varna.sit.backend.models.enums.log.loglevel.Level;
import bg.tu_varna.sit.backend.service.cache.log.LogLevelCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogLevelService {

    private final LogLevelCacheService logLevelCacheService;

    public LogLevel getLogLevelByLevel(Level level) {return logLevelCacheService.getLogLevelByLevel(level);}
}
