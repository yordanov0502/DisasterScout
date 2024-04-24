package bg.tu_varna.sit.backend.models.event;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.models.enums.log.Action;
import org.springframework.context.ApplicationEvent;

public class UserEvent extends ApplicationEvent {

   private final User user;
   private final Action action;

   //? When creating UserEvent I must pass "this" as first argument to the constructor
   public UserEvent(Object source, User user, Action action)
   {
      super(source);
      this.user = user;
      this.action = action;
   }

   public User getUser() {return user;}
   public Action getAction() {return action;}
}

//* Another generic alternative:
//public record UserEvent<E>(E entity, Action action) {}

//* Another generic alternative:
//public class UserEvent<E> extends ApplicationEvent implements ResolvableTypeProvider {
//
//   private final E entity;
//   private final Action action;
//
//   //? When creating UserEvent I must pass "this" as first argument to the constructor
//   public UserEvent(Object source, E entity, Action action)
//   {
//      super(source);
//      this.entity = entity;
//      this.action = action;
//   }
//
//   public E getEntity() {return entity;}
//
//   public Action getAction() {return action;}
//
//   @Override
//   public ResolvableType getResolvableType() {
//      return ResolvableType.forClassWithGenerics(getClass(), ResolvableType.forInstance(entity));
//   }
//}