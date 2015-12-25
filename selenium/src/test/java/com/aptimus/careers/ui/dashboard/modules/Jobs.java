package com.aptimus.careers.ui.dashboard.modules;

import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.ui.dashboard.MainDashboard;

public class Jobs extends MainDashboard {

    private final String jobs = myJobs + " jobs-dashboard";

    public boolean isMyJobsPresent () {
        return waitUntilVisible (jobs + " div.resultsContent");
    }

    public String getModuleHeader () {
        return getText (jobs + " h3[ng-if='jobsDashboardModel.isWidget']");
    }

    public boolean isRecommendedTabSelected () {
        return isElementPresent (jobs + " li.active tab-heading[aria-label='Recommended Jobs']");
    }

    public String getNoGoalsText () {
        return getText (jobs + " div.noJobs");
    }

    public boolean clickSeeMore () {
        return click (By.linkText ("See More"));
    }

    public List <Job> getFeaturedJobs () {
        String featuredJobs = jobs + " div.inner > div.my-jobs";
        List <Job> jobs = new ArrayList <Job> ();
        for (WebElement el : waitForElementsVisible (featuredJobs))
            jobs.add (parseJobEl (scrollTo (el)));
        return jobs;
    }

    private Job parseJobEl (WebElement aJob) {
        Job job = new Job ();
        job.setJobId (aJob.getAttribute ("data-id"));
        job.setTitle (getText (aJob, "h5"));
        String[] p = getText (aJob, "p").split (" - ");
        job.setCompanyName (p[0].trim ());

        String[] loc = p[1].split (",");
        job.getLocation ().setCity (loc[0].trim ());

        if (loc.length > 1)
            job.getLocation ().setState (loc[1].trim ());

        return job;
    }
}
