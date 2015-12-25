package com.aptimus.careers.test.jobs;

import static com.aptimus.careers.util.PageHelper.Filter.AcademicProgram;
import static com.aptimus.careers.util.PageHelper.Filter.CareerArea;
import static com.aptimus.careers.util.PageHelper.Filter.Company;
import static com.aptimus.careers.util.PageHelper.Filter.EducationLevel;
import static com.aptimus.careers.util.PageHelper.Filter.ExperienceLevel;
import static com.aptimus.careers.util.PageHelper.Filter.Location;
import static com.aptimus.careers.util.PageHelper.Filter.radius;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotEquals;
import static org.testng.Assert.assertTrue;
import java.util.List;
import org.apache.commons.lang3.text.WordUtils;
import org.testng.SkipException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.Alert;
import com.aptimus.careers.dto.jobs.JobSearchRequest;
import com.aptimus.careers.dto.jobs.JobSearchResult;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.dashboard.modules.Search;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.jobs.modules.EmailAlert;
import com.aptimus.careers.ui.jobs.modules.RefineThisSearch;
import com.aptimus.careers.util.PageHelper;
import com.aptimus.careers.util.TestHelper;

@Test (groups = { "JobSearch" })
public class AlertsTestSuite extends JobSearchTestBase {

    private final String keywords = "Program Manager";
    private final String location = "San Francisco, CA";

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        deleteAllAlerts ();
    }

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteAllAlerts ();
    }

    public void saveAlert () {
        String loc, eduLvl, career;
        String duplicateAlert = "An alert already exits for current search in your account.";
        JobSearchRequest searchRequest = defaultRequest (keywords, location);

        // Test: go to Job-search and do search
        Search searchJobs = new Search ();
        assertTrue (searchJobs.isSearchJobsPresent ());
        assertTrue (searchJobs.doSearch (keywords, location));

        SearchResults uiResults = new SearchResults ();
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.isSearchResultsPresent ());

        // Test: pick the 1st Location on the list
        RefineThisSearch filters = new RefineThisSearch ();
        loc = filters.setFilter (Location, 1);
        searchRequest.setLocationFilter (loc);
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: pick the 1st Education Level on the list
        eduLvl = filters.setFilter (EducationLevel, 1);
        searchRequest.setEduLevelFilter (eduLvl);
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: pick the 1st Career Area on the list
        career = filters.setFilter (CareerArea, 1);
        searchRequest.setIndustry (career);
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: save alert
        EmailAlert alert = new EmailAlert ();
        assertTrue (alert.isSetAlertPresent ());
        assertTrue (alert.clickSetEmailAlert ());

        if (CareerEnvironment.isAnonymous || CareerEnvironment.isKnown)
            assertTrue (PageHelper.getLogin ().doLogin ());

        // Test: check saved alert in "Email Alerts" list
        assertTrue (alert.isAlertsListPresent ());
        assertTrue (alert.isAlertsHeaderContains ("Alerts ( 1 )"), "Email Alerts ( 1 )");

        List <Alert> testAlerts = alert.getAlerts ();
        assertEquals (testAlerts.get (0).getUserNotificationTitle (), keywords + " in " + location);
        verifyAlertsUItoServiceMatch (testAlerts);

        // Test: try to save second alert with same details and check for warning message
        assertTrue (alert.clickSetEmailAlert ());
        assertTrue (alert.isDuplicateAlertWarningExists (duplicateAlert));

        // Test: execute saved alert by clicking alert title
        assertTrue (alert.clickAlert (testAlerts.get (0)));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.isSearchResultsPresent ());
        String result = "results for " + keywords + " In " + WordUtils.capitalizeFully (location);
        assertTrue (uiResults.isSearchResultsHeaderContains (result));

        // Test: check for expanded and collapsed filters
        assertFalse (filters.isFilterExpanded (radius));
        assertTrue (filters.isFilterChecked (Location, loc));
        assertFalse (filters.isFilterExpanded (AcademicProgram));
        assertTrue (filters.isFilterChecked (EducationLevel, eduLvl));
        assertFalse (filters.isFilterExpanded (Company));
        assertTrue (filters.isFilterChecked (CareerArea, career));
        assertFalse (filters.isFilterExpanded (ExperienceLevel));

        // Test: check the UI vs service results
        JobSearchResult searchResult = TestHelper.searchSolr (searchRequest);
        verifyJobsUItoServiceMatch (uiResults.getJobs (), getJobsFromResults (searchResult));

        // Test: uncheck some filters and try to save an alert
        assertTrue (filters.setFilter (EducationLevel, eduLvl));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (alert.clickSetEmailAlert ());
        assertTrue (alert.isDuplicateAlertTitlePresent ());

        String title = "selenium alert";
        assertTrue (alert.enterNewTitle (title));
        assertTrue (alert.pressEnter ());
        assertTrue (alert.isDuplicateAlertTitleHidden ());
        assertTrue (alert.isAlertsHeaderContains ("Alerts ( 2 )"), "Email Alerts ( 2 )");

        testAlerts = alert.getAlerts ();
        assertEquals (testAlerts.size (), 2);
        assertEquals (testAlerts.get (0).getUserNotificationTitle (), title);
        verifyAlertsUItoServiceMatch (testAlerts);
    }

    public void editPauseRestartAndDeleteAlert () {
        if (CareerEnvironment.isAnonymous || CareerEnvironment.isKnown)
            throw new SkipException ("These tests are not for ANONYMOUS/KNOWN user");

        String invalidEmail = "Must be a valid email address.";
        saveAlert (keywords, location);

        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: go to Alerts tab and click on an alert
        JobSearch search = dashboard.gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.clickAlertsTab ());
        assertTrue (search.isAlertsTabSelected ());
        Alert testAlert = search.getAlert (1);
        String alertName = testAlert.getUserNotificationTitle ();
        assertTrue (search.clickAlert (testAlert));

        // Test: we're at job search results page
        SearchResults uiResults = new SearchResults ();
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.isSearchResultsPresent ());
        String result = "results for " + keywords + " In " + WordUtils.capitalizeFully (location);
        assertTrue (uiResults.isSearchResultsHeaderContains (result));

        // Test: edit alert
        EmailAlert alert = new EmailAlert ();
        assertTrue (alert.isSetAlertPresent ());
        assertTrue (alert.isAlertsListPresent ());
        testAlert = alert.getAlert (1);
        assertEquals (testAlert.getUserNotificationTitle (), alertName);
        assertTrue (alert.clickEditAlert (testAlert));

        // Test: update alert name to ""
        assertTrue (alert.setAlertName (""));
        assertTrue (alert.clickSubmit ());
        assertTrue (alert.checkLoadingIcon (testAlert));
        assertEquals (alert.getAlertName (testAlert), testAlert.getUserNotificationTitle ());

        // Test: set alert name to a very long chars (truncated to 50 chars)
        assertTrue (alert.clickEditAlert (testAlert));
        String title = TestHelper.dummyString (51);
        assertTrue (alert.setAlertName (title));
        assertTrue (alert.clickSubmit ());
        assertTrue (alert.checkLoadingIcon (testAlert));
        assertEquals (alert.getAlertName (testAlert), title.substring (0, 50));

        // Test: invalid email address
        assertTrue (alert.clickEditAlert (testAlert));
        String oldEmail = alert.getAlertEmail ();
        assertTrue (alert.changeDefaultEmail ("@mailinator.com"));
        assertTrue (alert.isInvalidEmailPresent (invalidEmail));
        assertTrue (alert.isSaveDisabled ());
        assertTrue (alert.changeDefaultEmail ("foo@mailinator"));
        assertTrue (alert.isInvalidEmailPresent (invalidEmail));
        assertTrue (alert.isSaveDisabled ());

        // Test: change alert title, email and frequency
        String newEmail = "selenium-" + TestHelper.dummyString (10) + "@mailinator.com";
        title = "My job alerts - program manager";
        assertTrue (alert.setAlertName (title));
        assertTrue (alert.changeDefaultEmail (newEmail));
        assertTrue (alert.changeFrequencyType ("weekly"));

        // Test: click and verify
        assertTrue (alert.clickCancel ());
        assertNotEquals (alert.getAlertName (testAlert), title);
        assertTrue (alert.clickEditAlert (testAlert));
        assertEquals (alert.getAlertEmail (), oldEmail);
        assertFalse (alert.isWeeklySelected ());

        // Test: one more try - change alert title, email and frequency
        assertTrue (alert.setAlertName (title));
        assertTrue (alert.changeDefaultEmail (newEmail));
        assertTrue (alert.changeFrequencyType ("weekly"));
        assertTrue (alert.clickOkayAndConfirm ());
        assertEquals (alert.getAlertName (testAlert), title);
        assertTrue (alert.clickEditAlert (testAlert));

        // Test: email address will only changed after user has confirmed it
        assertEquals (alert.getAlertEmail (), oldEmail);
        assertTrue (alert.isWeeklySelected ());
        assertTrue (alert.clickCancel ());
        verifyAlertsUItoServiceMatch (alert.getAlerts ());

        // Test: pause alert and check for restart link
        assertTrue (alert.clickPauseAlert (testAlert));
        verifyAlertsUItoServiceMatch (alert.getAlerts ());

        // Test: restart and check for pause alert link
        assertTrue (alert.clickRestartAlert (testAlert));
        verifyAlertsUItoServiceMatch (alert.getAlerts ());

        // Test: delete alert
        assertTrue (alert.clickDeleteAlert (testAlert));
        assertTrue (alert.clickCancel ());
        assertTrue (alert.clickDeleteAlert (testAlert));
        assertTrue (alert.clickSubmit ());
        assertTrue (alert.isNoResultsMessagePresent ());

        // Test: click Back to previous page
        assertTrue (uiResults.clickBackToPreviousPage ());
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.isAlertsTabSelected ());
        assertEquals (search.getTabDescription (), "You have no job alerts set.");
    }

    public void checkMaxAlerts () {
        if (CareerEnvironment.isAnonymous || CareerEnvironment.isKnown)
            throw new SkipException ("These tests are not for ANONYMOUS/KNOWN user");

        String max = "You reached max number of alerts. Please delete unused saved alerts before creating any new alerts.";

        // Test: create 7 alerts
        createAlerts ();
        Search searchJobs = new Search ();
        assertTrue (searchJobs.isSearchJobsPresent ());
        assertTrue (searchJobs.clickSearch ());

        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());

        // Test: try to save 9th Alert and check for validation message
        EmailAlert alert = new EmailAlert ();
        assertTrue (alert.isSetAlertPresent ());
        assertTrue (alert.isAlertsListPresent ());
        assertTrue (alert.clickSetEmailAlert ());
        assertEquals (alert.getAlertFullmessage (), max);
        assertTrue (alert.isSetAlertDisabled ());

        // Test: click Email Alerts module header
        assertTrue (alert.clickAppliedJobsHeader ());
        JobSearch search = new JobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.isAlertsTabSelected ());

        // Test: delete all alerts
        for (Alert anAlert : search.getAlerts ()) {
            assertTrue (search.clickDeleteAlert (anAlert));
            assertTrue (search.clickSubmit ());
            assertTrue (search.checkAlertLoadingIcon (anAlert));
        }
        assertEquals (search.getTabDescription (), "You have no job alerts set.");
    }
}
