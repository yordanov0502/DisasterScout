package bg.tu_varna.sit.backend.models.enums.logaction;

public enum Action {
    LOGIN("%s %s %s влезе в системата."),
    LOGOUT("%s %s %s излезе от системата."),
    ACCOUNT_UPDATE("%s %s %s актуализира информацията за своя акаунт."),
    PASSWORD_UPDATE("%s %s %s актуализира своята парола."),
    PASSWORD_RESET("Заявена бе нова парола по имейл адрес на %s %s %s."), //! WARN
    PASSWORD_RESET_FAILURE("Бил е извършен неуспешен опит за заявяване на нова парола по имейл адрес на %s %s %s."), //! ERROR
    ACCOUNT_LOCKED_AUTOMATICALLY("Акаунтът на %s %s %s беше автоматично заключен."), //! ERROR
    ACCOUNT_LOCKED_MANUALLY("Акаунтът на %s %s %s беше ръчно заключен."), //! WARN
    ACCOUNT_UNLOCKED("Акаунтът на %s %s %s беше отключен."),
    ZONE_ALERT_SET("%s %s %s добави сигнал с%s ниво на опасност за област %s."), //! WARN
    ZONE_ALERT_REMOVED("%s %s %s премахна сигнал с%s ниво на опасност за област %s."); //! WARN


    private final String messageTemplate;

    Action(String messageTemplate)
    {
      this.messageTemplate=messageTemplate;
    }

    public String format(Object... args){
        return String.format(messageTemplate, args);
    }
}
