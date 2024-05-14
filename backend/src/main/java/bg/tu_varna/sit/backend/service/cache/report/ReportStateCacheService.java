package bg.tu_varna.sit.backend.service.cache.report;

import bg.tu_varna.sit.backend.models.entity.report.ReportState;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.repository.report.ReportStateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportStateCacheService {

    private final ReportStateRepository reportStateRepository;

    @Cacheable(value = "state", key = "#state", unless = "#result == null")
    public ReportState getReportStateByState(State state) {return reportStateRepository.findByState(state);}


}
