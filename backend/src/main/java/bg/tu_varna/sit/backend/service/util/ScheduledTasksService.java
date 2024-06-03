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

    //? Every day at 00:00 logs older than 7 days are deleted
    @Scheduled(cron = "@midnight") //or "0 0 0 * * *"
    private void deleteLogsOlderThan7Days() {logService.deleteLogsOlderThan7Days();}

    //? Every 5 minutes FRESH reports are checked whether their expiry date & time is less than the current day & time
    //? and if so their state is updated to FOR_REVALUATION
    @Scheduled(cron = "0 */5 * * * *")
    private void updateReportsExpiry() {reportService.updateReportsExpiry();}

    //? Every day at 01:00 reports with state INACTIVE are deleted from the database along with their images from Firebase, if of course they have images
    @Scheduled(cron = "0 0 1 * * *")
    private void deleteInactiveReports() {reportService.deleteInactiveReports();}

}