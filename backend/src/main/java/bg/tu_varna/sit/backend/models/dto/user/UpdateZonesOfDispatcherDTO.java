package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.IdRegexValidation;
import bg.tu_varna.sit.backend.validation.user.IsIdExistsValidation;
import bg.tu_varna.sit.backend.validation.user.annotation.IdRegex;
import bg.tu_varna.sit.backend.validation.user.annotation.IsIdExists;
import jakarta.validation.GroupSequence;

import java.util.List;

public record UpdateZonesOfDispatcherDTO(
        @IdRegex(groups = {IdRegexValidation.class})
        @IsIdExists(groups = {IsIdExistsValidation.class})
        String id,
        List<String> zoneIds
)
{
    @GroupSequence({IdRegexValidation.class, IsIdExistsValidation.class})
    public interface Group{}
}
