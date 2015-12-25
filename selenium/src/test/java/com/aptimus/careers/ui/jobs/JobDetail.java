package com.aptimus.careers.ui.jobs;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.dto.jobs.Job.Salary;
import com.aptimus.careers.util.PageHelper.Answer;
import com.aptimus.test.selenium.Logging;

public class JobDetail extends MainJob {

    private final String similarJobs = "div.jobsLikeThisWidget";
    private final String container   = "section.jobsearch-details div.resultsContainer";
    private final String coDetail    = container + " div.companydetails";
    private final String jobDesc     = container + " div.job-details";
    private final String applyBtn    = coDetail + " div.apply-btn[aria-hidden='false'] button";
    private final String modal       = "div.modal-dialog";

    public boolean isJobDetailPresent () {
        boolean status = waitUntilVisible (container);
        status &= waitUntilVisible (coDetail);
        status &= waitUntilVisible (container + " span[ng-bind='::jobsModel.model.details.jobId']");
        status &= waitUntilVisible (jobDesc);
        return status;
    }

    public boolean areAllModulesPresent () {
        String leftCompDetails = coDetail + " div.primary";
        waitForElement (leftCompDetails + " div.company-logo");
        boolean status = waitUntilVisible (leftCompDetails + " div.job-title");
        status &= waitUntilVisible (leftCompDetails + " div.company-title");
        status &= waitUntilVisible (leftCompDetails + " span[ng-bind='::jobsModel.model.details.jobId']");
        waitForElement (leftCompDetails + " h4[ng-show='::jobsModel.model.details.segments']");
        waitForElement (leftCompDetails + " h4[ng-show='::jobsModel.model.details.jobType']");
        String rightCompDetails = coDetail + " div.secondary";
        status &= waitUntilVisible (rightCompDetails + " div.apply-btn");
        status &= waitUntilVisible (rightCompDetails + " job-playlist");
        status &= waitUntilVisible (jobDesc + " div.job-description");
        waitForElement (jobDesc + " div.salary");
        waitForElement (jobDesc + " div.qualifications");
        waitForElement (jobDesc + " div.military");
        return status;
    }

    public boolean isJobTitle (String title) {
        return isTextInElement (coDetail + " div.job-title", title);
    }

    public String getExpiredJobMessage () {
        return getText (container + " div.primary");
    }

    public boolean saveJob () {
        return click (coDetail + " a.savejob") && waitUntilVisible (coDetail + " a.unsavejob");
    }

    public boolean isBtnText (String label) {
        return isTextInElement (applyBtn, label);
    }

    public boolean clickApply () {
        String originalHandle = getDriver ().getWindowHandle ();
        boolean status = click (applyBtn);

        for (String handle : getDriver ().getWindowHandles ()) {
            if (!handle.equals (originalHandle))
                getDriver ().switchTo ().window (handle).close ();
        }
        getDriver ().switchTo ().window (originalHandle);

        return status;
    }

    public boolean isDidYouApplyModalPresent () {
        String form = " div[ng-show='jobApply.model.showDidApplyForm'][aria-hidden='false']";
        boolean status = waitUntilVisible (modal + " header");
        status &= waitUntilVisible (modal + form + " input.did-apply-option[value='yes']");
        status &= waitUntilVisible (modal + form + " input.did-apply-option[value='no']");
        status &= waitUntilVisible (modal + form + " input.did-apply-option[value='missing']");
        return status;
    }

    public boolean applyJob (Answer answer) {
        String form = " div[ng-show='jobApply.model.showDidApplyForm'][aria-hidden='false']";
        boolean status = click (modal + " input.did-apply-option[value='" + answer + "']");
        status &= clickSave ();
        status &= waitForElementInvisible (modal + form);
        return status;
    }

    public boolean clickSave () {
        return click (modal + " button#submit");
    }

    public boolean isApplyErrorPresent (String msg) {
        return isTextInElement (modal + " div.help-block.ng-active", msg);
    }

    public boolean isConfirmationPresent () {
        String form = " div[ng-show='jobApply.model.showConfirmationMessage'][aria-hidden='false'] form[role='dontshow']";
        boolean status = waitUntilVisible (modal + " header.one-col h3[aria-hidden='false']");
        status &= waitUntilVisible (modal + form + " button");
        status &= waitUntilVisible (modal + form + " label.hide-confirmation");
        return status;
    }

    public boolean clickDonotShow () {
        return click (modal + " form[role='dontshow'] label.hide-confirmation");
    }

    public boolean closeConfirmationModule () {
        return click (modal + " form[role='dontshow'] button") && noSuchElementPresent (modal);
    }

    public boolean isSimilarJobsPresent () {
        boolean status = waitUntilVisible (similarJobs);
        status &= waitUntilVisible (similarJobs + " section h3");
        status &= waitUntilVisible (similarJobs + " section div.similar-job-details-wrapper");
        return status;
    }

    public boolean isSimilarJobsHidden () {
        return isElementHidden (similarJobs);
    }

    public List <Job> getSimilarJobs () {
        List <Job> jobs = new ArrayList <Job> ();
        for (WebElement el : waitForElementsVisible (similarJobs + " div.job[id]"))
            jobs.add (parseSimilarJobEl (scrollTo (el)));
        return jobs;
    }

    private Job parseSimilarJobEl (WebElement aJob) {
        Job job = new Job ();
        job.setJobId (aJob.getAttribute ("id"));
        job.setTitle (getText (aJob, "div.jobInfo a[ng-bind='result.job.title']"));
        if (isElementPresent (aJob, "div.jobInfo a[ng-bind='result.job.title']"))
            job.setLinkToDetailsPage (getAttribute (aJob, "div.jobInfo a[ng-bind='result.job.title']", "href"));
        job.setCompanyName (getText (aJob, "div.jobInfo span.company"));

        String[] p = getText (aJob, "div.jobInfo div.location").split (",");
        if (p.length > 0) {
            job.getLocation ().setCity (p[0].trim ());
        }
        if (p.length > 1) {
            job.getLocation ().setState (p[1].trim ());
        }

        String postedDate = getText (aJob, "div.jobInfo div.postedDate");
        job.setPostingDate (parseDisplayedDate (postedDate.replace ("Posted on:", "").trim ()));
        return job;
    }

    public boolean clickJobLikeThis (Job job) {
        return click ("a[data-id='" + job.getJobId () + "']");
    }

    public Job getJob () {
        Job job = new Job ();
        job = getJobHeader (job);
        job = getJobRef (job);
        job = getJobDetail (job);
        return job;
    }

    private Job getJobHeader (Job job) {
        job.setTitle (getText (coDetail + " div.job-title"));
        job.setCompanyName (getText (coDetail + " h4.companyName"));

        String[] location = getText (container + " h4.location").split (",");
        if (location.length > 0) {
            job.getLocation ().setCity (location[0].trim ());
        }
        if (location.length > 1) {
            job.getLocation ().setState (location[1].trim ());
        }
        String postedDt = getText (coDetail + " div.company-title h4:nth-child(3)").replace ("Posted on:", "");
        job.setPostingDate (parseDate (postedDt));

        return job;
    }

    private Job getJobRef (Job job) {
        job.setJobId (getText (container + " span[ng-bind='::jobsModel.model.details.jobId']"));

        if (isElementVisible (container + " div.job-category"))
            job.setCategory (getText (container + " div.job-category"));

        if (isElementVisible (container + " div.employment-type"))
            job.setFullTime (getText (container + " div.employment-type span"));

        job.setPreferredPartner (isElementPresent ("span.icon-preferred-partner[aria-hidden='false']"));
        job.setTuitionReimbursed (isElementPresent ("span.icon-tuition-assistance[aria-hidden='false']"));

        return job;
    }

    private Job getJobDetail (Job job) {
        job.setDescription (getText (jobDesc + " div.job-description > p"));

        if (isElementVisible (jobDesc + " div.salary")) {
            String salary = getText (jobDesc + " div.salary > p");
            if (!salary.contains ("Not Specified")) {
                job.setSalary (new Salary ());
                String[] money = salary.replace ("yearly", "").split ("-");
                job.getSalary ().setMinimum (money[0].trim ().replaceAll ("(\\$|,)", ""));
                if (money.length > 1)
                    job.getSalary ().setMaximum (money[1].trim ().replaceAll ("(\\$|,)", ""));
                else
                    job.getSalary ().setMaximum (money[0].trim ().replaceAll ("(\\$|,)", ""));
            }
        }

        return job;
    }

    private Date parseDate (String date) {
        try {
            return new SimpleDateFormat ("M/dd/yyyy").parse (date);
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return null;
        }
    }

    public boolean isViewMyApplicationStatusLinkPresent () {
        waitForElementsVisible (coDetail + " a[ng-show='jobsModel.model.detailsApplied']");
        return true;
    }

    public boolean clickViewMyApplicationStatus () {
        executeJavascript ("$(\"a[ng-show='jobsModel.model.detailsApplied']\").click()");
        return true;
    }
}
