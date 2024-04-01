package bg.tu_varna.sit.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder(toBuilder = true)
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table(name = "zones")
public class Zone {
    @Id
    @Column(name = "id_zone", nullable = false)
    private final String id;

    @Column(name = "name", nullable = false, unique = true)
    private final String name;

    @Column(name = "rating", nullable = false)
    private final Integer rating;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.MERGE, orphanRemoval = true)
    @JoinColumn(name = "alert_id")
    private final Alert alert;
}