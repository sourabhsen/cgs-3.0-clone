package com.aptimus.careers.test.jobs;

import static com.aptimus.careers.util.PageHelper.ActivityType.applied;
import static com.aptimus.careers.util.PageHelper.ActivityType.apply_clicked;
import static com.aptimus.careers.util.PageHelper.ActivityType.expired_or_does_not_exist;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertNull;
import static org.testng.Assert.assertTrue;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.Activity;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.jobs.AtsLogin;
import com.aptimus.careers.ui.jobs.JobDetail;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.jobs.modules.AppliedJobs;
import com.aptimus.careers.util.PageHelper.Answer;

@Test (groups = { "JobSearch" })
public class AppliedJobsTestSuite extends JobSearchTestBase {

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        setConfirmationMessage (false);
        deleteAllSavedJobs ();
        deleteAllAppliedJobs ();
    }

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        setConfirmationMessage (true);
    }

    public void verifyAutoTrackedJob () {
        int counter = 0;
        String keywords = "apollo education group, inc.";
        String description = "Get automatic updates for this application";
        String invalidCredentials = "Invalid username or password. Please try again.";

        // Test: search job
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.useKeywordAutocomplete (keywords));
        assertTrue (search.enterLocation (""));
        assertTrue (search.clickFindJobs ());

        // Test: saved a job and click job title
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        Job testJob1 = results.getJob (1);
        verifyPreferredPartner (testJob1);
        assertTrue (results.saveJob (testJob1));
        assertTrue (results.clickJobTitle (testJob1));

        // Test: apply for job
        JobDetail detail = new JobDetail ();
        assertTrue (detail.isJobDetailPresent ());
        Job testDetail = detail.getJob ();
        verifyPreferredPartner (testDetail);
        assertTrue (detail.isBtnText ("Apply"));
        assertTrue (detail.clickApply ());
        assertTrue (detail.isDidYouApplyModalPresent ());

        // Test: click Save without making any selections
        assertTrue (detail.clickSave ());
        assertTrue (detail.isApplyErrorPresent ("Please select an option."));

        // Test: select "I applied for the job."
        assertTrue (detail.applyJob (Answer.yes));
        AtsLogin login = new AtsLogin ();
        assertTrue (login.isAtsLoginPopUpPresent ());

        // Test: select "Not now"
        assertTrue (login.clickNotNow ());
        assertTrue (detail.isConfirmationPresent ());
        assertTrue (detail.closeConfirmationModule ());

        // Test: back to search results and check the count on Applied Jobs module header
        assertTrue (detail.isViewMyApplicationStatusLinkPresent ());
        assertTrue (detail.isBtnText ("Applied"));
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        AppliedJobs appliedModule = new AppliedJobs ();
        assertTrue (appliedModule.isAppliedJobsCount (++counter));

        // Test: refresh page when asked for ATS credentials - CAR-4559
        Job testJob2 = results.getJob (2);
        verifyPreferredPartner (testJob2);
        assertTrue (results.clickJobTitle (testJob2));
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isBtnText ("Apply"));
        assertTrue (detail.clickApply ());
        assertTrue (detail.isDidYouApplyModalPresent ());
        assertTrue (detail.applyJob (Answer.yes));

        detail.navigateRefresh ();
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isViewMyApplicationStatusLinkPresent ());
        assertTrue (detail.isBtnText ("Applied"));

        // Test: back to search results and check the count on Applied Jobs module header
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (appliedModule.isAppliedJobsCount (++counter));

        // Test: apply for another job
        Job testJob3 = results.getJob (3);
        verifyPreferredPartner (testJob3);
        assertTrue (results.clickJobTitle (testJob3));
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isBtnText ("Apply"));
        assertTrue (detail.clickApply ());
        assertTrue (detail.isDidYouApplyModalPresent ());

        // Test: select "I applied for the job", enter login credentials and get updates
        assertTrue (detail.applyJob (Answer.yes));
        assertTrue (login.isAtsLoginPopUpPresent ());
        assertEquals (login.getDescription (), description);

        if (CareerEnvironment.isAnonymous)
            assertTrue (login.clickNotNow ());
        else {
        // Test: only username
        assertTrue (login.enterUserName (CareerEnvironment.testUser));
        assertTrue (login.isGetUpdatesDisabled ());

        // Test: with bad password
        assertTrue (login.enterPassword ("badPassword"));
        assertTrue (login.clickGetUpdates ());
        assertEquals (login.getValidationMessage (), invalidCredentials);

        // Test: with valid password
        assertTrue (login.enterPassword (CareerEnvironment.testPassword));
        assertTrue (login.clickGetUpdates ());
        }

        assertTrue (detail.isConfirmationPresent ());
        assertTrue (detail.closeConfirmationModule ());
        assertTrue (detail.isViewMyApplicationStatusLinkPresent ());
        assertTrue (detail.isBtnText ("Applied"));

        // Test: back to search results and check the count on Applied Jobs module header
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (appliedModule.isAppliedJobsCount (++counter));

        // Test: click view my application status and verify jobs
        assertTrue (results.clickViewMyApplicationStatus (testJob3));
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isAppliedTabSelected ());

        Job appliedJob1 = search.getJob (1);
        if (!CareerEnvironment.isAnonymous) {
        assertTrue (appliedJob1.isAutoTracked ());
            assertNull (appliedJob1.getAtsLoginLink ());
        }
        assertEquals (appliedJob1.getAppStatus (), "Applied");
        assertNotNull (appliedJob1.getLinkToDetailsPage ());
        verifyModuleJobs (appliedJob1, testJob3);

        Job appliedJob2 = search.getJob (2);
        assertEquals (appliedJob2.getAppStatus (), "Applied");
        assertNotNull (appliedJob2.getAtsLoginLink ());
        assertNotNull (appliedJob2.getLinkToDetailsPage ());
        verifyModuleJobs (appliedJob2, testJob2);

        // Test: verify one more job that has "Log in to get your automated application status."
        Job appliedJob3 = search.getJob (3);
        assertEquals (appliedJob3.getAppStatus (), "Applied");
        assertNotNull (appliedJob3.getAtsLoginLink ());
        assertNotNull (appliedJob3.getLinkToDetailsPage ());
        verifyModuleJobs (appliedJob3, testJob1);

        if (!CareerEnvironment.isAnonymous) {
            // Test: pick a job, enter login credentials and get updates
        assertTrue (search.clickLoginToGetUpdates (appliedJob3));
        assertTrue (login.enterUserName (CareerEnvironment.testUser));
        assertTrue (login.enterPassword (CareerEnvironment.testPassword));
        assertTrue (login.clickGetUpdates ());
        assertTrue (login.isAtsLoginPopUpHidden ());
        assertTrue (search.checkLoadingIcon ());

            // Test: this job will appear on top of the list
            appliedJob1 = search.getJob (1);
            assertEquals (appliedJob1.getJobId (), appliedJob3.getJobId ());
            assertEquals (appliedJob1.getAppStatus (), "Applied");
            assertNull (appliedJob1.getAtsLoginLink ());
        }

        // Test: go to job detail page and click view my application status
        assertTrue (search.clickJobTitle (appliedJob1));
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.clickViewMyApplicationStatus ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isAppliedTabSelected ());

        // Test: click Saved tab and confirm no saved job - CGS-232
        assertTrue (search.clickSavedTab ());
        assertTrue (search.isSavedTabSelected ());
        assertEquals (search.getTabDescription (), "You have not saved any jobs.");
    }

    public void verifyManualJob () {
        String keywords = "Microsoft Corporation";

        // Test: search job
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.useKeywordAutocomplete (keywords));
        assertTrue (search.enterLocation (""));
        assertTrue (search.clickFindJobs ());

        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());

        // Test: pick a job, check for Preferred Partner and Tuition Reimbursed
        Job testJob = results.getJob (3);
        verifyPreferredPartner (testJob);
        String jobTitle = testJob.getTitle ();
        assertTrue (results.saveJob (testJob));
        assertTrue (results.clickJobTitle (testJob));
        deleteAllJobActivities (testJob.getJobId ());

        // Test: click Apply and select "I didn't apply for the job"
        JobDetail detail = new JobDetail ();
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.isBtnText ("Apply"));
        assertTrue (detail.isJobTitle (jobTitle));

        List <Activity> clicks = new ArrayList <Activity> ();
        clicks.add (applyJob (testJob, apply_clicked));
        assertTrue (detail.clickApply ());
        assertTrue (detail.isDidYouApplyModalPresent ());
        assertTrue (detail.applyJob (Answer.no));
        assertTrue (detail.isBtnText ("Apply"));
        verifyJobActivity (clicks);

        // Test: click Apply and select "This job doesn't exist or no longer available"
        clicks.add (applyJob (testJob, apply_clicked));
        assertTrue (detail.clickApply ());
        assertTrue (detail.isDidYouApplyModalPresent ());
        assertTrue (detail.applyJob (Answer.missing));
        assertTrue (detail.isBtnText ("Apply"));
        verifyJobActivity (clicks);
        verifyJobActivity (Arrays.asList (applyJob (testJob, expired_or_does_not_exist)));

        // Test: click Apply and select "I applied for the job"
        clicks.add (applyJob (testJob, apply_clicked));
        assertTrue (detail.clickApply ());
        assertTrue (detail.isDidYouApplyModalPresent ());
        assertTrue (detail.applyJob (Answer.yes));
        assertTrue (detail.isConfirmationPresent ());
        assertTrue (detail.clickDonotShow ());
        assertTrue (detail.closeConfirmationModule ());
        verifyJobActivity (clicks);
        verifyJobActivity (Arrays.asList (applyJob (testJob, applied)));

        // Test: check "View My Application Status" link present
        assertTrue (detail.isViewMyApplicationStatusLinkPresent ());

        // Test: re-apply a job
        assertTrue (detail.clickApply ());
        assertTrue (detail.isBtnText ("Applied"));

        // Test: go back to results page, check "View My Application Status" link present
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isViewMyApplicationStatusLinkPresent (testJob));

        // Test: checking "Don't show again" feature
        testJob = results.getJob (4);
        assertTrue (results.clickJobTitle (testJob));
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.clickApply ());
        assertTrue (detail.isDidYouApplyModalPresent ());
        assertTrue (detail.applyJob (Answer.yes));
        assertTrue (detail.isViewMyApplicationStatusLinkPresent ());

        // Test: go back to results page, check "View My Application Status" link present
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isViewMyApplicationStatusLinkPresent (testJob));

        // Test: check the count on Applied Jobs module header
        AppliedJobs appliedModule = new AppliedJobs ();
        assertTrue (appliedModule.isAppliedJobsCount (2));
        assertTrue (appliedModule.clickAppliedJobsHeader ());

        // Test: we are at Applied tab
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isAppliedTabSelected ());
        testJob = search.getJob (2);
        assertEquals (testJob.getTitle (), jobTitle);
        assertFalse (testJob.isAutoTracked ());
        assertEquals (testJob.getAppStatus (), "Applied");
        assertNotNull (testJob.getLinkToDetailsPage ());

        // Test: click Saved tab and confirm no saved job - CGS-232
        assertTrue (search.clickSavedTab ());
        assertTrue (search.isSavedTabSelected ());
        assertEquals (search.getTabDescription (), "You have not saved any jobs.");
    }
}
