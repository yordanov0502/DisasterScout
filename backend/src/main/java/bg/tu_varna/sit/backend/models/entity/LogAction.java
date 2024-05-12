package bg.tu_varna.sit.backend.models.entity;

import bg.tu_varna.sit.backend.models.enums.logaction.Action;
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
@Table(name = "log_actions")
public class LogAction {
    @Id
    @Column(name = "id_log_action", nullable = false)
    private final Integer id;

    @Column(name = "action" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Action action;
}