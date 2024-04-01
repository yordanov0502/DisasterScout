package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    User findUserById(String id);
    User findUserByUsername(String username);
    User findUserByEmail(String email);
    boolean existsUserById(String id);
    boolean existsUserByUsername(String username);
    boolean existsUserByEmail(String email);
}
