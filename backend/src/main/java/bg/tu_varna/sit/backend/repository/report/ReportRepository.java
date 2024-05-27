package bg.tu_varna.sit.backend.repository.report;

import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.entity.report.Report;
import bg.tu_varna.sit.backend.models.entity.report.ReportIssue;
import bg.tu_varna.sit.backend.models.entity.report.ReportState;
import bg.tu_varna.sit.backend.models.enums.report.reportissue.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report,Integer> {

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.severity = ?3 AND r.reportIssue = ?4")
    Page<Report> findAllByZoneReportStateSeverityReportIssue(Zone zone, ReportState reportState, Severity severity, ReportIssue reportIssue, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.severity = ?3 AND r.reportIssue.category = ?4")
    Page<Report> findAllByZoneReportStateSeverityCategory(Zone zone, ReportState reportState, Severity severity, Category category,Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.severity = ?3")
    Page<Report> findAllByZoneReportStateSeverity(Zone zone, ReportState reportState, Severity severity, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.reportIssue = ?3")
    Page<Report> findAllByZoneReportStateReportIssue(Zone zone, ReportState reportState, ReportIssue reportIssue, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.reportIssue.category = ?3")
    Page<Report> findAllByZoneReportStateCategory(Zone zone, ReportState reportState, Category category, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2")
    Page<Report> findAllByZoneReportState(Zone zone, ReportState reportState, Pageable pageable);

}
