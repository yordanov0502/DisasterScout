package bg.tu_varna.sit.backend.service.util;

import bg.tu_varna.sit.backend.service.primary.log.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduledTasksService {

    private final LogService logService;

    @Scheduled(cron = "@midnight") //or "0 0 0 * * *"
    private void deleteLogsOlderThan7Days(){
        logService.deleteLogsOlderThan7Days();}
}
