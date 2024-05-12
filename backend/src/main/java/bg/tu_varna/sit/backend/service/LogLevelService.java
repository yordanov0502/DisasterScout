package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.LogLevel;
import bg.tu_varna.sit.backend.models.enums.loglevel.Level;
import bg.tu_varna.sit.backend.service.cache.LogLevelCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogLevelService {

    private final LogLevelCacheService logLevelCacheService;

    public LogLevel getLogLevelByLevel(Level level) {return logLevelCacheService.getLogLevelByLevel(level);}
}
