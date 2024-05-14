package bg.tu_varna.sit.backend.repository.user;

import bg.tu_varna.sit.backend.models.entity.user.UserRole;
import bg.tu_varna.sit.backend.models.enums.user.userrole.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole,Integer> {
    UserRole findByRole(Role role);
}