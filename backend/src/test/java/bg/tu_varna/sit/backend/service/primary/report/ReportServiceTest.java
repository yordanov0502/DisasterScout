package bg.tu_varna.sit.backend.service.primary.report;

import bg.tu_varna.sit.backend.models.entity.report.ReportState;
import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
import bg.tu_varna.sit.backend.repository.report.ReportRepository;
import bg.tu_varna.sit.backend.service.util.TimeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.*;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ReportServiceTest {

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private ReportStateService reportStateService;

    @Mock
    private TimeService timeService;


    @InjectMocks
    private ReportService reportService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void updateReportsExpiry() {
        ReportState freshState = new ReportState(1, State.FRESH);
        ReportState forRevaluationState = new ReportState(2, State.FOR_REVALUATION);
        Date currentDate = new Date();

        when(reportStateService.getReportStateByState(State.FRESH)).thenReturn(freshState);
        when(reportStateService.getReportStateByState(State.FOR_REVALUATION)).thenReturn(forRevaluationState);
        when(timeService.getCurrentDateAndTimeInBulgaria()).thenReturn(currentDate);

        reportService.updateReportsExpiry();

        verify(reportRepository).updateExpiryOfReports(freshState, forRevaluationState, currentDate);

    }

    @Test
    void testGetAreaFromAddressWithTwoDelimiters() {
        String fullAddress = "обл.Благоевград~Гоце Делчев~ул. Иван Вазов 12";
        String expectedArea = "Гоце Делчев";

        String actualArea = reportService.getAreaFromAddress(fullAddress);

        assertEquals(expectedArea, actualArea);
    }
}