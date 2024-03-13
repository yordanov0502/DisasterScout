package bg.tu_varna.sit.backend.service.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//! From september Google will disable the option to access Gmail from 3rd party apps with only username and password, and instead OAuth should be used.
//* https://sendgrid.com/en-us/blog/what-is-starttls more info about SMTP & StartTLS
@Service
@RequiredArgsConstructor
public class EmailService {

     @Value("${env.EMAIL_USERNAME}")
     private String emailSender;
     private final JavaMailSender javaMailSender;

     public void sendEmail(String toEmail, String newGeneratedPassword){
         SimpleMailMessage message = new SimpleMailMessage();
         message.setFrom(emailSender);
         message.setTo(toEmail);
         message.setSubject("Заявка за нова парола");
         message.setText("Здравейте!" +
                 "\nПолучавате този имейл, защото сте заявили нова парола за достъп до вашия акаунт в системата за управление на съдържанието на Disaster Scout." +
                 "\nВашата нова парола е: "+newGeneratedPassword+
                 "\n\nОт съображения за сигурност Ви молим да смените паролата си с ваша собствена, веднага след като се впишете успешно в системата." +
                 "\n\nАко не сте заявили нова парола, това означава, че някой друг го е направил вместо вас и в момента паролата Ви е променена." +
                 "\nВ такъв случай, само този, който притежава достъп до имейл адресът Ви може да види новата Ви парола от този имейл." +
                 "\nПрепоръчително е да се свържете незабавно с администратора на систметата ако сте попаднали такава ситуация." +
                 "\n\n\nС уважение," +
                 "\nсистемата Disaster Scout.");
         javaMailSender.send(message);
     }

     public void sendWarningEmail(String toEmail){
         SimpleMailMessage message = new SimpleMailMessage();
         message.setFrom(emailSender);
         message.setTo(toEmail);
         message.setSubject("ВНИМАНИЕ! [Някой се опита да заяви нова парола] ВНИМАНИЕ!");
         message.setText("Здравейте!" +
                 "\nПолучавате този имейл като предупреждение." +
                 "\nНякой се е опитал да заяви нова парола за вашия акаунт, докато сте били вписани или докато акаунтът Ви е бил заключен." +
                 "\nМоля вземете спешни мерки като промените вашия имейл адрес свързан с акаунтът Ви и незабавно се свържете с администратора на системата." +
                 "\n\n\nС уважение," +
                 "\nсистемата Disaster Scout.");
         javaMailSender.send(message);
     }
}
