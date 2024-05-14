package bg.tu_varna.sit.backend.service.primary.user;

import bg.tu_varna.sit.backend.models.entity.user.UserRole;
import bg.tu_varna.sit.backend.models.enums.user.userrole.Role;
import bg.tu_varna.sit.backend.service.cache.user.UserRoleCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRoleService {

    private final UserRoleCacheService userRoleCacheService;

    public UserRole getUserRoleByRole(Role role) {return userRoleCacheService.getUserRoleByRole(role);}
}
