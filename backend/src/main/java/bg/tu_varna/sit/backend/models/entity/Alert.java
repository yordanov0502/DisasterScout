package bg.tu_varna.sit.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;

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
    @JoinColumn(name = "severity_id")
    private Severity severity;

    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;
}