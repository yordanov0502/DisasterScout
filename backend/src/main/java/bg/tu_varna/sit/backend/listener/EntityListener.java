package bg.tu_varna.sit.backend.listener;

import bg.tu_varna.sit.backend.models.entity.Log;
import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.enums.log.Action;
import bg.tu_varna.sit.backend.models.enums.log.Level;
import bg.tu_varna.sit.backend.models.event.UserEvent;
import bg.tu_varna.sit.backend.models.event.ZoneEvent;
import bg.tu_varna.sit.backend.service.LoggerService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import static bg.tu_varna.sit.backend.models.enums.user.Role.DISPATCHER;

@Component
@RequiredArgsConstructor
public class EntityListener {

    private final LoggerService loggerService;

    @EventListener(value = UserEvent.class)
    public void handleUserEvent(UserEvent userEvent){
        User user = userEvent.getUser();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();

        switch (userEvent.getAction()){
            case LOGIN -> {
                String role = user.getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.INFO, Action.LOGIN, Action.LOGIN.format(role,firstName,lastName),null,user));
            }
            case LOGOUT -> {
                String role = user.getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.INFO, Action.LOGOUT, Action.LOGOUT.format(role,firstName,lastName),null,user));
            }
            case ACCOUNT_UPDATE -> {
                String role = user.getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.INFO, Action.ACCOUNT_UPDATE, Action.ACCOUNT_UPDATE.format(role,firstName,lastName),null,user));
            }
            case PASSWORD_UPDATE -> {
                String role = user.getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.INFO, Action.PASSWORD_UPDATE, Action.PASSWORD_UPDATE.format(role,firstName,lastName),null,user));
            }
            case PASSWORD_RESET -> {
                String role = user.getRole().equals(DISPATCHER) ? "диспечер" : "администратор";
                loggerService.log(new Log(null, Level.WARN, Action.PASSWORD_RESET, Action.PASSWORD_RESET.format(role,firstName,lastName),null,user));
            }
            case PASSWORD_RESET_FAILURE -> {
                String role = user.getRole().equals(DISPATCHER) ? "диспечер" : "администратор";
                loggerService.log(new Log(null, Level.ERROR, Action.PASSWORD_RESET_FAILURE, Action.PASSWORD_RESET_FAILURE.format(role,firstName,lastName),null,user));
            }
            case ACCOUNT_LOCKED_AUTOMATICALLY -> {
                String role = user.getRole().equals(DISPATCHER) ? "диспечер" : "администратор";
                loggerService.log(new Log(null, Level.WARN, Action.ACCOUNT_LOCKED_AUTOMATICALLY, Action.ACCOUNT_LOCKED_AUTOMATICALLY.format(role,firstName,lastName),null,user));
            }
            case ACCOUNT_LOCKED_MANUALLY -> {
                String role = user.getRole().equals(DISPATCHER) ? "диспечер" : "администратор";
                loggerService.log(new Log(null, Level.WARN, Action.ACCOUNT_LOCKED_MANUALLY, Action.ACCOUNT_LOCKED_MANUALLY.format(role,firstName,lastName),null,user));
            }
            case ACCOUNT_UNLOCKED -> {
                String role = user.getRole().equals(DISPATCHER) ? "диспечер" : "администратор";
                loggerService.log(new Log(null, Level.INFO, Action.ACCOUNT_UNLOCKED, Action.ACCOUNT_UNLOCKED.format(role,firstName,lastName),null,user));
            }
        }
    }

    @EventListener(value = ZoneEvent.class)
    public void handleZoneEvent(ZoneEvent zoneEvent){
        User user = zoneEvent.getUser();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        Zone zone = zoneEvent.getZone();
        String severityOfAlert = null;
        switch (zone.getAlert().getSeverity())
        {
            case LOW -> severityOfAlert = " НИСКО";
            case MEDIUM -> severityOfAlert = "ъс СРЕДНО";
            case HIGH -> severityOfAlert = " ВИСОКО";
            case CRITICAL -> severityOfAlert = " КРИТИЧНО";
        }

        switch (zoneEvent.getAction()){
            case ZONE_ALERT_SET -> {
                String role = user.getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.WARN, Action.ZONE_ALERT_SET, Action.ZONE_ALERT_SET.format(role,firstName,lastName,severityOfAlert,zone.getName()),null,user));
            }
            case ZONE_ALERT_REMOVED -> {
                String role = user.getRole().equals(DISPATCHER) ? "Диспечер" : "Администратор";
                loggerService.log(new Log(null, Level.WARN, Action.ZONE_ALERT_REMOVED, Action.ZONE_ALERT_REMOVED.format(role,firstName,lastName,severityOfAlert,zone.getName()),null,user));
            }
        }
    }

}
