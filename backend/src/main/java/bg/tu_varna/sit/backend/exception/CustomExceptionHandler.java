package bg.tu_varna.sit.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    //!--------------------
    /*@ExceptionHandler
    public ProblemDetail handleException(BadCredentialsException badCredentialsException){
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, badCredentialsException.getMessage());
    }*/

}
