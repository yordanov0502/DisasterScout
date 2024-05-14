package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.entity.report.ReportState;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.service.cache.report.ReportStateCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportStateService {

    private final ReportStateCacheService reportStateCacheService;

    public ReportState getReportStateByState(State state) {
        return reportStateCacheService.getReportStateByState(state);}
}
