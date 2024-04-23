package bg.tu_varna.sit.backend.models.enums.log;

public enum Action {
    LOGIN("%s %s %s влезе в системата."), //?DONE
    LOGOUT("%s %s %s излезе от системата."), //?DONE
    ACCOUNT_UPDATE("%s %s %s актуализира информацията за своя акаунт."),
    PASSWORD_UPDATE("%s %s %s актуализира своята парола."),
    PASSWORD_RESET("Заявена бе нова парола по имейл адрес на %s %s %s."), //! WARN
    ACCOUNT_LOCKED_AUTOMATICALLY("Акаунтът на %s %s %s беше автоматично заключен."), //?DONE //! WARN
    ACCOUNT_LOCKED_MANUALLY("Акаунтът на %s %s %s беше ръчно заключен."), //! WARN
    ACCOUNT_UNLOCKED("Акаунтът на %s %s %s беше отключен."),
    ZONE_ALERT_SET("Беше добавен сигнал с% ниво на опасност за област %."); //! WARN " НИСКО"  " ъс СРЕДНО" " ВИСОКО" " КРИТИЧНО"

    private final String messageTemplate;

    Action(String messageTemplate)
    {
      this.messageTemplate=messageTemplate;
    }

    public String format(Object... args){
        return String.format(messageTemplate, args);
    }
}
