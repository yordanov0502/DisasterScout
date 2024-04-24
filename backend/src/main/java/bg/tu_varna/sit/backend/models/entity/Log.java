package bg.tu_varna.sit.backend.models.entity;

import bg.tu_varna.sit.backend.models.enums.log.Action;
import bg.tu_varna.sit.backend.models.enums.log.Level;
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

    @Column(name = "level" , nullable = false)
    @Enumerated(EnumType.STRING)
    private Level level;

    @Column(name = "action" , nullable = false)
    @Enumerated(EnumType.STRING)
    private Action action;

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