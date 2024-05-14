package bg.tu_varna.sit.backend.models.entity.log;

import bg.tu_varna.sit.backend.models.enums.log.loglevel.Level;
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
@Table(name = "log_levels")
public class LogLevel {
    @Id
    @Column(name = "id_log_level", nullable = false)
    private final Integer id;

    @Column(name = "level" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Level level;
}