package bg.tu_varna.sit.backend.models.entity;

import bg.tu_varna.sit.backend.models.enums.user.Activity;
import bg.tu_varna.sit.backend.models.enums.user.Role;
import bg.tu_varna.sit.backend.models.enums.user.Status;
import com.mongodb.annotations.Immutable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Builder(toBuilder = true)
@Getter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@Immutable //? marker/documentation annotation
@Document(collection = "users")
public class User implements UserDetails {
    @Id
    private final String id;
    private final String firstName;
    private final String lastName;
    @Indexed(unique = true)
    private final String email;
    @Indexed(unique = true)
    private final String username;
    private final String password;
    private final Role role; //? ADMIN / DISPATCHER
    private final Status status; //? ACTIVE / LOCKED
    private final Activity activity; //? ONLINE / OFFLINE
    private final Date lastLogin;
    @Field("ula")
    private final int unsuccessfulLoginAttempts; //? max 3 for ADMIN & max 5 for DISPATCHER

    //The following method is invoked by Spring Security everytime a user try to reach a protected resource
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
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
    public Date getLastLogin(){
        return new Date(lastLogin.getTime());
    }
}
