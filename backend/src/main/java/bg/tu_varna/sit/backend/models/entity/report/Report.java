package bg.tu_varna.sit.backend.models.entity.report;

import bg.tu_varna.sit.backend.models.entity.Severity;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Builder(toBuilder = true)
@Getter
@Setter
@ToString
//@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_seq")
    @SequenceGenerator(name = "report_seq", allocationSize = 1)
    @Column(name = "id_report", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "report_issue_id", nullable = false)
    private ReportIssue reportIssue;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "severity_id", nullable = false)
    private Severity severity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "report_state_id", nullable = false)
    private ReportState reportState;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "zone_id", nullable = false)
    private Zone zone;

    //? User is null until whoever dispatcher process the report
    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.SET_NULL) // When user is deleted, every report referencing the particular user is updated(report's FK user_id is set to null)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reporter_id", nullable = false)
    private Reporter reporter;

    //* Image is recommended for report integrity, but is left optional
    @Column(name = "image_url", length = 500, nullable = true)
    private String imageUrl;

    //? Coordinates is highly possible to be submitted by reporters, instead of actual locationUrl. Before publishing the report, if the value of locationUrl is coordinates, then the dispatcher should search manually them in google maps copy the locationUrl and set it for this field.
    //! Coordinates / locationUrl is mandatory for every report
    @Column(name = "location_url", nullable = false)
    private String locationUrl;

    @Column(name = "address", nullable = false)
    private String address; //? ZoneName~[city or village or highway]~more info

    @Column(name = "submitted_at", nullable = false)
    private Date submittedAt; //? Date and time when the report was submitted by a reporter.

    @Column(name = "expires_at", nullable = true) //! It can be null if "не знам" was passed as expectedDuration
    private Date expiresAt; //? Date and time until the report is considered FRESH.
}