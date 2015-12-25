package com.aptimus.careers.ui.jobs;

import org.openqa.selenium.By;
import com.aptimus.careers.dto.jobs.Alert;
import com.aptimus.careers.dto.jobs.Job;

public class JobSearch extends MainJob {

    private final String tab     = "div.resultsContent > ul.nav-tabs";
    private final String mainTab = "div.resultsContent div.tab-pane.active";

    public JobSearch () {
        aJob = mainTab + " div.job[id='%s']";
        jobs = mainTab + " div.job[id]";
        anAlert = mainTab + " email-alerts-widget div.job[id='%s']";
        alerts = mainTab + " email-alerts-widget div.job[id]";
    }

    public boolean areAllModulesPresent () {
        boolean status = areSearchFieldsPresent ();
        status &= waitUntilVisible (tab + " li.ng-isolate-scope[active='tabs[0].active']");
        status &= waitUntilVisible (tab + " li.ng-isolate-scope[active='tabs[1].active']");
        status &= waitUntilVisible (tab + " li.ng-isolate-scope[active='tabs[2].active']");
        status &= waitUntilVisible (tab + " li.ng-isolate-scope[active='tabs[3].active']");
        return status;
    }

    public boolean isRecommendedTabSelected () {
        return isElementPresent (tab + " li.ng-isolate-scope.active[active='tabs[0].active']");
    }

    public boolean isAppliedTabSelected () {
        return isElementPresent (tab + " li.ng-isolate-scope.active[active='tabs[1].active']");
    }

    public boolean isSavedTabSelected () {
        return isElementPresent (tab + " li.ng-isolate-scope.active[active='tabs[2].active']");
    }

    public boolean isAlertsTabSelected () {
        return isElementPresent (tab + " li.ng-isolate-scope.active[active='tabs[3].active']");
    }

    public String getTabDescription () {
        return getText (mainTab);
    }

    public boolean clickAppliedTab () {
        return click (By.linkText ("Applied"));
    }

    public boolean clickSavedTab () {
        return click (By.linkText ("Saved"));
    }

    public boolean clickAlertsTab () {
        return click (By.linkText ("Alerts"));
    }

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (mainTab + " div.apt-busy-wrapper");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (mainTab + " div.apt-busy-wrapper");
        }

        if (cgBusy) {
            waitForElementInvisible (mainTab + " div.apt-busy-wrapper");
            waitForElementInvisible (mainTab + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean checkAlertLoadingIcon (Alert alert) {
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

    public boolean clickLoginToGetUpdates (Job job) {
        String link = " div[ng-show*=\"(job.trackingType === 'MANUAL')\"][aria-hidden='false'] a[ng-show*=\"job.atsTracked\"]";
        return click (String.format (aJob, job.getJobId ()) + link);
    }

    public boolean clickViewMore () {
        return click (mainTab + " div.moreLink a");
    }

    public boolean isViewMoreLinkHidden () {
        return waitForElementInvisible (mainTab + " div.moreLink a");
    }
}
