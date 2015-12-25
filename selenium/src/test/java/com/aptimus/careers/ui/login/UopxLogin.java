package com.aptimus.careers.ui.login;

import com.aptimus.careers.dto.UserProfile.User;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.test.selenium.Logging;

public class UopxLogin extends MainLogin implements ILogin {

    private final User defUser = new User (CareerEnvironment.testUser, CareerEnvironment.testPassword);

    public UopxLogin open () {
        navigateTo (CareerEnvironment.baseUrl + "/#/login");
        wait (1000);
        return hasPageLoaded () ? this : null;
    }

    public boolean doLogin () {
        return doLogin (defUser);
    }

    public boolean doLogin (User user) {
        Logging.info ("logging-in");
        boolean status = enterLoginEmail (user.getUsername ());
        status &= enterLoginPassword (user.getPassword ());

        if (!getLoginEmail ().equals (user.getUsername ()))
            status = enterLoginEmail (user.getUsername ());

        if (!getLoginPassword ().equals (user.getPassword ()))
            status = enterLoginPassword (user.getPassword ());

        status &= clickSignIn () && checkLoadingIcon ();
        status &= noSuchElementPresent ("section.login-modal");
        return status;
    }

    public boolean closeLoginWindow () {
        return isElementVisible ("input[name='username']") ? doLogin () : true;
    }
}
