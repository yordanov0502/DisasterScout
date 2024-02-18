package bg.tu_varna.sit.backend.models.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//* validations of this DTO are applied in the LoginAuthenticationFilter by CustomLoginRegexValidation
public class LoginRequestDTO {
    private String username;
    private String password;
}