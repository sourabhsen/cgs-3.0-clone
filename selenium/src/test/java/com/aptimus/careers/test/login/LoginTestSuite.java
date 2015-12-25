package com.aptimus.careers.test.login;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import java.util.List;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.UserProfile.User;
import com.aptimus.careers.test.CareerBaseBrowser;
import com.aptimus.careers.ui.login.Mailinator;
import com.aptimus.careers.ui.login.MainLogin;
import com.aptimus.test.selenium.Logging;

@Test (groups = { "Login" })
public class LoginTestSuite extends CareerBaseBrowser {

    // note: this is only working with mailinator act
    public void forgotPassword () {
        String error = "Sorry, we're currently unable to load the information you're looking for (authentication-service 404).";
        String success = "Keep an eye on your inbox";
        User testUser = new User ("foo@bar", "");

        // Test: with dummy email
        MainLogin login = new MainLogin ().open ();
        assertTrue (login.clickSignInLink ());
        assertTrue (login.clickForgotPassword ());
        assertTrue (login.enterForgotEmail (testUser.getUsername ()));
        assertTrue (login.clickResetPassword ());
        assertTrue (login.isErrorPresent (error));

        // Test: with existing user's email
        testUser = new User ("forgot.password.cgsdemo@mailinator.com", "");
        assertTrue (login.enterForgotEmail (testUser.getUsername ()));
        assertTrue (login.clickResetPassword ());
        assertTrue (login.isSuccessPresent (success));
        assertTrue (login.clickClose ());

        // Test: checking Mailinator for email
        String email = "Forgot Password Email";
        Mailinator mailbox = new Mailinator ();
        List <String> emails = mailbox.getEmailSubjects (testUser.getUsername ());

        int tries = 0;
        while (!emails.contains (email) && tries < 5) {
            wait (10000);
            for (String s : emails)
                Logging.info ("mailinator email=" + s);

            emails = mailbox.getEmailSubjects (testUser.getUsername ());
            ++tries;
        }

        assertTrue (emails.contains (email), "have not receiving forgot password email");
    }

    public void loginAndSignup () {
        User testUser = new User ("forgot.password.cgsdemo@mailinator.com", "Password123");
        MainLogin login = new MainLogin ().open ();

        // Test: sign-in with no info
        assertTrue (login.clickSignInLink ());
        assertTrue (login.clickSignIn ());
        assertEquals (login.getLoginEmailError (), "Your email is required.");
        assertEquals (login.getLoginPassError (), "Your password is required.");

        // Test: bad username
        assertTrue (login.enterLoginEmail ("foobar"));
        assertTrue (login.enterLoginPassword (""));
        assertEquals (login.getLoginEmailError (), "Must be a valid email address.");

        // Test: username only
        assertTrue (login.enterLoginEmail (testUser.getUsername ()));
        assertTrue (login.clickSignIn ());
        assertEquals (login.getLoginPassError (), "Your password is required.");

        // Test: bad password
        assertTrue (login.enterLoginPassword ("bad password"));
        assertTrue (login.clickSignIn ());
        assertEquals (login.getLoginError (), "Invalid Email or Password.");

        // Test: with no info
        assertTrue (login.clickSignUpLink ());
        assertTrue (login.clickSignUp ());
        assertEquals (login.getUsernameError (), "Your email is required.");
        assertEquals (login.getFirstnameError (), "Your first name is required.");
        assertEquals (login.getLastnameError (), "Your last name is required.");
        assertEquals (login.getPasswordError (), "Your password is required.");
        assertEquals (login.getConfirmError (), "This field is required.");

        // Test: username only
        assertTrue (login.enterUsername (testUser.getUsername ()));
        assertTrue (login.clickSignUp ());
        assertEquals (login.getFirstnameError (), "Your first name is required.");
        assertEquals (login.getLastnameError (), "Your last name is required.");
        assertEquals (login.getPasswordError (), "Your password is required.");
        assertEquals (login.getConfirmError (), "This field is required.");

        // Test: enter password
        assertTrue (login.enterPassword (testUser.getPassword ()));
        assertTrue (login.clickSignUp ());
        assertEquals (login.getFirstnameError (), "Your first name is required.");
        assertEquals (login.getLastnameError (), "Your last name is required.");
        assertEquals (login.getConfirmError (), "This field is required.");

        // Test: confirm password
        assertTrue (login.confirmPassword (testUser.getPassword ()));
        assertTrue (login.clickSignUp ());
        assertEquals (login.getFirstnameError (), "Your first name is required.");
        assertEquals (login.getLastnameError (), "Your last name is required.");

        // Test: enter first name
        assertTrue (login.enterFirstname ("Forgot"));
        assertTrue (login.clickSignUp ());
        assertEquals (login.getLastnameError (), "Your last name is required.");

        // Test: enter last name
        assertTrue (login.enterLastname ("Test"));
        assertTrue (login.clickSignUp ());
        assertEquals (login.getUsernameError (), "Username already exists. Please try another or Sign In.");
    }
}
