package com.aptimus.careers.ui.jobs;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.jobs.Alert;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.test.selenium.Logging;

public class MainJob extends MainCareer {

    private final String   jobKeyword  = "div#searchField input#searchWords";
    private final String   cityKeyword = "div#searchField input#searchLocation";
    private final String   searchIcon  = "div#searchField button#desktop-submit";
    protected final String popup       = "body.modal-open div.modal div.email-alert-modals";
    protected String       aJob;
    protected String       jobs;
    protected String       anAlert;
    protected String       alerts;

    public boolean areSearchFieldsPresent () {
        boolean status = waitUntilVisible (jobKeyword);
        status &= waitUntilVisible (cityKeyword);
        status &= waitUntilVisible (searchIcon);
        return status;
    }

    public String getJobKeywordLabel () {
        return getAttribute (jobKeyword, "placeholder").trim ();
    }

    public String getCityKeywordLabel () {
        return getAttribute (cityKeyword, "placeholder").trim ();
    }

    public String getCityKeyword () {
        return getAttribute (cityKeyword, "value").trim ();
    }

    public boolean enterKeywords (String term) {
        return setText (jobKeyword, term);
    }

    public boolean enterLocation (String location) {
        return setText (cityKeyword, location);
    }

    public boolean clickFindJobs () {
        return click (searchIcon);
    }

    public boolean isFindJobsIcondisabled () {
        return isElementPresent (searchIcon + "[aria-disabled='true']");
    }

    public boolean doSearch (String keywords, String location) {
        boolean status = enterKeywords (keywords);
        status &= enterLocation (location);
        status &= clickFindJobs ();
        return status;
    }

    public String useKeywordAutocomplete (int idx) {
        String auto = "careers-jobsearch-autocomplete li[role='option']:nth-child(" + idx + ")";
        String jobName = getText (auto);
        return click (auto + " a") ? jobName : null;
    }

    // sometimes the dropdown failed to show, breaking "text" into 2 strings
    public boolean useKeywordAutocomplete (String text) {
        String keyword1 = text.substring (0, 4), keyword2 = text.substring (4, text.length () - 4);
        WebElement el = scrollTo (waitForElementVisible (jobKeyword));
        el.click ();
        el.clear ();
        el.sendKeys (keyword1);

        boolean found = false;
        for (WebElement li : waitForElementsVisible ("careers-jobsearch-autocomplete ul li a")) {
            if (li.getText ().equalsIgnoreCase (text)) {
                found = true;
                li.click ();
                break;
            }
        }

        if (!found) {
            el.sendKeys (keyword2);
            wait (1000);
            for (WebElement li : waitForElementsVisible ("careers-jobsearch-autocomplete ul li a")) {
                if (li.getText ().equalsIgnoreCase (text)) {
                    found = true;
                    li.click ();
                    break;
                }
            }
        }
        return found;
    }

    public boolean useLocationAutocomplete (String location) {
        String loc1 = location.substring (0, 4), loc2 = location.substring (4, location.length () - 4);
        WebElement el = scrollTo (waitForElementVisible (cityKeyword));
        el.click ();
        el.clear ();
        el.sendKeys (loc1);

        boolean found = false;
        for (WebElement li : waitForElementsVisible ("careers-location-autocomplete ul li a")) {
            if (li.getText ().equalsIgnoreCase (location)) {
                found = true;
                li.click ();
                break;
            }
        }

        if (!found) {
            el.sendKeys (loc2);
            wait (1000);
            for (WebElement li : waitForElementsVisible ("careers-location-autocomplete ul li a")) {
                if (li.getText ().equalsIgnoreCase (location)) {
                    found = true;
                    li.click ();
                    break;
                }
            }
        }
        return found;
    }

    public Job getJob (int idx) {
        try {
            return parseJobEl (scrollTo (waitForElementsVisible (jobs).get (idx - 1)));
        } catch (StaleElementReferenceException s) {
            Logging.error ("getJob: " + s.getMessage ());
            return parseJobEl (scrollTo (waitForElementsVisible (jobs).get (idx - 1)));
        }
    }

    public List <Job> getJobs () {
        List <Job> jobList = new ArrayList <Job> ();
        try {
            for (WebElement el : waitForElementsVisible (jobs))
                jobList.add (parseJobEl (scrollTo (el)));
        } catch (StaleElementReferenceException s) {
            Logging.error ("getJobs: " + s.getMessage ());
            jobList = new ArrayList <Job> ();
            for (WebElement el : waitForElementsVisible (jobs))
                jobList.add (parseJobEl (scrollTo (el)));
        }
        return jobList;
    }

    protected Job parseJobEl (WebElement aJob) {
        Job job = new Job ();
        job.setJobId (aJob.getAttribute ("id"));
        job.setTitle (getText (aJob, "div.jobInfo div.title"));
        if (isElementPresent (aJob, "div.jobInfo div.title > a"))
            job.setLinkToDetailsPage (getAttribute (aJob, "div.jobInfo div.title > a", "href"));

        if (isElementPresent (aJob, "div.jobInfo div.jobsearch-company"))
            job.setCompanyName (getText (aJob, "div.jobInfo div.jobsearch-company"));
        else
            job.setCompanyName (getText (aJob, "div.jobInfo div.company"));

        String[] p = getText (aJob, "div.jobInfo div.location").split (",");
        if (p.length > 0) {
            job.getLocation ().setCity (p[0].trim ());
        }
        if (p.length > 1) {
            job.getLocation ().setState (p[1].trim ());
        }

        if (isElementPresent (aJob, "div.jobInfo small.postedDate")) {
            String postedDate = getText (aJob, "div.jobInfo small.postedDate");
            job.setPostingDate (parseDisplayedDate (postedDate.replace ("Posted on:", "").trim ()));
        }

        if (isElementPresent (aJob, "div.jobInfo small.appliedDate")) {
            String appliedDate = getText (aJob, "div.jobInfo small.appliedDate");
            job.setAppliedDate (parseDisplayedDate (appliedDate.replace ("Applied on:", "").trim ()));
        }
        job.setPreferredPartner (isElementPresent (aJob, "span.icon-preferred-partner[aria-hidden='false']"));
        job.setTuitionReimbursed (isElementPresent (aJob, "span.icon-tuition-assistance[aria-hidden='false']"));
        job.setExpired (isElementPresent (aJob, "div.jobInfo span.expiredJob"));

        String auto = "div[ng-show*=\"(job.trackingType === 'AUTO')\"][aria-hidden='false']";
        String manual = "div[ng-show*=\"(job.trackingType === 'MANUAL')\"][aria-hidden='false']";
        if (isElementPresent (aJob, auto)) {
            job.setAutoTracked (true);
            job.setAppStatus (getText (aJob, auto + " span.apply-status"));
        } else if (isElementPresent (aJob, manual)) {
            job.setAutoTracked (false);
            job.setAppStatus (getText (aJob, manual + " span.ui-select-match-text"));
            job.setLinkToAtsLogin (getText (aJob, manual + " a[ng-show*=\"job.atsTracked\"]"));
        }

        return job;
    }

    protected Date parseDisplayedDate (String date) {
        try {
            return new SimpleDateFormat ("MMM d, yyyy").parse (date);
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            throw new RuntimeException (e.getMessage ());
        }
    }

    public boolean clickJobTitle (Job job) {
        return click (String.format (aJob, job.getJobId ()) + " div.title a");
    }

    public boolean clickJobTitle (int idx) {
        return click (jobs + ":nth-child(" + idx + ") div.title a");
    }

    public boolean unsaveJob (Job job) {
        String btn = String.format (aJob, job.getJobId ()) + " a[item-id='" + job.getJobId () + "']";
        return click (btn + ".unsavejob") && waitUntilVisible (btn + ".savejob");
    }

    public boolean saveJob (Job job) {
        String btn = String.format (aJob, job.getJobId ()) + " a[item-id='" + job.getJobId () + "']";
        return click (btn + ".savejob") && waitUntilVisible (btn + ".unsavejob");
    }

    public Alert getAlert (int idx) {
        return parseAlert (scrollTo (waitForElementsVisible (alerts).get (--idx)));
    }

    public List <Alert> getAlerts () {
        List <Alert> alertList = new ArrayList <Alert> ();
        for (WebElement el : waitForElementsVisible (alerts))
            alertList.add (parseAlert (scrollTo (el)));
        return alertList;
    }

    private Alert parseAlert (WebElement aAlert) {
        Alert alert = new Alert ();
        alert.setUserNotificationId (aAlert.getAttribute ("id"));
        alert.setUserNotificationTitle (getText (aAlert, "div.alert-title"));
        alert.setStatus (getAttribute (aAlert, "div[ng-switch='alert.status'] a", "ng-switch-when"));
        return alert;
    }

    public boolean clickAlert (Alert alert) {
        return click (String.format (anAlert, alert.getUserNotificationId ()) + " a.alertTitle");
    }

    public boolean clickDeleteAlert (Alert alert) {
        String delete = " div.alert-actions a[ng-click='alertEditWait = alertsCtrl.deleteAlert(alert); false']";
        boolean status = click (String.format (anAlert, alert.getUserNotificationId ()) + delete);
        status &= isDeleteAlertPopupPresent ();
        return status;
    }

    private boolean isDeleteAlertPopupPresent () {
        String modal = popup + ".delete-alert";
        boolean status = waitUntilVisible (modal + " div.button-container svg.close-button");
        status &= waitUntilVisible (modal + " h3");
        status &= waitUntilVisible (modal + " button[ng-click='$close(true)']");
        status &= waitUntilVisible (modal + " a[ng-click='$close(false)']");
        return status;
    }

    public boolean clickSubmit () {
        return click (popup + " button[ng-click='$close(true)']") && isPopupHidden ();
    }

    protected boolean isPopupHidden () {
        return noSuchElementPresent ("body div.modal div.email-alert-modals");
    }
}
