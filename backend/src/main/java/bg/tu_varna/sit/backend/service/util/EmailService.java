package bg.tu_varna.sit.backend.service.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

//! From september Google will disable the option to access Gmail from 3rd party apps with only username and password, and instead OAuth should be used.
//* https://sendgrid.com/en-us/blog/what-is-starttls more info about SMTP & StartTLS
@Service
@RequiredArgsConstructor
public class EmailService {

     @Value("${env.EMAIL_USERNAME}")
     private String emailSender;
     private final JavaMailSender javaMailSender;

     public boolean sendEmail(String userFirstName, String toEmail, String newGeneratedPassword){
         MimeMessage mimeMessage = javaMailSender.createMimeMessage();
         try {
             MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
             helper.setFrom(emailSender);
             helper.setTo(toEmail);
             helper.setSubject("Заявка за нова парола");

             String htmlMsg = "<h2>Здравейте "+userFirstName+"!</h2>" +

                     "<p>Получавате този имейл, защото сте заявили нова парола за достъп до вашия акаунт в системата за управление на съдържанието на Disaster Scout.</p>" +

                     "<p><b>Вашата нова парола е: <span style='color:blue;'>" + newGeneratedPassword + "</span></b></p>" +

                     "<p>От съображения за сигурност Ви молим да смените паролата си с ваша собствена, веднага след като се впишете успешно в системата.</p>" +

                     "<span style='color:red;'>Ако не сте заявили нова парола, това означава, че някой друг го е направил вместо вас и в момента паролата Ви е променена." +
                     "<br>В такъв случай, само този, който притежава достъп до имейл адресът Ви може да види новата Ви парола от този имейл." +
                     "<br>Препоръчително е да се свържете незабавно с администратора на систметата ако сте попаднали в такава ситуация.</span>" +

                     "<p>С уважение,<br>системата Disaster Scout.</p>";
             helper.setText(htmlMsg, true);
             javaMailSender.send(mimeMessage);
         } catch (MessagingException e) {
             return false;
         }
         return true;
     }

     public void sendWarningEmail(String userFirstName, String toEmail){
         MimeMessage mimeMessage = javaMailSender.createMimeMessage();
         try {
             MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
             helper.setFrom(emailSender);
             helper.setTo(toEmail);
             helper.setSubject("ВНИМАНИЕ! [Някой се опита да заяви нова парола] ВНИМАНИЕ!");

             String htmlMsg = "<h2>Здравейте "+userFirstName+"!</h2>" +

                     "<span style='color:red;'><b>Получавате този имейл като предупреждение.</b>" +
                     "<br>Някой се е опитал да заяви нова парола за вашия акаунт, докато сте били вписани или докато акаунтът Ви е бил заключен." +
                     "<br>Моля вземете спешни мерки като промените вашия имейл адрес свързан с акаунтът Ви и незабавно се свържете с администратора на системата.</span>" +

                     "<p>С уважение,<br>системата Disaster Scout.</p>";
             helper.setText(htmlMsg, true);
             javaMailSender.send(mimeMessage);
         } catch (MessagingException ignored) {

         }
     }
}
