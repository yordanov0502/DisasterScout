package bg.tu_varna.sit.backend.models.entity.user;

import bg.tu_varna.sit.backend.models.enums.user.userrole.Role;
import jakarta.persistence.*;
import lombok.*;

//? Entities MUST be manually inserted into DB only once(on initial project setup) and then never be deleted or updated
@Builder(toBuilder = true)
@Getter
@ToString
//@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table(name = "user_roles")
public class UserRole {
    @Id
    @Column(name = "id_user_role", nullable = false)
    private final Integer id;

    @Column(name = "role" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Role role;
}