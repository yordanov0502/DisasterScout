package bg.tu_varna.sit.backend.repository.report;

import bg.tu_varna.sit.backend.models.entity.report.Reporter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReporterRepository extends JpaRepository<Reporter,Integer> {
    Optional<Reporter> findByFirstNameAndLastNameAndPhoneNumber(String firstName, String lastName, String phoneNumber);
}
