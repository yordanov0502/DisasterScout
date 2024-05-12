package bg.tu_varna.sit.backend.service.cache;

import bg.tu_varna.sit.backend.models.entity.UserRole;
import bg.tu_varna.sit.backend.models.enums.userrole.Role;
import bg.tu_varna.sit.backend.repository.UserRoleRepository;
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
