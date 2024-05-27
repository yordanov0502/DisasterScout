package bg.tu_varna.sit.backend.models.mapper.report;

import bg.tu_varna.sit.backend.models.dto.report.PageReportCardDTO;
import bg.tu_varna.sit.backend.models.dto.report.ReportCardDTO;
import bg.tu_varna.sit.backend.models.entity.report.Report;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReportMapper {

    public PageReportCardDTO mapToPageReportCardDTO(Page<Report> pageReport)
    {
        List<ReportCardDTO> reportCardDTOList = pageReport.getContent()
                .stream()
                .map(report -> new ReportCardDTO(
                        report.getId(),
                        report.getReportIssue().getIssue(),
                        report.getImageUrl(),
                        report.getSeverity().getSeverityType(),
                        report.getSubmittedAt(),
                        report.getExpiresAt(),
                        shortenAddress(report.getAddress()),
                        shortenDescription(report.getDescription())
                ))
                .toList();

        return PageReportCardDTO.builder()
                .content(reportCardDTOList)
                .totalPages(pageReport.getTotalPages())
                .number(pageReport.getNumber())
                .build();
    }

    private String shortenAddress(String address) {
        String formattedAddress = address.replace('~', ',');
        if (formattedAddress.length() <= 40) {return formattedAddress;}
        else {return formattedAddress.substring(0, 40);}
    }

    private String shortenDescription(String description) {
        if (description.length() <= 140) {return description;}
        else {return description.substring(0, 140);}
    }

}
