package bg.tu_varna.sit.backend.service.cache.report;

import bg.tu_varna.sit.backend.models.entity.report.ReportIssue;
import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import bg.tu_varna.sit.backend.repository.report.ReportIssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportIssueCacheService {

    private final ReportIssueRepository reportIssueRepository;

    @Cacheable(value = "issue", key = "#issue", unless = "#result == null")
    public ReportIssue getReportIssueByIssue(Issue issue) {return reportIssueRepository.findByIssue(issue);}
}
