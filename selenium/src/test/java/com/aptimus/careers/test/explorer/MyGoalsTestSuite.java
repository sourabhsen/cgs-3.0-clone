package com.aptimus.careers.test.explorer;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import java.util.List;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.explorer.CareerArea;
import com.aptimus.careers.ui.explorer.GoalDetail;
import com.aptimus.careers.ui.explorer.MyGoals;
import com.aptimus.careers.ui.explorer.Occupation;
import com.aptimus.careers.ui.explorer.Recommendation;

@Test (groups = { "Explorer" })
public class MyGoalsTestSuite extends ExplorerTestBase {

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteMyGoals ();
    }

    public void checkAllModules () {
        Recommendation recommendation = new MainDashboard ().gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());
        assertTrue (recommendation.clickMyGoals ());

        // Test: check all modules are present for My Goals
        MyGoals myGoals = new MyGoals ();
        assertTrue (myGoals.areAllModulesPresent ());
        assertEquals (myGoals.getHeading (), "Career Exploration");
        assertTrue (myGoals.getMyGoalsText ().length () > 10);
        assertEquals (myGoals.getPrimaryGoalTitle (), "My Primary Career Goal");
    }

    public void saveUnsaveGoals () {
        deleteMyGoals ();
        takeInterestSurvey ();
        int counter = 0;

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        Recommendation recommendation = dashboard.gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());
        assertTrue (recommendation.isListViewPresent ());
        assertTrue (recommendation.isMyGoalsDisabled ());

        // Test: unset goal, change to list view
        LaborData testJob = recommendation.getJobGoal (2);
        assertTrue (recommendation.setGoal (testJob));
        assertTrue (recommendation.isMyGoalsCount (++counter), "is count=1 ?");
        assertTrue (recommendation.clickTileView ());
        assertTrue (recommendation.removeGoal (testJob));
        assertTrue (recommendation.isMyGoalsCount (--counter), "is count=0 ?");
        assertTrue (recommendation.isMyGoalsDisabled ());

        // Test: focus on Occupation Title, set a goal
        String occupation = "Dietitian / Nutritionist";
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.enterJobTitleAutocomplete (occupation));
        assertTrue (job.isTileViewPresent ());

        LaborData testJob1 = job.getJobGoal (1);
        assertTrue (job.setGoal (testJob1));
        assertTrue (job.isMyGoalsCount (++counter), "is count=1 ?");

        // Test: back to Recommended Goals, still in list view
        assertTrue (recommendation.clickRecommendations ());
        assertTrue (recommendation.isRecommendationsPresent ());
        assertTrue (recommendation.isTileViewPresent ());
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());

        // Test: set another goal, change to list view
        testJob = job.getJobGoal (2);
        assertTrue (job.clickListView ());
        assertTrue (job.setGoal (testJob));
        assertTrue (job.isMyGoalsCount (++counter), "is count=2 ?");
        assertTrue (job.removeGoal (testJob));
        assertTrue (job.isMyGoalsCount (--counter), "is count=1 ?");

        // Test: focus on Career Areas, set a goal
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.clickMainDropdown ());
        career.useMainDropdownMenu (1);
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (2);
        assertTrue (career.isListViewPresent ());
        String majorTitle = career.getMajorTitle ();
        String minorTitle = career.getMinorTitle ();

        LaborData testJob2 = career.getJobGoal (1);
        assertTrue (career.setGoal (testJob2));
        assertTrue (career.isMyGoalsCount (++counter), "is count=2 ?");

        // Test: back to Occupation Title, still in list view
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isListViewPresent ());
        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());

        // Test: set another goal, change to list view
        LaborData testJob3 = career.getJobGoal (2);
        assertTrue (career.clickTileView ());
        assertTrue (career.setGoal (testJob3));
        assertTrue (career.isMyGoalsCount (++counter), "is count=3 ?");

        // Test: click on My Goals button
        assertTrue (career.clickMyGoals ());
        MyGoals myGoals = new MyGoals ();
        assertTrue (myGoals.isGoalsListPresent ());
        verifyLabordataAcrossPages (testJob1, myGoals.getMyGoal (1)); // first job added is primary
        verifyLabordataAcrossPages (testJob2, myGoals.getMyGoal (2));
        verifyLabordataAcrossPages (testJob3, myGoals.getMyGoal (3));

        // Test: click back button, in tile view
        assertTrue (myGoals.clickBackToPreviousPage ());
        assertTrue (career.isCareerAreaPresent ());
        assertTrue (career.isTileViewPresent ());

        // Test: focus on Occupation Title
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isTileViewPresent ());
        assertTrue (job.removeGoal (testJob1));
        --counter;

        // Test: come back to My Goals page, next job on the list is now primary
        assertTrue (job.clickMyGoals ());
        assertTrue (myGoals.isGoalsListPresent ());
        verifyLabordataAcrossPages (testJob2, myGoals.getMyGoal (1));
        verifyLabordataAcrossPages (testJob3, myGoals.getMyGoal (2));

        // Test: remove all saved goals
        List <LaborData> savedJobs = myGoals.getMyGoals ();
        assertEquals (savedJobs.size (), counter);
        for (int i = savedJobs.size () - 1; i >= 0; --i) {
            assertTrue (myGoals.removeGoal (savedJobs.get (i)));
            --counter;
        }
        assertTrue (myGoals.isNoGoalsTextPresent ("You have no saved goals"));

        // Test: click Update My Goals Button, back to Occupation Title
        assertTrue (myGoals.clickUpdateMyGoals ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isTileViewPresent ());
        assertTrue (job.isMyGoalsCount (counter), "is count=0 ?");
        assertTrue (job.isMyGoalsDisabled ());
        assertEquals (job.getJobTitle (), occupation);

        // Test: focus on Career Areas
        assertTrue (career.clickCareerArea ());
        assertTrue (career.checkLoadingIcon ());
        assertTrue (career.isCareerAreaPresent ());
        assertTrue (career.isTileViewPresent ());
        assertTrue (job.isMyGoalsCount (counter), "is count=0 ?");
        assertTrue (career.isMyGoalsDisabled ());
        assertEquals (career.getMainDropdownText (), majorTitle);
        assertEquals (career.getSubDropdownText (), minorTitle);
    }

    public void clickGoalDetails () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());

        Occupation occupation = new Occupation ();
        assertTrue (occupation.clickOccupationTitle ());
        assertTrue (occupation.isOccupationTitlePresent ());
        assertTrue (occupation.enterJobTitleAutocomplete ("Engineering Manager"));
        assertTrue (occupation.clickTileView ());

        // Test: click on More Details link
        LaborData job = occupation.getJobGoal (1);
        assertTrue (occupation.clickMoreDetails (job));

        // Test: save the goal and click back link
        GoalDetail detail = new GoalDetail ();
        assertTrue (detail.isGoalDetailPresent ());
        assertTrue (detail.areRightModulesPresent ());
        assertTrue (detail.setGoal ());
        assertTrue (detail.clickBackToPreviousPage ());

        // Test: back to main page and verify the count
        assertTrue (occupation.checkLoadingIcon ());
        assertTrue (occupation.isOccupationTitlePresent ());
        assertTrue (occupation.isMyGoalsCount (2));
        assertTrue (occupation.clickMyGoals ());

        MyGoals myGoals = new MyGoals ();
        assertTrue (myGoals.areAllModulesPresent ());
        assertTrue (myGoals.removeGoal (job));
    }
}
