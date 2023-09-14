package bg.tu_varna.sit.backend.validation.user;

import bg.tu_varna.sit.backend.validation.user.annotation.EmailRegex;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;


class EmailRegexValidationTest {

    private EmailRegexValidation emailRegexValidation;
    private ConstraintValidatorContext constraintValidatorContext;

    @BeforeEach
    void setUp() {
        emailRegexValidation = new EmailRegexValidation();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }

    @Test
    void initialize() {
        EmailRegex constraintAnnotation = mock(EmailRegex.class);
        emailRegexValidation.initialize(constraintAnnotation);
    }

    @Test
    void isValid() {
        assertTrue(emailRegexValidation.isValid("yordanovtodor381@gmail.com", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("natoto02@abv.bg", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("petar-auto.89_02@abv.bg", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("maria__@abv.bg", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("marin111.11@yahoo.com", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("att@abv.bg", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("a11@abv.bg", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("a-.-_@abv.bg", constraintValidatorContext));
        assertTrue(emailRegexValidation.isValid("cheryl.parsons@yahoo.com", constraintValidatorContext));

        assertFalse(emailRegexValidation.isValid("тошко@gmail.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("Ivan@abv.bg", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("_emil9832@gmail.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid(" radoslaв@abv.bg", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid(" ", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example1!@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example2@@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example3#@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example4$@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example5%@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example6^^@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example7&@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example8*@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example9(@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example10)@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example11=@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example12+@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example13~~@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example14         @abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example15[@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example16]@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example17|@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example18''@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example19;@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example20/@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example21,@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example22{@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example23}@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example24:@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example25>@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example26<@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example27?@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example28№@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("example29€@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("a[@#$%^&+=_*~!)(./:;<>?{}|`',-].@abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("viktor@abvcom", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("john.abv.com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("bobabvcom", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("melany abv com", constraintValidatorContext));
        assertFalse(emailRegexValidation.isValid("s206216000@onlineedu.tu-varna.bg", constraintValidatorContext));
    }

}