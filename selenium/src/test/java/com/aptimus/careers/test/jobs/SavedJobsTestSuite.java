package com.aptimus.careers.test.jobs;

import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.jobs.JobDetail;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.jobs.modules.SavedJobs;

@Test (groups = { "JobSearch" })
public class SavedJobsTestSuite extends JobSearchTestBase {

    public void saveUnsaveJobs () {
        int counter = 0;

        deleteAllSavedJobs ();
        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: on main page, save 2 recommended jobs
        JobSearch search = dashboard.gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isRecommendedTabSelected ());

        // CGS-378
        // if (!CareerEnvironment.isAnonymous) {
        // List <Job> jobs = search.getJobs ();
        // Job testJob1 = jobs.get (0), testJob2 = jobs.get (1);
        // assertTrue (search.saveJob (testJob1));
        // ++counter;
        // assertTrue (search.saveJob (testJob2));
        // ++counter;
        // assertTrue (search.clickSavedTab ());
        // assertTrue (search.isSavedTabSelected ());
        // jobs = search.getJobs ();
        // assertEquals (jobs.size (), counter);
        // verifyJobs (jobs.get (0), testJob2);
        // verifyJobs (jobs.get (1), testJob1);
        // }

        // Test: do a job search and save 1 job
        assertTrue (search.doSearch ("web java developer", ""));
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        Job testJob3 = results.getJob (1);
        assertTrue (results.saveJob (testJob3));

        // Test: checking the count on Saved Jobs module header
        SavedJobs savedModule = new SavedJobs ();
        assertTrue (savedModule.isSavedJobsCount (++counter), "is count=" + counter + " ?");
        verifyModuleJobs (savedModule.getSavedJob (1), testJob3);

        // Test: verify user is able to unsave searched job and count decreases by 1
        assertTrue (results.unsaveJob (testJob3));
        assertTrue (savedModule.isSavedJobsCount (--counter), "is count=" + counter + " ?");
        testJob3 = results.getJob (3);
        assertTrue (results.clickJobTitle (testJob3));

        // Test: save job in job-details page
        JobDetail detail = new JobDetail ();
        assertTrue (detail.saveJob ());
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (savedModule.isSavedJobsCount (++counter), "is count=" + counter + " ?");
        verifyModuleJobs (savedModule.getSavedJob (1), testJob3);

        // Test: click on Saved Jobs module header
        assertTrue (savedModule.clickSavedJobsHeader ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isSavedTabSelected ());
        verifyJobs (search.getJob (1), testJob3);
    }
}
