package bg.tu_varna.sit.backend.service.util;

import bg.tu_varna.sit.backend.service.primary.log.LogService;
import bg.tu_varna.sit.backend.service.primary.report.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduledTasksService {

    private final LogService logService;
    private final ReportService reportService;

    @Scheduled(cron = "@midnight") //or "0 0 0 * * *"
    private void deleteLogsOlderThan7Days() {logService.deleteLogsOlderThan7Days();}

    @Scheduled(cron = "0 */5 * * * *")
    private void updateReportsExpiry() {reportService.updateReportsExpiry();}
}
