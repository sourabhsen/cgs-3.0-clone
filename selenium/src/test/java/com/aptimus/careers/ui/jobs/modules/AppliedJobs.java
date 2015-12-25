package com.aptimus.careers.ui.jobs.modules;

import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.ui.jobs.SearchResults;

public class AppliedJobs extends SearchResults {

    private final String appliedJobs = "div.appliedJobsWidget";

    public boolean isAppliedJobsPresent () {
        return waitUntilVisible (appliedJobs + " h4.appliedjob-title > a > span.itemtitle + span.itemcount");
    }

    public String getAppliedJobsHeader () {
        return getText (appliedJobs + " h4.appliedjob-title");
    }

    public boolean clickAppliedJobsHeader () {
        return click (appliedJobs + " h4.appliedjob-title > a");
    }

    public Job getAppliedJob (int idx) {
        return parseJobEl (scrollTo (waitForElementsVisible (appliedJobs + " div.job.appliedJob[id]").get (idx - 1)));
    }

    public boolean clickAppliedJobTitle (Job job) {
        String link = "div.appliedJobsWidget div.job.ng-scope[id='" + job.getJobId () + "']";
        return click (link + " div.title > a");
    }

    public boolean isAppliedJobsCount (int count) {
        boolean status = scrollTo (waitForElementVisible (appliedJobs + " h4.appliedjob-title > a")).isDisplayed ();
        status &= isTextInElement (appliedJobs + " h4.appliedjob-title span.itemcount", "( " + count + " )");
        return status;
    }
}
