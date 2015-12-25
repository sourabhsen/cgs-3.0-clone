package com.aptimus.careers.ui.jobs;

public class AtsLogin extends MainJob {

    private final String container     = "div.modal-content";
    private final String description   = container + " header";
    private final String loginContent  = container + " form[name='atsLogin']";
    private final String userName      = loginContent + " input[name='username']";
    private final String password      = loginContent + " input[name='password']";
    private final String getUpdatesBtn = loginContent + " button[type='submit']";
    private final String notNow        = loginContent + " a[ng-click='jobApply.model.confirmAndClose()']";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible ("div.apt-busy-fixed-center");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible ("div.apt-busy-fixed-center");
        }

        if (cgBusy) {
            waitForElementInvisible ("div.apt-busy-fixed-center");
            waitForElementInvisible ("div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean isAtsLoginPopUpPresent () {
        boolean status = waitUntilVisible (container);
        status &= waitUntilVisible (description);
        status &= waitUntilVisible (userName);
        status &= waitUntilVisible (password);
        status &= waitUntilVisible (getUpdatesBtn);
        status &= waitUntilVisible (notNow);
        return status;
    }

    public boolean isAtsLoginPopUpHidden () {
        return waitForElementInvisible (container);
    }

    public String getDescription () {
        return getText (description);
    }

    public boolean enterUserName (String username) {
        return setText (userName, username);
    }

    public boolean enterPassword (String pwd) {
        return setText (password, pwd);
    }

    public boolean clickGetUpdates () {
        return click (getUpdatesBtn);
    }

    public boolean isGetUpdatesDisabled () {
        return isElementPresent (getUpdatesBtn + "[aria-disabled='true']");
    }

    public boolean clickNotNow () {
        return click (notNow);
    }

    public String getValidationMessage () {
        return getText (container + " div.alert.alert-danger");
    }
}
