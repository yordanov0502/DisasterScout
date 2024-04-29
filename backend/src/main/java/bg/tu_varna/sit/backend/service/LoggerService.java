package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.dto.log.PageLogDTO;
import bg.tu_varna.sit.backend.models.entity.Log;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.log.Level;
import bg.tu_varna.sit.backend.models.mapper.log.LogMapper;
import bg.tu_varna.sit.backend.repository.LoggerRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class LoggerService {

    private final LoggerRepository loggerRepository;
    private final UserService userService;
    private final LogMapper logMapper;

    public void log(Log log){loggerRepository.save(log);}

    public void deleteLogsOlderThan7Days(){
        loggerRepository.deleteLogsOlderThan(DateUtils.addDays(new Date(), -7));
    }

    public PageLogDTO getLogsFromPage(Integer page,String levelName,String username){

        Pageable pageable = PageRequest.of(page,20, Sort.by("createdAt").descending());
        Level level = convertStringToLevel(levelName);
        User user = userService.getUserByUsername(username);

        if(level!=null && user!=null)
        {
            return logMapper.mapToPageLogDTO(loggerRepository.findAllByLevelAndUser(pageable,level,user));
        }
        else if(level!=null)
        {
            return logMapper.mapToPageLogDTO(loggerRepository.findAllByLevel(pageable,level));
        }
        else if(user!=null)
        {
            return logMapper.mapToPageLogDTO(loggerRepository.findAllByUser(pageable,user));
        }
        else
        {
            return logMapper.mapToPageLogDTO(loggerRepository.findAll(pageable));
        }
    }

    private Level convertStringToLevel(String levelName){
        switch (levelName)
        {
            case "INFO" -> {return Level.INFO;}
            case "WARN" -> {return Level.WARN;}
            case "ERROR" -> {return Level.ERROR;}
            default -> {return null;}
        }
    }
}
