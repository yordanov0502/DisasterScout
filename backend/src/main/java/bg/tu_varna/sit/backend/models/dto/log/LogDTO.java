package bg.tu_varna.sit.backend.models.dto.log;

import bg.tu_varna.sit.backend.models.enums.log.loglevel.Level;

import java.util.Date;

public record LogDTO (Level level, String message, Date createdAt) {}
