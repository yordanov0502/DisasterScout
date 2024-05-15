package bg.tu_varna.sit.backend.models.entity.report;

import jakarta.persistence.*;
import lombok.*;

@Builder(toBuilder = true)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table(name = "reporters",
        uniqueConstraints = {
        @UniqueConstraint(name = "unique_reporter", columnNames = {"first_name", "last_name", "phone_number"})},
        indexes = {
        @Index(name = "idx_reporter_fullname_phone", columnList = "first_name, last_name, phone_number")
})
public class Reporter {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reporter_seq")
    @SequenceGenerator(name = "reporter_seq", allocationSize = 1)
    @Column(name = "id_reporter", nullable = false)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
}