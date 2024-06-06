package bg.tu_varna.sit.backend.controller.internal.dispatcher;

import bg.tu_varna.sit.backend.models.dto.report.ColumnChartDTO;
import bg.tu_varna.sit.backend.models.dto.report.PieChartDTO;
import bg.tu_varna.sit.backend.service.primary.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/internal/dispatcher/dashboard")
public class DashboardController {

    private final ReportService reportService;

    @Operation(summary = "Get number of FRESH reports of each zone",
            description = "Dispatcher/Admin gets the number of all FRESH reports of each zone. (if any zone have no FRESH reports, 0 is returned for the specific zone)")
    @GetMapping("/get-fresh-reports")
    public ColumnChartDTO getCountOfFreshReportsOfZones(){
        return reportService.getCountOfFreshReportsOfZones();
    }

    @Operation(summary = "Get proportion of reports' categories (ONLY FOR FRESH REPORTS)",
            description = "Dispatcher/Admin gets the proportion of reports' categories (ONLY FOR FRESH REPORTS)")
    @GetMapping("/get-proportion-of-categories")
    public PieChartDTO getProportionOfCategoriesOfFreshReports(){
        return reportService.getProportionOfCategoriesOfFreshReports();
    }
}
