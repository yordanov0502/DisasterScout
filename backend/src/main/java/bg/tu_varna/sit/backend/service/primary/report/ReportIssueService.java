package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.entity.report.ReportIssue;
import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import bg.tu_varna.sit.backend.service.cache.report.ReportIssueCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportIssueService {

    private final ReportIssueCacheService reportIssueCacheService;

    public ReportIssue getReportIssueByIssue(Issue issue) {
        return reportIssueCacheService.getReportIssueByIssue(issue);}
}
