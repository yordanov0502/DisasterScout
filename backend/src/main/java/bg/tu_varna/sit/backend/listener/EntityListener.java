package bg.tu_varna.sit.backend.listener;

import bg.tu_varna.sit.backend.models.entity.Log;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.log.Action;
import bg.tu_varna.sit.backend.models.enums.log.Level;
import bg.tu_varna.sit.backend.models.event.EntityEvent;
import bg.tu_varna.sit.backend.service.LoggerService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import static bg.tu_varna.sit.backend.models.enums.user.Role.DISPATCHER;

@Component
@RequiredArgsConstructor
public class EntityListener {

    private final LoggerService loggerService;

    @EventListener(value = EntityEvent.class)
    public void handleUserEvent(EntityEvent<User> userEvent){
        User user = userEvent.entity();

        switch (userEvent.action()){
            case LOGIN -> {
                String firstName = userEvent.entity().getFirstName();
                String lastName = userEvent.entity().getLastName();
                String role = userEvent.entity().getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.INFO, Action.LOGIN, Action.LOGIN.format(role,firstName,lastName),null,user));
            }
            case LOGOUT -> {
                String firstName = userEvent.entity().getFirstName();
                String lastName = userEvent.entity().getLastName();
                String role = userEvent.entity().getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.INFO, Action.LOGOUT, Action.LOGOUT.format(role,firstName,lastName),null,user));
            }

            case ACCOUNT_LOCKED_AUTOMATICALLY -> {
                String firstName = userEvent.entity().getFirstName();
                String lastName = userEvent.entity().getLastName();
                String role = userEvent.entity().getRole().equals(DISPATCHER) ? "диспечер" : "администратор";
                loggerService.log(new Log(null, Level.WARN, Action.ACCOUNT_LOCKED_AUTOMATICALLY, Action.ACCOUNT_LOCKED_AUTOMATICALLY.format(role,firstName,lastName),null,user));
            }

        }


    }

}
