package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.LogLevel;
import bg.tu_varna.sit.backend.models.enums.loglevel.Level;
import bg.tu_varna.sit.backend.repository.LogLevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogLevelCacheService {
    private final LogLevelRepository logLevelRepository;

    @Cacheable(value = "level", key = "#level", unless = "#result == null")
    public LogLevel getLogLevelByLevel(Level level) {return logLevelRepository.findByLevel(level);}
}
