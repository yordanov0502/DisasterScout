package bg.tu_varna.sit.backend.models.entity.report;

import bg.tu_varna.sit.backend.models.enums.report.reportstate.State;
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
@Table(name = "report_states")
public class ReportState {
    @Id
    @Column(name = "id_report_state", nullable = false)
    private final Integer id;

    @Column(name = "state" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final State state;
}