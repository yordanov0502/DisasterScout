package bg.tu_varna.sit.backend.repository.report;

import bg.tu_varna.sit.backend.models.entity.report.ReportIssue;
import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportIssueRepository extends JpaRepository<ReportIssue,Integer> {
    ReportIssue findByIssue(Issue issue);
}
