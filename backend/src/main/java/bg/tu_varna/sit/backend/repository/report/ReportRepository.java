package bg.tu_varna.sit.backend.repository.report;

import bg.tu_varna.sit.backend.models.entity.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report,Integer> {

}
