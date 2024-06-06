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
import java.util.List;

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

    @Query("SELECT r.imageUrl FROM Report r WHERE r.reportState = ?1 AND r.imageUrl IS NOT NULL")
    List<String> findImageUrlsByReportState(ReportState inactive);

    @Transactional
    @Modifying
    @Query("DELETE FROM Report r WHERE r.reportState = ?1")
    void deleteInactiveReports(ReportState inactive);


    //? Select number of FRESH reports of each zone (if zone doesn't have any FRESH reports, return 0 for it)
    @Query(value = "SELECT COALESCE(COUNT(r.zone_id), 0) FROM zones z " +
            "LEFT JOIN reports r ON z.id_zone = r.zone_id AND r.report_state_id = :reportStateId " +
            "GROUP BY z.id_zone " +
            "ORDER BY CASE z.id_zone " +
            "WHEN 'st1' THEN 1 " +
            "WHEN 'st2' THEN 2 " +
            "WHEN 'st3' THEN 3 " +
            "WHEN 'st4' THEN 4 " +
            "WHEN 'st5' THEN 5 " +
            "WHEN 'st6' THEN 6 " +
            "WHEN 'st7' THEN 7 " +
            "WHEN 'st8' THEN 8 " +
            "WHEN 'st9' THEN 9 " +
            "WHEN 'st10' THEN 10 " +
            "WHEN 'st11' THEN 11 " +
            "WHEN 'st12' THEN 12 " +
            "WHEN 'st13' THEN 13 " +
            "WHEN 'st14' THEN 14 " +
            "WHEN 'st15' THEN 15 " +
            "WHEN 'st16' THEN 16 " +
            "WHEN 'st17' THEN 17 " +
            "WHEN 'st18' THEN 18 " +
            "WHEN 'st19' THEN 19 " +
            "WHEN 'st20' THEN 20 " +
            "WHEN 'st21' THEN 21 " +
            "WHEN 'st22' THEN 22 " +
            "WHEN 'st23' THEN 23 " +
            "WHEN 'st24' THEN 24 " +
            "WHEN 'st25' THEN 25 " +
            "WHEN 'st26' THEN 26 " +
            "WHEN 'st27' THEN 27 " +
            "WHEN 'st28' THEN 28 " +
            "END", nativeQuery = true)
    List<Integer> countReportsByZoneIdAndState(Integer reportStateId);

    @Query(value = "SELECT COALESCE(COUNT(r.id_report), 0) " +
            "FROM report_issues ri " +
            "LEFT JOIN reports r ON ri.id_report_issue = r.report_issue_id AND r.report_state_id = :reportStateId " +
            "GROUP BY ri.category "+
            "ORDER BY CASE ri.category " +
            "WHEN 'SEISMIC_ACTIVITY' THEN 1 " +
            "WHEN 'METEOROLOGICAL_CONDITIONS' THEN 2 " +
            "WHEN 'PUBLIC_CONDITIONS' THEN 3 " +
            "WHEN 'ROAD_CONDITIONS' THEN 4 " +
            "WHEN 'MILITARY_CONDITIONS' THEN 5 " +
            "WHEN 'SPACE_PHENOMENON' THEN 6 " +
            "END", nativeQuery = true)
    List<Integer> countReportsByCategoryAndState(Integer reportStateId);
}
