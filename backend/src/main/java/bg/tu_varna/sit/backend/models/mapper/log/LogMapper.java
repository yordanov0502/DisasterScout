package bg.tu_varna.sit.backend.models.mapper.log;

import bg.tu_varna.sit.backend.models.dto.log.LogDTO;
import bg.tu_varna.sit.backend.models.dto.log.PageLogDTO;
import bg.tu_varna.sit.backend.models.entity.Log;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LogMapper {
    public PageLogDTO mapToPageLogDTO(Page<Log> pageLog)
    {
        List<LogDTO> logDTOList = pageLog.getContent()
                .stream()
                .map(log -> new LogDTO(log.getLevel(),log.getMessage(),log.getCreatedAt()))
                .toList();

        return PageLogDTO.builder()
                .content(logDTOList)
                .totalPages(pageLog.getTotalPages())
                .number(pageLog.getNumber())
                .build();
    }
}
