package bg.tu_varna.sit.backend.models.dto.report;

import lombok.Builder;

import java.util.List;

@Builder
public record PageReportCardDTO(List<ReportCardDTO> content, Integer totalPages, Integer number) {}