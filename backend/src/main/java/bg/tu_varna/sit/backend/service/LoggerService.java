package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.Log;
import bg.tu_varna.sit.backend.repository.LoggerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoggerService {

    private final LoggerRepository loggerRepository;

    public void log(Log log){loggerRepository.save(log);}

}
