package bg.tu_varna.sit.backend.repository;

import bg.tu_varna.sit.backend.models.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findUserById(String id);
}
