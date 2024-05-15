package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.repository.report.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;



}
