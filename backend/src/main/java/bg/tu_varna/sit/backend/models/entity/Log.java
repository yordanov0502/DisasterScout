package bg.tu_varna.sit.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
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
@Table(name = "logs")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "log_seq")
    @SequenceGenerator(name = "log_seq", allocationSize = 1)
    @Column(name = "id_log", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.SET_NULL)  // When logLevel is deleted, every log referencing the particular logLevel is updated(log's FK log_level_id is set to null) THIS WILL NEVER EVER HAPPEN
    @JoinColumn(name = "log_level_id")
    private LogLevel logLevel;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.SET_NULL)  // When logAction is deleted, every log referencing the particular logAction is updated(log's FK log_action_id is set to null) THIS WILL NEVER EVER HAPPEN
    @JoinColumn(name = "log_action_id")
    private LogAction logAction;

    @Column(name = "message", nullable = false)
    private String message;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.SET_NULL) // When user is deleted, every log referencing the particular user is updated(log's FK user_id is set to null)
    @JoinColumn(name = "user_id")
    private User user;
}