package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.PasswordRegex;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class PasswordRegexValidationTest {

    private PasswordRegexValidation passwordRegexValidation;
    private ConstraintValidatorContext constraintValidatorContext;
    @BeforeEach
    void setUp() {
        passwordRegexValidation = new PasswordRegexValidation();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }

    @Test
    void initialize() {
        PasswordRegex constraintAnnotation = mock(PasswordRegex.class);
        passwordRegexValidation.initialize(constraintAnnotation);
    }

    @Test
    void isValid() {
        assertTrue(passwordRegexValidation.isValid("9#$%^&+=_*~!)(./:;<>?{}|`',-aA",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("ppRR0b@1",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("awbfg_!?fA9",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("req_._2314A",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("Birth_date_30.06.2001",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("aB8232323342342-_+=1823exiT",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("rT$@#_'(t)(r)(y)_&.......23231",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("B5968CH_PROob@.na.parola",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("123456789Ad@",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid(".1qAzz^^=",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("+++1Ll--_._--",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("`````````.SITo...1",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("87934242432432??sA",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("p82+-|jWvB|:",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("#VUv7)A<@w)l",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("x=Y/%dAT0.5R",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("M,LxO|(p9Yft",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("?5(gGASy}THb",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("o:8Qql8>t=1k",constraintValidatorContext));
        assertTrue(passwordRegexValidation.isValid("ss&V.6A3G8$9",constraintValidatorContext));

        assertFalse(passwordRegexValidation.isValid(" B5968CH_PROob@.na.parola",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("B5968CH_PROob@.na.parola ",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid(" B5968CH_PROob@.na.parola ",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("9#$%^&+=_*~!)(./:;<>?{}|`',-aAA",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("Qf**d**_')(_)(_.)232Z????????31233213",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("pT$8",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("1923121223123231",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("Това.e.парола1Aa@",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("mSIDi02 13@#$%8765",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("pPlK-54***1`~12©",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid(" ",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("     ._9locK      ",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("Добър ден как сте днес?",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("83123123213_°C_ ",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid("00#AAAAaaaaaa9999999___________",constraintValidatorContext));
        assertFalse(passwordRegexValidation.isValid(null,constraintValidatorContext));
    }
}