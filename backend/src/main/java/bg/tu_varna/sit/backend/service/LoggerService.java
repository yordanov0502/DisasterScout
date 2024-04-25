package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.Log;
import bg.tu_varna.sit.backend.repository.LoggerRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class LoggerService {

    private final LoggerRepository loggerRepository;

    public void log(Log log){loggerRepository.save(log);}

    public void deleteLogsOlderThan7Days(){
        loggerRepository.deleteLogsOlderThan(DateUtils.addDays(new Date(), -7));
    }

}
