package bg.tu_varna.sit.backend.models.dto.user;

import bg.tu_varna.sit.backend.validation.user.annotation.EmailRegex;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingEmailU;
import bg.tu_varna.sit.backend.validation.user.annotation.ExistingUsernameU;
import bg.tu_varna.sit.backend.validation.user.annotation.UsernameRegex;
import lombok.Builder;

@Builder
public record AccountDTO(
        String id,
        String firstName,
        String lastName,
        @EmailRegex(groups = {AccountDTO.AccountDTOGroup.class})
        @ExistingEmailU(groups = {AccountDTO.AccountDTOGroup.class})
        String email,
        @UsernameRegex(groups = {AccountDTO.AccountDTOGroup.class})
        @ExistingUsernameU(groups = {AccountDTO.AccountDTOGroup.class})
        String username)
        {
     public interface AccountDTOGroup{
     }
}