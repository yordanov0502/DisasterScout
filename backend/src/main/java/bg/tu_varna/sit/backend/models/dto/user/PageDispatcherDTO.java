package bg.tu_varna.sit.backend.models.dto.user;

import lombok.Builder;

import java.util.List;

@Builder
public record PageDispatcherDTO(List<DispatcherDTO> content, Integer totalPages, Integer number) {}