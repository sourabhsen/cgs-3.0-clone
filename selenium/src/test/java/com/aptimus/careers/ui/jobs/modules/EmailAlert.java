package com.aptimus.careers.ui.jobs.modules;

import org.openqa.selenium.Keys;
import com.aptimus.careers.dto.jobs.Alert;
import com.aptimus.careers.ui.jobs.SearchResults;

public class EmailAlert extends SearchResults {

    private final String trigger        = "email-alert-trigger";
    private final String alertContainer = "email-alerts-widget";
    private final String alertList      = alertContainer + " h4.widget-title";

    public EmailAlert () {
        anAlert = alertContainer + " div.job[id='%s']";
        alerts = alertContainer + " div.job[id]";
    }

    public boolean isSetAlertPresent () {
        return waitUntilVisible (trigger + " button.alert-btn");
    }

    public boolean isSetAlertDisabled () {
        String btn = getAttribute (trigger + " button.alert-btn", "aria-disabled");
        return Boolean.valueOf (btn);
    }

    public boolean isAlertsListPresent () {
        return waitUntilVisible (alertList);
    }

    public boolean isAlertsListHidden () {
        return noSuchElementPresent (alertList);
    }

    public boolean clickSetEmailAlert () {
        return click (trigger + " button.alert-btn");
    }

    public boolean clickAppliedJobsHeader () {
        return click (alertList + " span.itemtitle");
    }

    public boolean isAlertsHeaderContains (String text) {
        return isTextInElement (alertList, text);
    }

    public boolean clickEditAlert (Alert alert) {
        String edit = " div.alert-actions a[ng-click='alertEditWait = alertsCtrl.editAlert(alert); false']";
        return click (String.format (anAlert, alert.getUserNotificationId ()) + edit) && isEditAlertPopUpPresent ();
    }

    public boolean clickPauseAlert (Alert alert) {
        String pause = " div.alert-actions a[ng-click='alertEditWait = alertsCtrl.pauseAlert(alert); false']";
        boolean status = click (String.format (anAlert, alert.getUserNotificationId ()) + pause);
        status &= noSuchElementPresent (String.format (anAlert, alert.getUserNotificationId ()) + pause);
        status &= waitUntilVisible (String.format (anAlert, alert.getUserNotificationId ()) + " i.fa-bell-slash");
        return status;
    }

    public boolean clickRestartAlert (Alert alert) {
        String restart = " div.alert-actions a[ng-click='alertEditWait = alertsCtrl.restartAlert(alert); false']";
        boolean status = click (String.format (anAlert, alert.getUserNotificationId ()) + restart);
        status &= noSuchElementPresent (String.format (anAlert, alert.getUserNotificationId ()) + restart);
        status &= waitUntilVisible (String.format (anAlert, alert.getUserNotificationId ()) + " i.fa-bell");
        return status;
    }

    public boolean isDuplicateAlertWarningExists (String text) {
        return isTextInElement (trigger + " p.alert-danger", text);
    }

    public boolean isDuplicateAlertTitlePresent () {
        boolean status = waitUntilVisible (trigger + " div.title-changer");
        status &= waitUntilVisible (trigger + " div.title-changer form[ng-submit='alertsCtrl.setAlert(newTitle)']");
        return status;
    }

    public boolean enterNewTitle (String title) {
        return setText (trigger + " form[ng-submit='alertsCtrl.setAlert(newTitle)'] input", title);
    }

    public boolean isDuplicateAlertTitleHidden () {
        return noSuchElementPresent (trigger + " div.title-changer");
    }

    private boolean isEditAlertPopUpPresent () {
        String modal = popup + ".edit-modal";
        boolean status = waitUntilVisible (modal + " div.button-container svg.close-button");
        status &= waitUntilVisible (modal + " h3");
        status &= waitUntilVisible (modal + " input.alertTitle");
        status &= waitUntilVisible (modal + " input[ng-model='alert.attributes.emailAddressUserDefined']");
        status &= waitUntilVisible (modal + " div#edit-radios");
        status &= waitUntilVisible (modal + " button[ng-click='$close(true)']");
        status &= waitUntilVisible (modal + " a[ng-click='$close(false)']");
        return status;
    }

    public boolean setAlertName (String name) {
        return setText (popup + " input.alertTitle", name);
    }

    public String getAlertName (Alert alert) {
        return getText (String.format (anAlert, alert.getUserNotificationId ()) + " div.alert-title");
    }

    public boolean changeDefaultEmail (String email) {
        return setText (popup + " input[ng-model='alert.attributes.emailAddressUserDefined']", email) && pressKey (Keys.TAB);
    }

    public boolean isInvalidEmailPresent (String error) {
        return isTextInElement (popup + " div.help-block.has-error", error);
    }

    public String getAlertEmail () {
        return getAttribute (popup + " input[ng-model='alert.attributes.emailAddressUserDefined']", "placeholder");
    }

    public boolean changeFrequencyType (String frequency) {
        String radio = popup + " div#edit-radios input[value='user-job-search-notification-" + frequency + "']";
        return click (radio + " + span.edit-radio");
    }

    public boolean isWeeklySelected () {
        String radio = popup + " div#edit-radios input[value='user-job-search-notification-weekly']";
        return Boolean.valueOf (getAttribute (radio, "aria-checked"));
    }

    public boolean isSaveDisabled () {
        return !waitForElement (popup + " button[ng-click='$close(true)']").isEnabled ();
    }

    public boolean clickCancel () {
        return click (popup + " a[ng-click='$close(false)']") && isPopupHidden ();
    }

    public boolean clickOkayAndConfirm () {
        boolean status = click (popup + " button[ng-click='$close(true)']");
        status &= isEmailUpdatePopupPresent ();
        status &= click (popup + ".email-confirmation button[ng-click='$close()']") && isPopupHidden ();
        return status;
    }

    public boolean isEmailUpdatePopupPresent () {
        String modal = popup + ".email-confirmation";
        boolean status = waitUntilVisible (modal + " div.button-container svg.close-button");
        status &= waitUntilVisible (modal + " h3");
        status &= waitUntilVisible (modal + " button[ng-click='$close()']");
        return status;
    }

    public boolean isNoResultsMessagePresent () {
        return waitUntilVisible (alertContainer + " div.widget-content div.no-results");
    }

    public String getAlertFullmessage () {
        return getText (trigger + " p.alert-info");
    }

    public boolean checkLoadingIcon (Alert alert) {
        String item = String.format (anAlert, alert.getUserNotificationId ());
        boolean cgBusy = isElementVisible (item + " div.apt-busy-inline-small");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (item + " div.apt-busy-inline-small");
        }

        if (cgBusy) {
            waitForElementInvisible (item + " div.apt-busy-inline-small");
            waitForElementInvisible (item + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }
}
