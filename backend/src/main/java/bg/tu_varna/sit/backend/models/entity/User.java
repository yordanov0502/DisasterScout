package bg.tu_varna.sit.backend.models.entity;

import bg.tu_varna.sit.backend.models.enums.user.Activity;
import bg.tu_varna.sit.backend.models.enums.user.Role;
import bg.tu_varna.sit.backend.models.enums.user.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Builder(toBuilder = true)
@Getter
@ToString
//@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @Column(name = "id_user", nullable = false)
    private final String id; //? EGN

    @Column(name = "first_name", nullable = false)
    private final String firstName;

    @Column(name = "last_name", nullable = false)
    private final String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private final String email;

    @Column(name = "username", nullable = false, unique = true)
    private final String username;

    @Column(name = "password", nullable = false)
    private final String password;

    @Column(name = "role" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Role role; //? ADMIN / DISPATCHER

    @Column(name = "status" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Status status; //? ACTIVE / LOCKED

    @Column(name = "activity" , nullable = false)
    @Enumerated(EnumType.STRING)
    private final Activity activity; //? ONLINE / OFFLINE

    @Column(name = "last_login", nullable = false)
    private final Date lastLogin;

    @Column(name = "ula", nullable = false)
    private final Integer unsuccessfulLoginAttempts; //? max 3 for ADMIN & max 5 for DISPATCHER

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_zones",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "zone_id")
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private final List<Zone> availableZones;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    //? Safe getter method returning defensive copy of the date(lastLogin), rather than expose the original reference,
    //? in order to avoid any future modifications performed wherever in the code to this instance(lastLogin.getTime()).
    public Date getLastLogin(){return new Date(lastLogin.getTime());}

    //? This getter is private, because both Zone and User entities are part of different caches
    //? and a "Cache Coherence" problem will undoubtedly occur. Because cache synchronization of the data is expensive,
    //? prone to errors and makes the cache implementation meaningless in general I did NOT do it.
    //? Because of it, I decided to make the getter private to avoid data inconsistency which is
    //? indeed present in the availableZones here. (except for the zones' ids which are unique and never changed)
    //! The getter for the List<Zone> should never ever be available for calling.
    private List<Zone> getAvailableZones() {return availableZones;}

    //? The "Cache Coherence" problem will NOT occur when using this getter, because the ids of the zones are PK
    //? and will never change once initialized, no matter in which caches they are stored.
    public List<String> getAvailableZoneIds() {
        if (availableZones == null) {return Collections.emptyList();}
        return availableZones.stream()
                .map(Zone::getId)
                .collect(Collectors.toList());
    }

}