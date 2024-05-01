package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.*;
import bg.tu_varna.sit.backend.validation.user.annotation.IdRegex;
import bg.tu_varna.sit.backend.validation.user.annotation.IsIdExists;
import jakarta.validation.GroupSequence;

//? This DTO is sent from the frontend, instead of doing with it path variable or request param for safety reasons.
public record IdDTO(
        @IdRegex(groups = {IdRegexValidation.class})
        @IsIdExists(groups = {IsIdExistsValidation.class})
        String id)
{
        @GroupSequence({IdRegexValidation.class, IsIdExistsValidation.class})
        public interface Group{}
}
