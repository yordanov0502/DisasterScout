package bg.tu_varna.sit.backend.service.util;

import bg.tu_varna.sit.backend.service.LoggerService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduledTasksService {

    private final LoggerService loggerService;

    @Scheduled(cron = "@midnight") //or "0 0 0 * * *"
    private void deleteLogsOlderThan7Days(){loggerService.deleteLogsOlderThan7Days();}
}
