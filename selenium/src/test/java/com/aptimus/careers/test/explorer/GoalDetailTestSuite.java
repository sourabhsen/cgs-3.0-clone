package com.aptimus.careers.test.explorer;

import static com.aptimus.careers.util.PageHelper.Filter.Company;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.dto.explorer.Ronet;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.explorer.CareerArea;
import com.aptimus.careers.ui.explorer.GoalDetail;
import com.aptimus.careers.ui.explorer.MyGoals;
import com.aptimus.careers.ui.explorer.Occupation;
import com.aptimus.careers.ui.explorer.Recommendation;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.jobs.modules.RefineThisSearch;

@Test (groups = { "Explorer" })
public class GoalDetailTestSuite extends ExplorerTestBase {

    public void fromRecommendation () {
        takeInterestSurvey ();

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        Recommendation recommendation = dashboard.gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());
        assertTrue (recommendation.clickTileView ());
        verifyRecommendationsData (recommendation.getJobGoals ());

        // Test: click on "More Details"
        LaborData testJob = recommendation.getJobGoal (1);
        assertTrue (recommendation.clickMoreDetails (testJob));
        GoalDetail detail = new GoalDetail ();
        assertTrue (detail.isGoalDetailPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: click "< Back to previous page" on goal detail page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());
        assertTrue (recommendation.isTileViewPresent ());

        // Test: click on job title and click back link
        testJob = recommendation.getJobGoal (2);
        assertTrue (recommendation.clickJobTitle (testJob));
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalTitle (testJob.getName ()));
        assertTrue (detail.isGoalDetailPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());
    }

    public void fromOccupation () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: click on "More Details"
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());

        // Test: some occupation doesn't have salary or education info
        String title = "Fashion Designer";
        assertTrue (job.enterJobTitleAutocomplete (title));
        LaborData testJob = job.getJobGoal (1);
        assertTrue (job.clickJobTitle (testJob));
        GoalDetail detail = new GoalDetail ();
        assertTrue (detail.isGoalTitle (testJob.getName ()));

        // Test: check all modules are present for Goal Detail
        assertTrue (detail.isGoalDetailPresent ());
        assertEquals (detail.getHeading (), "Career Exploration");
        assertTrue (detail.areLeftModulesPresent ());
        assertEquals (detail.getSkillsHeader (), "Skills Requirements");
        assertTrue (detail.getSkillsText ().length () > 10);
        assertEquals (detail.getExperienceHeader (), "Experience");
        assertTrue (detail.getExperienceText ().length () > 10);
        assertEquals (detail.getEducationHeader (), "Education");
        assertTrue (detail.areRightModulesPresent ());
        assertTrue (detail.getDisclaimerText ().startsWith ("This information provides an overview of"));
        // assertFalse (detail.isVideoPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: click "< Back to previous page" on goal detail page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isListViewPresent ());
        assertEquals (job.getJobTitle (), title);

        // Test: some occupation doesn't have education info
        title = "Maid / Housekeeper";
        assertTrue (job.enterJobTitleAutocomplete (title));
        testJob = job.getJobGoal (1);
        assertTrue (job.clickJobTitle (testJob));
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalTitle (testJob.getName ()));
        assertTrue (detail.isGoalDetailPresent ());
        // assertFalse (detail.isVideoPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: click "< Back to previous page" on goal detail page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isListViewPresent ());
        assertEquals (job.getJobTitle (), title);

        // Test: some occupation doesn't have skills
        title = "Carpet Installer";
        assertTrue (job.enterJobTitleAutocomplete (title));
        testJob = job.getJobGoal (1);
        assertTrue (job.clickJobTitle (testJob));
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalTitle (testJob.getName ()));
        assertTrue (detail.isGoalDetailPresent ());
        // assertFalse (detail.isVideoPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: click "< Back to previous page" on goal detail page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isListViewPresent ());
        assertEquals (job.getJobTitle (), title);

        // Test: some occupation doesn't both skills and education info
        title = "Food Production Worker";
        assertTrue (job.enterJobTitleAutocomplete (title));
        testJob = job.getJobGoal (1);
        assertTrue (job.clickJobTitle (testJob));
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalTitle (testJob.getName ()));
        assertTrue (detail.isGoalDetailPresent ());
        // assertFalse (detail.isVideoPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: click "< Back to previous page" on goal detail page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isListViewPresent ());
        assertTrue (job.clickTileView ());
        assertEquals (job.getJobTitle (), title);
        verifySearchOccupation (job.getJobGoals (), title);

        // Test: click on More Details
        title = "Software Developer / Engineer";
        assertTrue (job.enterJobTitleAutocomplete (title));
        testJob = job.getJobGoal (1);
        assertTrue (job.clickMoreDetails (testJob));
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalTitle (testJob.getName ()));
        assertTrue (detail.isGoalDetailPresent ());
        // assertTrue (detail.isVideoPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: compare job count in exploration vs job-search tool - CAR-5295
        String company = detail.getTopEmployer (1);
        int jobCountInExploration = detail.getTopEmployerJobCount (1);
        assertTrue (detail.clickTopEmployer (1));
        SearchResults results = new SearchResults ();
        assertTrue (results.isSearchResultsPresent ());
        assertEquals (results.getResultsCount (), jobCountInExploration);

        // Test: make sure the company filter is cheched
        RefineThisSearch uiFilters = new RefineThisSearch ();
        assertTrue (uiFilters.isFilterChecked (Company, company));
    }

    public void fromCareerArea () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: click on "More Details"
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.clickMainDropdown ());
        career.useMainDropdownMenu (1);
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (1);
        String minorId = career.getMinorFamily ();
        String majorTitle = career.getMajorTitle ();
        String minorTitle = career.getMinorTitle ();
        assertTrue (career.clickTileView ());
        LaborData testJob = career.getJobGoal (1);
        assertTrue (career.clickMoreDetails (testJob));

        // Test: verify detail page against labormarket service
        GoalDetail detail = new GoalDetail ();
        assertTrue (detail.isGoalDetailPresent ());
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: click "< Back to previous page" on goal detail page
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (career.isTileViewPresent ());
        assertEquals (career.getMainDropdownText (), majorTitle);
        assertEquals (career.getSubDropdownText (), minorTitle);
        verifySearchCareer (career.getJobGoals (), minorId);

        // Test: click on job title
        testJob = career.getJobGoal (3);
        assertTrue (career.clickJobTitle (testJob));
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalDetailPresent ());
        assertTrue (detail.isGoalTitle (testJob.getName ()));
        verifyDetailUItoServiceMatch (detail.getGoalDetail ());

        // Test: compare job count in exploration vs job-search tool - CAR-5295
        int jobCountInExploration = detail.getCurrentJobOpenings ();
        assertTrue (detail.clickCurrentJobOpenings ());
        SearchResults results = new SearchResults ();
        assertTrue (results.isSearchResultsPresent ());
        assertEquals (results.getResultsCount (), jobCountInExploration);

        // Test: click "< Back to previous page"
        assertTrue (results.clickBackToPreviousPage ());
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalDetailPresent ());
        assertTrue (detail.isGoalTitle (testJob.getName ()));
    }

    public void fromMyGoals () {
        deleteMyGoals ();
        takeInterestSurvey ();

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        Recommendation recommendation = dashboard.gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: set a goal and click on flyover My Goals
        LaborData testJob = recommendation.getJobGoal (1);
        assertTrue (recommendation.setGoal (testJob));
        assertTrue (recommendation.clickMyGoals ());

        // Test: while on My Goals page, click on job title and verify
        MyGoals myGoals = new MyGoals ();
        assertTrue (myGoals.checkLoadingIcon ());
        assertTrue (myGoals.isGoalsListPresent ());
        assertTrue (myGoals.clickJobTitle (testJob));

        GoalDetail detail = new GoalDetail ();
        assertTrue (detail.isGoalDetailPresent ());
        Ronet uiJob = detail.getGoalDetail ();
        verifyDetailUItoServiceMatch (uiJob);

        // Test: unset the goal
        assertTrue (detail.removeGoal ());
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (myGoals.isGoalsListPresent ());
        assertTrue (myGoals.isNoGoalsTextPresent ("You have no saved goals"));
    }
}
