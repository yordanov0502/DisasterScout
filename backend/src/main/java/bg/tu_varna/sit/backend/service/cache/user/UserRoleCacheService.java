package bg.tu_varna.sit.backend.service.cache.user;

import bg.tu_varna.sit.backend.models.entity.user.UserRole;
import bg.tu_varna.sit.backend.models.enums.user.userrole.Role;
import bg.tu_varna.sit.backend.repository.user.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRoleCacheService {

    private final UserRoleRepository userRoleRepository;

    @Cacheable(value = "role", key = "#role", unless = "#result == null")
    public UserRole getUserRoleByRole(Role role) {return userRoleRepository.findByRole(role);}

}
