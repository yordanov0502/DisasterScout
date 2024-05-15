package bg.tu_varna.sit.backend.repository.report;

import bg.tu_varna.sit.backend.models.entity.report.ReportState;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportStateRepository extends JpaRepository<ReportState,Integer> {
    ReportState findByState(State state);
}
