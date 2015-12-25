package com.aptimus.careers.test.jobs;

import static com.aptimus.careers.util.PageHelper.ActivityType.Job_Viewed;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNull;
import static org.testng.Assert.assertTrue;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.Activity;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.jobs.JobDetail;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.jobs.modules.AppliedJobs;
import com.aptimus.careers.ui.jobs.modules.SavedJobs;

@Test (groups = { "JobSearch" })
public class JobDetailTestSuite extends JobSearchTestBase {

    public void clickJobTitleFromVariousPlaces () {
        deleteAllAppliedJobs ();
        deleteAllSavedJobs ();
        applyJobs (defaultRequest ("nurse assistant", "98101", "2"));
        saveJobs (defaultRequest ("web developer", "98101", "2"));
        String keywords = "the allstate corporation", baseUrl = CareerEnvironment.baseUrl;

        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        JobSearch search = dashboard.gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isRecommendedTabSelected ());

        JobDetail detail = new JobDetail ();
        Job testJob, jobDetail;

        List <Activity> activities = new ArrayList <Activity> ();
        if (!CareerEnvironment.isAnonymous) {
            // Test: click recommended job title
            testJob = search.getJob (1);
            deleteJobActivities (testJob.getJobId (), Job_Viewed);
            activities.add (viewJob (testJob, "Recommender-RONET", getCurrentUrl (), "1 of 5 on pageNumber 1"));

            // Test: verify job activity
            assertTrue (search.clickJobTitle (testJob));
            assertTrue (detail.areAllModulesPresent ());
            assertEquals (detail.getHeading (), "Job Search");
            verifyJobActivity (activities);

            jobDetail = detail.getJob ();
            verifyJobs (jobDetail, testJob);
            verifyJobDetail (jobDetail, testJob);

            // Test: go back to Job Search page
            assertTrue (detail.clickBackToPreviousPage ());
            assertTrue (search.areAllModulesPresent ());
            assertTrue (search.isRecommendedTabSelected ());
        }

        // Test: click Saved jobs tab
        assertTrue (search.clickSavedTab ());
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.isSavedTabSelected ());

        // Test: click on job title, verify job detail page and activity
        testJob = search.getJob (1);
        deleteJobActivities (testJob.getJobId (), Job_Viewed);
        activities = new ArrayList <Activity> ();
        activities.add (viewJob (testJob, "job-service", baseUrl + "/#/tools/jobsearch", "1 of 2 on pageNumber 1"));

        assertTrue (search.clickJobTitle (testJob));
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isJobTitle (testJob.getTitle ()));
        jobDetail = detail.getJob ();
        verifyJobs (jobDetail, testJob);
        verifyJobDetail (jobDetail, testJob);
        verifyJobActivity (activities);

        // Test: go back to Job Search page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isSavedTabSelected ());

        // Test: click Applied jobs tab
        assertTrue (search.clickAppliedTab ());
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.isAppliedTabSelected ());

        // Test: click on job title, verify job detail page and activity
        testJob = search.getJob (1);
        deleteJobActivities (testJob.getJobId (), Job_Viewed);
        activities = new ArrayList <Activity> ();
        activities.add (viewJob (testJob, "job-service", baseUrl + "/#/tools/jobsearch", "1 of 2 on pageNumber 0"));

        assertTrue (search.clickJobTitle (testJob));
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isJobTitle (testJob.getTitle ()));
        jobDetail = detail.getJob ();
        verifyModuleJobs (jobDetail, testJob);
        verifyJobDetail (jobDetail, testJob);
        verifyJobActivity (activities);

        // Test: go back to Job Search page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (search.areAllModulesPresent ());

        // CGS-696
        // assertTrue (search.isAlertsTabSelected ());
        assertTrue (search.isSavedTabSelected ());

        // Test: search for the allstate corporation
        assertTrue (search.doSearch (keywords, ""));
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());

        testJob = results.getJob (1);
        deleteJobActivities (testJob.getJobId (), Job_Viewed);
        String url = "/#/tools/jobsearch/view/results?location=&pageNumber=0&keywords=" + keywords.replace (" ", "%20");
        activities = new ArrayList <Activity> ();
        activities.add (viewJob (testJob, "job-service", baseUrl + url, "1 of 10 on pageNumber 1"));

        // Test: pick any job, save it and go to detail page, verify job detail page and activity
        assertTrue (results.clickJobTitle (testJob));
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isJobTitle (testJob.getTitle ()));
        jobDetail = detail.getJob ();
        verifyJobs (jobDetail, testJob);
        verifyJobDetail (jobDetail, testJob);
        verifyJobActivity (activities);

        // Test: go back to Search Results page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());

        // Test: click job title from Saved Jobs module
        SavedJobs saved = new SavedJobs ();
        assertTrue (saved.isSavedJobsPresent ());
        testJob = saved.getSavedJob (1);
        assertTrue (saved.clickSavedJobTitle (testJob));
        assertTrue (detail.isJobDetailPresent ());

        // Test: verify job's detail
        jobDetail = detail.getJob ();
        verifyModuleJobs (jobDetail, testJob);
        verifyJobDetail (jobDetail, testJob);

        // Test: go back to Job Search page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());

        // Test: click job title from Applied Jobs module
        AppliedJobs applied = new AppliedJobs ();
        assertTrue (applied.isAppliedJobsPresent ());
        testJob = applied.getAppliedJob (1);
        assertTrue (applied.clickAppliedJobTitle (testJob));
        assertTrue (detail.isJobDetailPresent ());

        // Test: verify job's detail
        jobDetail = detail.getJob ();
        verifyModuleJobs (jobDetail, testJob);
        verifyJobDetail (jobDetail, testJob);
    }

    public void similarJobs () {
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.areSearchFieldsPresent ());
        assertTrue (search.doSearch ("java web developer", "98101"));

        // Test: pick any search results and verify location state matches
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        Job testJob = results.getJob (2);
        assertTrue (results.clickJobTitle (testJob));
        JobDetail detail = new JobDetail ();
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isSimilarJobsPresent ());
        List <Job> jobsLikeThis = detail.getSimilarJobs ();
        verifyJobsUItoServiceMatch (jobsLikeThis, getJobsLikeThis (getJobDetail (testJob)));
        for (int i = 0; i < jobsLikeThis.size (); ++i)
            assertEquals (jobsLikeThis.get (i).getLocation ().getState (), "Washington");
    }

    public void expiredJobMiscellaneousTests () {
        deleteAllAppliedJobs ();
        deleteAllSavedJobs ();
        applyJobs (Arrays.asList (new String[] { "2757613" }));
        saveJobs (Arrays.asList (new String[] { "2757613" }));
        String keywords = "Developer Manager";
        String location = "Portland, OR";

        // Test: click Applied tab
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.clickAppliedTab ());
        assertTrue (search.isAppliedTabSelected ());
        Job testJob = search.getJob (1);
        assertTrue (testJob.getTitle ().contains ("(EXPIRED)"));
        assertNull (testJob.getLinkToDetailsPage ());
        assertTrue (testJob.isExpired ()); // greyed EXPIRED label

        // Test: click Saved tab
        assertTrue (search.clickSavedTab ());
        assertTrue (search.isSavedTabSelected ());
        testJob = search.getJob (1);
        assertTrue (testJob.getTitle ().contains ("(EXPIRED)"));
        assertNull (testJob.getLinkToDetailsPage ());

        // Test: go to Search Results page
        assertTrue (search.doSearch (keywords, location));
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        SavedJobs savedModule = new SavedJobs ();
        assertTrue (savedModule.isSavedJobsPresent ());
        AppliedJobs module = new AppliedJobs ();
        assertTrue (module.isAppliedJobsPresent ());

        // Test: check whether saved job in module has label EXPIRED?
        testJob = savedModule.getSavedJob (1);
        assertTrue (testJob.getTitle ().contains ("(EXPIRED)"));
        assertNull (testJob.getLinkToDetailsPage ());

        // Test: check whether Applied job in module has label EXPIRED?
        testJob = module.getAppliedJob (1);
        assertTrue (testJob.getTitle ().contains ("(EXPIRED)"));
        assertFalse (testJob.isAutoTracked ());
        assertNull (testJob.getLinkToDetailsPage ());

        // Test: check Similar Jobs
        search = new MainCareer ().gotoJobSearch ("/view/details?id=2757613");
        JobDetail detail = new JobDetail ();
        assertTrue (detail.getExpiredJobMessage ().contains ("Sorry, this job has expired."));
        assertTrue (detail.isSimilarJobsHidden ());
    }
}
