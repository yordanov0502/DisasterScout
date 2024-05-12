package bg.tu_varna.sit.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Builder(toBuilder = true)
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "alert_seq")
    @SequenceGenerator(name = "alert_seq", allocationSize = 1)
    @Column(name = "id_alert", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.SET_NULL)  // When alertSeverity is deleted, every alert referencing the particular alertSeverity is updated(alert's FK alert_severity_id is set to null) THIS WILL NEVER EVER HAPPEN
    @JoinColumn(name = "alert_severity_id")
    private AlertSeverity alertSeverity;

    @Column(name = "message", nullable = false)
    private String message;
}