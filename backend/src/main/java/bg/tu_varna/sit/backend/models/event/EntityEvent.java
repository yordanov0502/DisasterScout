package bg.tu_varna.sit.backend.models.event;

import bg.tu_varna.sit.backend.models.enums.log.Action;

public record EntityEvent<E>(E entity, Action action) {}

//* Another alternative:
//public class EntityEvent<E> extends ApplicationEvent implements ResolvableTypeProvider {
//
//   private final E entity;
//   private final Action action;
//
//   //? When creating EntityEvent I must pass "this" as first argument to the constructor
//   public EntityEvent(Object source, E entity, Action action)
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