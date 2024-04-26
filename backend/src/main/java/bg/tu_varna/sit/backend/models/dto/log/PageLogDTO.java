package bg.tu_varna.sit.backend.models.dto.log;

import lombok.Builder;

import java.util.List;

@Builder
public record PageLogDTO (List<LogDTO> content, Integer totalPages, Integer number) {}


