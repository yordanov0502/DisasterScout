package bg.tu_varna.sit.backend.models.entity.report;

import bg.tu_varna.sit.backend.models.enums.report.reportissue.Category;
import bg.tu_varna.sit.backend.models.enums.report.reportissue.Issue;
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
@Table(name = "report_issues",
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_report_issue", columnNames = {"category", "issue"})})
public class ReportIssue {
    @Id
    @Column(name = "id_report_issue", nullable = false)
    private final Integer id;

    @Column(name = "category" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Category category;

    @Column(name = "issue" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Issue issue;
}