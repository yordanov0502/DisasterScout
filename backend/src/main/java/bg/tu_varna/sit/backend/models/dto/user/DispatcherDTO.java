package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.models.enums.useractivity.Activity;
import bg.tu_varna.sit.backend.models.enums.userstatus.Status;

import java.util.List;

public record DispatcherDTO (String id, String name, String email, String username, Status status, Activity activity, List<String> availableZoneIds) {}