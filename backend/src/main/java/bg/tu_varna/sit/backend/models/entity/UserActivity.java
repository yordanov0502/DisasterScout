package bg.tu_varna.sit.backend.models.entity;

import bg.tu_varna.sit.backend.models.enums.useractivity.Activity;
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
@Table(name = "user_activities")
public class UserActivity {
    @Id
    @Column(name = "id_user_activity", nullable = false)
    private final Integer id;

    @Column(name = "activity" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Activity activity;
}