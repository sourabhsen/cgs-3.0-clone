package com.aptimus.careers.test.explorer;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.explorer.Occupation;
import com.aptimus.careers.ui.explorer.Recommendation;

@Test (groups = { "Explorer" })
public class OccupationsTestSuite extends ExplorerTestBase {

    public void checkAllModules () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.areAllModulesPresent ());

        // Test: check all modules are present for Goal Search - Occupation Title
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.areAllModulesPresent ());
        assertTrue (job.isMyGoalsPresent ());
        assertEquals (job.getHeading (), "Career Exploration");
        assertTrue (job.getMyGoalsLabel ().startsWith ("My Career Goals"));
        assertEquals (job.getOccupationTitleLabel (), "Specific Occupations");
        assertTrue (job.getTabDescripton ().startsWith ("Enter the name of a specific occupation"));
        assertTrue (job.getDisclaimerText ().startsWith ("The information on this site is intended"));
    }

    public void searchOccupationTitle () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: verify search results for Occupation Title: Elementary School Teacher
        String title = "Elementary School Teacher";
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.enterJobTitleAutocomplete (title));
        assertTrue (job.clickTileView ());
        verifySearchOccupation (job.getJobGoals (), title);

        // Test: testing error msg for job without any data
        title = "Recycling / Sanitation Worker";
        String error = "We're sorry, no results were found for \"%s\". Please search for a different occupation.";
        assertTrue (job.enterJobTitleAutocomplete (title));
        assertEquals (job.getNoJobTitleErrorMessage (), String.format (error, title));

        // Test: testing error msg for ANGCGS-386
        title = "Business Manager";
        error = "We're sorry, no results were found for the occupation you selected. Please search for a different occupation.";
        assertTrue (job.enterJobTitle (title));
        assertEquals (job.getNoJobTitleErrorMessage (), String.format (error, title));
    }

    public void checkMaxGoalMessage () {
        setMyNineGoals ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        Recommendation recommendation = dashboard.gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: adding 10th goal, check count and max goals message
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.enterJobTitleAutocomplete ("Product Manager"));

        LaborData testJob = job.getJobGoal (1);
        assertTrue (job.setGoal (testJob));
        assertTrue (job.isMyGoalsCount (10), "is count=10 ?");

        // Test: add goal button is disabled and mouse over on Add to My Goals button
        testJob = job.getJobGoal (2);
        assertTrue (job.checkAddToMyGoalDisable (testJob));
        String error = "You must remove a Career Goal before adding a new one";
        assertTrue (job.getMaxTooltipMessage (testJob).contains (error));

        // Test: try to add 11th goal
        testJob = job.getJobGoal (4);
        job.clickAddToMyGoal (testJob);
        assertTrue (job.isMyGoalsCount (10), "is count=10 still ?");
        deleteMyGoals ();
    }
}
