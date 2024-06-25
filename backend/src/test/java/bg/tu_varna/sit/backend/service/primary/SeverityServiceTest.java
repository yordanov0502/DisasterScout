package bg.tu_varna.sit.backend.service.primary;

import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.enums.severity.SeverityType;
import bg.tu_varna.sit.backend.service.cache.SeverityCacheService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class SeverityServiceTest {


    @Mock
    private SeverityCacheService severityCacheService;

    @InjectMocks
    private SeverityService severityService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void getSeverityBySeverityType() {
        Severity mockSeverity = new Severity(2, SeverityType.MEDIUM);
        Mockito.when(severityCacheService.getSeverityBySeverityType(SeverityType.MEDIUM)).thenReturn(mockSeverity);

        Severity result = severityService.getSeverityBySeverityType(SeverityType.MEDIUM);

        assertEquals(mockSeverity, result);
        Mockito.verify(severityCacheService).getSeverityBySeverityType(SeverityType.MEDIUM);

    }
}