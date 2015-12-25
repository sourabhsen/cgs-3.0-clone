package com.aptimus.careers.ui.login;

import org.openqa.selenium.By;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.CareerPage;
import com.aptimus.test.selenium.Logging;

public class MainLogin extends CareerPage {

    private final String   login     = "form#loginForm";
    private final String   signup    = "form#regForm";
    private final String   forgotPwd = "form#forgotPasswordForm";
    protected final String loginUser = login + " input#email";
    protected final String loginPass = login + " input#password";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible ("div.apt-busy-inline-replace-small");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible ("div.apt-busy-inline-replace-small");
        }

        if (cgBusy) {
            waitForElementInvisible ("div.apt-busy-inline-replace-small");
            waitForElementInvisible ("div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public MainLogin open () {
        Logging.info ("delete browser cookies");
        deleteCookies ();

        Logging.info ("opening login page");
        navigateTo (CareerEnvironment.dashboard);
        return this;
    }

    public boolean isErrorPresent (String error) {
        return isTextInElement (forgotPwd + " div.error", error);
    }

    public boolean isSuccessPresent (String success) {
        return isTextInElement ("section.login-modal div.alert-success span.ng-scope", success);
    }

    public boolean clickSignInLink () {
        return click ("a[ng-click='controller.login()']");
    }

    public boolean clickSignIn () {
        return click (login + " button#submit");
    }

    public boolean enterLoginEmail (String email) {
        return setText (loginUser, email);
    }

    public String getLoginEmail () {
        return getAttribute (loginUser, "value");
    }

    public String getLoginEmailError () {
        return getText (login + " div[ng-messages='login.loginForm.username.$error']");
    }

    public boolean enterLoginPassword (String password) {
        return setText (loginPass, password);
    }

    public String getLoginPassword () {
        return getAttribute (loginPass, "value");
    }

    public String getLoginPassError () {
        return getText (login + " div[ng-messages='login.loginForm.password.$error']");
    }

    public String getLoginError () {
        return getText (login + " div.alert-danger span.ng-scope");
    }

    public boolean clickForgotPassword () {
        return click (By.partialLinkText ("Forgot Password"));
    }

    public boolean enterForgotEmail (String email) {
        return setText (forgotPwd + " input[name='username']", email);
    }

    public boolean clickResetPassword () {
        return click (forgotPwd + " button[type='submit']");
    }

    public boolean clickClose () {
        boolean status = click (forgotPwd + " button[ng-click='$close()']");
        status &= waitForElementInvisible ("section.login-modal");
        status &= waitUntilVisible ("section#Dashboard-Container");
        return status;
    }

    public boolean clickSignUpLink () {
        return click (By.linkText ("Sign up."));
    }

    public boolean enterUsername (String email) {
        return setText (signup + " input#username", email);
    }

    public String getUsernameError () {
        return getText (signup + " div[ng-messages='register.regForm.username.$error']");
    }

    public boolean enterFirstname (String fname) {
        return setText (signup + " input[name='firstname']", fname);
    }

    public String getFirstnameError () {
        return getText (signup + " div[ng-messages='register.regForm.firstname.$error']");
    }

    public boolean enterLastname (String lname) {
        return setText (signup + " input[name='lastname']", lname);
    }

    public String getLastnameError () {
        return getText (signup + " div[ng-messages='register.regForm.lastname.$error']");
    }

    public boolean enterPassword (String password) {
        return setText (signup + " input#password", password);
    }

    public String getPasswordError () {
        return getText (signup + " div[ng-messages='register.regForm.password.$error']");
    }

    public boolean confirmPassword (String password) {
        return setText (signup + " input#passwordConfirm", password);
    }

    public String getConfirmError () {
        return getText (signup + " div[ng-messages='register.regForm.passwordConfirm.$error']");
    }

    public boolean clickSignUp () {
        return click (signup + " button#submit");
    }
}
