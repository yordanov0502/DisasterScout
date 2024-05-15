package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.entity.report.Reporter;
import bg.tu_varna.sit.backend.repository.report.ReporterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReporterService {

    private final ReporterRepository reporterRepository;

    public Reporter getReporter(String firstName, String lastName, String phoneNumber) {
        Optional<Reporter> reporterOpt = reporterRepository.findByFirstNameAndLastNameAndPhoneNumber(firstName, lastName, phoneNumber);
        //? Return existing reporter entity, otherwise create new one and return it
        return reporterOpt.orElseGet(() -> reporterRepository.save(new Reporter(null, firstName, lastName, phoneNumber)));
    }
}
