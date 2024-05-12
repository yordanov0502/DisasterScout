package bg.tu_varna.sit.backend.service;

import bg.tu_varna.sit.backend.models.entity.UserRole;
import bg.tu_varna.sit.backend.models.enums.userrole.Role;
import bg.tu_varna.sit.backend.service.cache.UserRoleCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRoleService {

    private final UserRoleCacheService userRoleCacheService;

    public UserRole getUserRoleByRole(Role role) {return userRoleCacheService.getUserRoleByRole(role);}
}
