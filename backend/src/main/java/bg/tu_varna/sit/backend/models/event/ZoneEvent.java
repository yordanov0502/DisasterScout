package bg.tu_varna.sit.backend.models.event;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.entity.Zone;
import bg.tu_varna.sit.backend.models.enums.log.Action;
import org.springframework.context.ApplicationEvent;

public class ZoneEvent extends ApplicationEvent {

    private final User user;
    private final Zone zone;
    private final Action action;

    //? When creating UserEvent I must pass "this" as first argument to the constructor
    public ZoneEvent(Object source, User user, Zone zone, Action action)
    {
        super(source);
        this.user = user;
        this.zone = zone;
        this.action = action;
    }

    public User getUser() {return user;}
    public Zone getZone() {return zone;}
    public Action getAction() {return action;}
}
