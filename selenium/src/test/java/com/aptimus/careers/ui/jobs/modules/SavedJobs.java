package com.aptimus.careers.ui.jobs.modules;

import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.ui.jobs.SearchResults;

public class SavedJobs extends SearchResults {

    private final String savedJobs = "div.savedJobsWidget";

    public boolean isSavedJobsPresent () {
        return waitUntilVisible (savedJobs + " h4.savedjob-title > a > span.itemtitle + span.itemcount");
    }

    public String getSavedJobsHeader () {
        return getText (savedJobs + " h4.savedjob-title");
    }

    public boolean clickSavedJobsHeader () {
        return click (savedJobs + " h4.savedjob-title > a");
    }

    public Job getSavedJob (int idx) {
        WebElement e = scrollTo (waitForElementVisible (savedJobs + " div.job.ng-scope:nth-child(" + idx + ")"));
        Job job = new Job ();
        job.setJobId (e.getAttribute ("id"));
        job.setTitle (getText (e, "div.jobInfo div[aria-hidden='false'] div.title"));
        if (isElementPresent (e, " div.jobInfo div[aria-hidden='false'] div.title > a"))
            job.setLinkToDetailsPage (getAttribute (e, " div.jobInfo div[aria-hidden='false'] div.title > a", "href"));

        String[] p = getText (e, " div.jobInfo div[aria-hidden='false'] div.company").split (" - ");
        job.setCompanyName (p[0].trim ());

        String[] loc = p[1].split (",");
        job.getLocation ().setCity (loc[0].trim ());

        if (loc.length > 1)
            job.getLocation ().setState (loc[1].trim ());

        return job;
    }

    public boolean clickSavedJobTitle (Job job) {
        String link = savedJobs + " div.job.ng-scope[id='" + job.getJobId () + "']";
        return click (link + " div[aria-hidden='false'] div.title > a");
    }

    public boolean isSavedJobsCount (int count) {
        scrollTo (waitForElementVisible (savedJobs + " h4.savedjob-title > a"));
        return isTextInElement (savedJobs + " h4.savedjob-title span.itemcount", "( " + count + " )");
    }
}
