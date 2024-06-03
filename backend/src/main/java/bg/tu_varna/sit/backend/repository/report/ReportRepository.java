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
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface ReportRepository extends JpaRepository<Report,Integer> {

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.address LIKE CONCAT(?2,'%') AND r.reportState = ?3 AND r.severity = ?4 AND r.reportIssue = ?5")
    Page<Report> findAllByZoneAreaReportStateSeverityReportIssue(Zone zone, String partialAddress, ReportState reportState, Severity severity, ReportIssue reportIssue, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.severity = ?3 AND r.reportIssue = ?4")
    Page<Report> findAllByZoneReportStateSeverityReportIssue(Zone zone, ReportState reportState, Severity severity, ReportIssue reportIssue, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.address LIKE CONCAT(?2,'%') AND r.reportState = ?3 AND r.severity = ?4 AND r.reportIssue.category = ?5")
    Page<Report> findAllByZoneAreaReportStateSeverityCategory(Zone zone, String partialAddress, ReportState reportState, Severity severity, Category category,Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.severity = ?3 AND r.reportIssue.category = ?4")
    Page<Report> findAllByZoneReportStateSeverityCategory(Zone zone, ReportState reportState, Severity severity, Category category,Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.address LIKE CONCAT(?2,'%') AND r.reportState = ?3 AND r.severity = ?4")
    Page<Report> findAllByZoneAreaReportStateSeverity(Zone zone, String partialAddress, ReportState reportState, Severity severity, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.severity = ?3")
    Page<Report> findAllByZoneReportStateSeverity(Zone zone, ReportState reportState, Severity severity, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.address LIKE CONCAT(?2,'%') AND r.reportState = ?3 AND r.reportIssue = ?4")
    Page<Report> findAllByZoneAreaReportStateReportIssue(Zone zone, String partialAddress, ReportState reportState, ReportIssue reportIssue, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.reportIssue = ?3")
    Page<Report> findAllByZoneReportStateReportIssue(Zone zone, ReportState reportState, ReportIssue reportIssue, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.address LIKE CONCAT(?2,'%') AND r.reportState = ?3 AND r.reportIssue.category = ?4")
    Page<Report> findAllByZoneAreaReportStateCategory(Zone zone, String partialAddress, ReportState reportState, Category category, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2 AND r.reportIssue.category = ?3")
    Page<Report> findAllByZoneReportStateCategory(Zone zone, ReportState reportState, Category category, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.address LIKE CONCAT(?2,'%') AND r.reportState = ?3")
    Page<Report> findAllByZoneAreaReportState(Zone zone, String partialAddress, ReportState reportState, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.zone = ?1 AND r.reportState = ?2")
    Page<Report> findAllByZoneReportState(Zone zone, ReportState reportState, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE Report r SET r.reportState = ?2 WHERE r.reportState = ?1 AND r.expiresAt <= ?3")
    void updateExpiryOfReports(ReportState fresh, ReportState forRevaluation, Date currentDateTime);
}
