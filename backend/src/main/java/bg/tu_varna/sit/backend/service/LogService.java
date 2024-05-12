package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.log.PageLogDTO;
import bg.tu_varna.sit.backend.models.entity.Log;
import bg.tu_varna.sit.backend.models.entity.LogLevel;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.loglevel.Level;
import bg.tu_varna.sit.backend.models.mapper.log.LogMapper;
import bg.tu_varna.sit.backend.repository.LogRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;
    private final UserService userService;
    private final LogMapper logMapper;
    private final LogLevelService logLevelService;

    public void addLog(Log log){logRepository.save(log);}

    public void deleteLogsOlderThan7Days(){
        logRepository.deleteLogsOlderThan(DateUtils.addDays(new Date(), -7));
    }

    public PageLogDTO getLogsFromPage(Integer page,String levelName,String username){

        Pageable pageable = PageRequest.of(page,20, Sort.by("createdAt").descending());
        LogLevel logLevel = convertStringToLogLevel(levelName);
        User user = userService.getUserByUsername(username);

        if(logLevel!=null && user!=null)
        {
            return logMapper.mapToPageLogDTO(logRepository.findAllByLogLevelAndUser(pageable,logLevel,user));
        }
        else if(logLevel!=null)
        {
            return logMapper.mapToPageLogDTO(logRepository.findAllByLogLevel(pageable,logLevel));
        }
        else if(user!=null)
        {
            return logMapper.mapToPageLogDTO(logRepository.findAllByUser(pageable,user));
        }
        else
        {
            return logMapper.mapToPageLogDTO(logRepository.findAll(pageable));
        }
    }

    private LogLevel convertStringToLogLevel(String levelName){
        switch (levelName)
        {
            case "INFO" -> {return logLevelService.getLogLevelByLevel(Level.INFO);}
            case "WARN" -> {return logLevelService.getLogLevelByLevel(Level.WARN);}
            case "ERROR" -> {return logLevelService.getLogLevelByLevel(Level.ERROR);}
            default -> {return null;}
        }
    }
}
