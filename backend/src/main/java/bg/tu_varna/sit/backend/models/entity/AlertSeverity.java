package bg.tu_varna.sit.backend.models.entity;

import bg.tu_varna.sit.backend.models.enums.alertseverity.Severity;
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
@Table(name = "alert_severities")
public class AlertSeverity {
    @Id
    @Column(name = "id_alert_severity", nullable = false)
    private final Integer id;

    @Column(name = "severity", nullable = false)
    @Enumerated(EnumType.STRING)
    private final Severity severity;
}