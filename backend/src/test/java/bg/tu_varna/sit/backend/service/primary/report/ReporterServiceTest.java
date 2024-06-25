package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.entity.report.Reporter;
import bg.tu_varna.sit.backend.repository.report.ReporterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ReporterServiceTest {

    @Mock
    private ReporterRepository reporterRepository;

    @InjectMocks
    private ReporterService reporterService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void getReporter() {
        String firstName = "Petq";
        String lastName = "Petrova";
        String phoneNumber = "0882658954";
        Reporter existingReporter = new Reporter(1, firstName, lastName, phoneNumber);
        when(reporterRepository.findByFirstNameAndLastNameAndPhoneNumber(firstName, lastName, phoneNumber))
                .thenReturn(Optional.of(existingReporter));

        Reporter result = reporterService.getReporter(firstName, lastName, phoneNumber);

        assertEquals(existingReporter, result);
        verify(reporterRepository, Mockito.never()).save(any(Reporter.class));
    }
}