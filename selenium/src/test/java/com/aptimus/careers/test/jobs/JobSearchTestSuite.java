package com.aptimus.careers.test.jobs;

import static com.aptimus.careers.util.PageHelper.SortBy.Date;
import static com.aptimus.careers.util.PageHelper.SortBy.Relevancy;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.dto.jobs.JobSearchRequest;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.dashboard.modules.Search;
import com.aptimus.careers.ui.jobs.JobDetail;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.jobs.modules.AppliedJobs;
import com.aptimus.careers.ui.jobs.modules.EmailAlert;
import com.aptimus.careers.ui.jobs.modules.RecentSearches;
import com.aptimus.careers.ui.jobs.modules.RefineThisSearch;
import com.aptimus.careers.ui.jobs.modules.SavedJobs;
import com.aptimus.careers.util.PageHelper.Answer;

@Test (groups = { "JobSearch" })
public class JobSearchTestSuite extends JobSearchTestBase {

    public void checkJobSearchFields () {
        deleteAllSavedJobs ();
        deleteAllAppliedJobs ();

        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.areAllModulesPresent ());
        assertEquals (search.getHeading (), "Job Search");
        assertEquals (search.getJobKeywordLabel (), "Job Title, Keywords, or Company Name");
        assertEquals (search.getCityKeywordLabel (), "City, State, or Zip Code");
        assertTrue (search.isRecommendedTabSelected ());
        assertTrue (search.clickAppliedTab ());
        assertTrue (search.isAppliedTabSelected ());
        assertEquals (search.getTabDescription (), "You have not applied to any jobs.");
        assertTrue (search.clickSavedTab ());
        assertTrue (search.isSavedTabSelected ());
        assertEquals (search.getTabDescription (), "You have not saved any jobs.");
    }

    public void checkAllModules () {
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.doSearch ("chief engineer", "Seattle, WA"));

        SearchResults results = new SearchResults ();
        assertTrue (results.areAllModulesPresent ());
        String header = results.getSearchResultsHeader ();
        assertTrue (header.length () > 10, header);

        RefineThisSearch refineModule = new RefineThisSearch ();
        assertTrue (refineModule.isRefineSearchPresent ());
        assertEquals (refineModule.getRefineSearchHeader (), "Refine this search");

        EmailAlert alertModule = new EmailAlert ();
        assertTrue (alertModule.isSetAlertPresent ());

        if (CareerEnvironment.isLoggedin)
            assertTrue (alertModule.isAlertsListPresent ());
        else
            assertTrue (alertModule.isAlertsListHidden ());

        AppliedJobs appliedModule = new AppliedJobs ();
        assertTrue (appliedModule.isAppliedJobsPresent ());
        assertTrue (appliedModule.getAppliedJobsHeader ().contains ("Applied Jobs"));

        SavedJobs savedModule = new SavedJobs ();
        assertTrue (savedModule.isSavedJobsPresent ());
        assertTrue (savedModule.getSavedJobsHeader ().contains ("Saved Jobs"));

        RecentSearches recentModule = new RecentSearches ();
        assertTrue (recentModule.isRecentSearchesPresent ());
        assertTrue (recentModule.getRecentSearchesHeader ().contains ("Recent Searches"));
    }

    public void searchVariousScenarios () {

        // Test: try blank search on the main page
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.enterKeywords (""));
        assertTrue (search.enterLocation (""));
        assertTrue (search.isFindJobsIcondisabled ());

        // Test: negative zip
        String keywords = "development manager";
        String location = "-98198";
        assertTrue (search.doSearch (keywords, location));
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertEquals (results.getSearchResultsHeader (), "No results for " + keywords + " In " + location);
        assertTrue (results.noResultsFound ());
        assertEquals (results.getResultsCount (), 0, "Displayed results count should be zero");

        // Test: multiple spaces between city and state
        keywords = "";
        location = "portland   or";
        assertTrue (results.doSearch (keywords, location));
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isSearchResultsHeaderContains ("results"));
        for (Job uiJob : results.getJobs ()) {
            assertEquals (uiJob.getLocation ().getState (), "Oregon", "Job State does not match.");
        }

        // Test: invalid zipcode
        keywords = "test manager";
        location = "01200";
        assertTrue (results.doSearch (keywords, location));
        assertEquals (results.getSearchResultsHeader (), "No results for " + keywords + " In " + location);
        assertTrue (results.noResultsFound ());
        assertEquals (results.getResultsCount (), 0, "Displayed results count should be zero");

        // Test: zipcode for keywords
        keywords = "98101";
        location = "";
        assertTrue (results.doSearch (keywords, location));
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + keywords));
        assertTrue (results.getJobs ().size () > 0, "UI Job count should not be zero");

        // Test: using zipcode only
        keywords = "";
        location = "98101";
        String expectedState = "Washington";
        assertTrue (results.doSearch (keywords, location));
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isSearchResultsHeaderContains ("results In " + location));
        for (Job uiJob : results.getJobs ())
            assertEquals (uiJob.getLocation ().getState (), expectedState);

        // Test: using state as location
        keywords = "";
        location = "NORTH CAROLINA";
        expectedState = "North Carolina";
        assertTrue (results.doSearch (keywords, location));
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isSearchResultsHeaderContains ("results In " + WordUtils.capitalizeFully (location)));
        for (Job uiJob : results.getJobs ())
            assertEquals (uiJob.getLocation ().getState (), expectedState);

        // Test: another try for blank search on results page
        assertTrue (results.enterKeywords (""));
        assertTrue (results.enterLocation (""));
        assertTrue (results.isFindJobsIcondisabled ());

        // Test: checking Preferred Partner and Tuition Reimbursement icons
        keywords = "Apollo Education Group, Inc.";
        assertTrue (results.useKeywordAutocomplete (keywords));
        assertTrue (results.enterLocation (""));
        assertTrue (results.clickFindJobs ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + keywords));
        for (Job uiJob : results.getJobs ())
            verifyPreferredPartner (uiJob);

        if (!CareerEnvironment.isUopx) {
        // Test: using synonyms configured IT = "Information Technology" - ANGCGS-676
        keywords = "Director of IT";
            assertTrue (results.doSearch (keywords, ""));
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + keywords));
        for (Job uiJob : results.getJobs ())
                assertTrue (uiJob.getTitle ().matches ("(?i:.*Information Technology.*)"),
                            "IT in " + uiJob.getTitle ());
        }
    }

    public void verifyUrlQueryString () {
        String location = "Seattle, WA";
        String location2 = WordUtils.capitalizeFully (location);
        String autoTitle = "Program Manager"; // CAR-4948
        String autoCo = "Microsoft Corporation"; // CAR-4948

        // Test: enter keyword and location and verify URL has keywords=
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.areSearchFieldsPresent ());
        assertTrue (search.doSearch (autoCo, location));

        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + autoCo + " In " + location2));
        assertTrue (getCurrentUrl ().contains ("keywords="), "url should contain keywords=" + autoCo);
        int keywordsCount = results.getResultsCount ();

        // Test: pick company from auto complete with location and verify URL has keywords.company=
        assertTrue (results.useKeywordAutocomplete (autoCo));
        assertTrue (results.clickFindJobs ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + autoCo + " In " + location2));
        assertTrue (getCurrentUrl ().contains ("keywords.company="), "url should contain keywords.company=" + autoCo);
        assertTrue (results.getResultsCount () < keywordsCount, "keywords.company results should be less than keywords");

        // Test: take out location verify URL still has keywords.company=
        assertTrue (results.enterLocation (""));
        assertTrue (results.clickFindJobs ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + autoCo));
        assertTrue (getCurrentUrl ().contains ("keywords.company="), "url should contain keywords.company=" + autoCo);

        // Test: pick title from auto complete with location and verify URL has keywords.title=
        assertTrue (results.useKeywordAutocomplete (autoTitle));
        assertTrue (search.useLocationAutocomplete (location));
        assertTrue (results.clickFindJobs ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + autoTitle + " In " + location2));
        assertTrue (getCurrentUrl ().contains ("keywords.title="), "url should contain keywords.title=" + autoTitle);

        // Test: take out location verify URL still has keywords.title=
        assertTrue (results.enterLocation (""));
        assertTrue (results.clickFindJobs ());
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + autoTitle));
        assertTrue (getCurrentUrl ().contains ("keywords.title="), "url should contain keywords.title=" + autoTitle);
    }

    public void checkCompanyNameAndTitleAndLocationInAllPages () {
        deleteAllAppliedJobs ();
        deleteAllSavedJobs ();
        String keywords = "H&R Block";

        // Test: Search for job
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.enterKeywords (keywords));
        search.useKeywordAutocomplete (1);
        assertTrue (search.enterLocation (""));
        assertTrue (search.clickFindJobs ());

        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        Job expectedJob = results.getJob (1);

        // Test: check company name and job title in saved Jobs module
        assertTrue (results.saveJob (expectedJob));
        SavedJobs savedModule = new SavedJobs ();
        Job testJob = savedModule.getSavedJob (1);
        verifyModuleJobs (testJob, expectedJob);

        // Test: navigate to Saved Jobs Tab check company name and title
        assertTrue (savedModule.clickSavedJobsHeader ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isSavedTabSelected ());

        testJob = search.getJob (1);
        verifyJobs (testJob, expectedJob);

        // Test: navigate to details page and check company name and title
        assertTrue (search.clickJobTitle (testJob));
        JobDetail detail = new JobDetail ();
        assertTrue (detail.isJobDetailPresent ());

        testJob = detail.getJob ();
        verifyJobs (testJob, expectedJob);

        // Test: apply for job
        assertTrue (detail.clickApply ());
        assertTrue (detail.applyJob (Answer.yes));

        if (CareerEnvironment.isAnonymous)
            assertTrue (detail.closeConfirmationModule ());

        assertTrue (detail.isBtnText ("Applied"));
        assertTrue (detail.clickViewMyApplicationStatus ());

        // Test: check company name and title in Applied Jobs page
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.isAppliedTabSelected ());
        testJob = search.getJob (1);
        verifyModuleJobs (testJob, expectedJob);
    }

    public void sortByFeature () {
        String keywords = "java";
        String location = "98101";

        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.areAllModulesPresent ());
        assertTrue (search.doSearch (keywords, location));

        // Test: sort by Date Posted - CAR-4946
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());
        assertTrue (results.setSortBy (Date));

        JobSearchRequest searchRequest = defaultRequest (keywords, location);
        searchRequest.setSortBy (Date.name ());
        List <Job> serviceJobs = getJobsFromSolr (searchRequest);

        List <Job> uiJobs = results.getJobs ();
        assertEquals (uiJobs.size (), serviceJobs.size ());
        assertTrue (results.isSearchResultsHeaderContains ("results for " + keywords + " In " + location));

        Date previousPostingDate = new Date (Long.MAX_VALUE);
        for (Job uiJob : uiJobs) {
            Date postingDate = DateUtils.truncate (uiJob.getPostingDate (), Calendar.DATE);
            assertTrue ( (postingDate.compareTo (previousPostingDate) <= 0),
                        "Jobs were not sorted by Posting Date. Date: " + previousPostingDate + " is not after: " + postingDate);
            previousPostingDate = postingDate;
        }
        verifyJobsUItoServiceMatch (uiJobs, serviceJobs);

        // Test: sort by Relevancy
        searchRequest = defaultRequest (keywords, location);
        searchRequest.setSortBy (Relevancy.name ());
        serviceJobs = getJobsFromSolr (searchRequest);

        assertTrue (results.setSortBy (Relevancy));
        verifyJobsUItoServiceMatch (results.getJobs (), serviceJobs);
    }

    public void verifyRecentSearches () {
        List <Map <String, String>> histories = new ArrayList <Map <String, String>> ();
        Map <String, String> history1 = new HashMap <String, String> ();
        history1.put ("location", "98101");
        history1.put ("keywords", "web");
        histories.add (history1);

        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: go to Job-search and do search
        Search searchJobs = new Search ();
        assertTrue (searchJobs.isSearchJobsPresent ());
        assertTrue (searchJobs.doSearch (history1.get ("keywords"), history1.get ("location")));

        // Test: click Close
        SearchResults results = new SearchResults ();
        assertTrue (results.checkLoadingIcon ());
        assertTrue (results.isSearchResultsPresent ());

        RecentSearches recent = new RecentSearches ();
        assertTrue (recent.isRecentSearchesPresent ());

        verifyRecentSearches (recent.getRecentSearches (), histories);

        // // Test: another try with keywords company
        // assertTrue (search.enterKeywords ("Starbuc"));
        // keywords = search.useKeywordSearchAutocomplete (1);
        // assertTrue (search.enterLocation ("Seattle, WA"));
        // assertTrue (search.clickFindJobs ());
        //
        // // Test: click Close
        // assertTrue (results.isSearchResultsPresent ());
        // assertTrue (dashboard.clickClose ());
        // assertTrue (dashboard.isDashboardPresent ());
        //
        // // Test: bringup Job Search tool
        // search = new MainCareer ().gotoJobSearch ();
        // assertTrue (search.areSearchFieldsPresent ());
        // assertTrue (recent.isRecentSearchesPresent ());
        // JobSearchResult history2 = searchHistory (keywords, "Seattle,WA", "keywords.company");
        // verifyRecentSearches (recent.getRecentSearch (1), history2);
        // verifyRecentSearches (recent.getRecentSearch (2), history1);
        //
        // // Test: click on a search history
        // JobSearchResult test = recent.getRecentSearch (2);
        // assertTrue (recent.clickRecentSearch (test));
        // assertTrue (results.isSearchResultsPresent ());
        // assertEquals (getCurrentUrl ().replaceAll (".*(/job-search)", "/job-search"),
        // test.getSearch (0).get ("href"));
    }
}
