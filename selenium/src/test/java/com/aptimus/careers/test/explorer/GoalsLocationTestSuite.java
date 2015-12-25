package com.aptimus.careers.test.explorer;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNotEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.dto.jobs.Job.Location;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.explorer.CareerArea;
import com.aptimus.careers.ui.explorer.GoalDetail;
import com.aptimus.careers.ui.explorer.Occupation;
import com.aptimus.careers.ui.explorer.Recommendation;

@Test (groups = { "Explorer" })
public class GoalsLocationTestSuite extends ExplorerTestBase {

    public void settingLocationScenarios () {
        takeInterestSurvey ();
        Location loc = getUserLocation ();
        String location = "%s, %s", programCode = getUserProgramCode ();

        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: if user has no degree program, pick one to show the paragraph
        Occupation job;
        if (!CareerEnvironment.isIronyard) {
            if (recommendation.getProgramName ().isEmpty ()) {
                assertTrue (recommendation.enterKeywords ("Bachelor"));
                // Bachelor Of Science In Accounting - BSACC
                recommendation.useProgramSearchAutocomplete (2);
                programCode = "BSACC";
            }
            assertEquals (recommendation.getLocation (), String.format (location, loc.getCity (), loc.getState ()));

            job = new Occupation ();
            assertTrue (job.clickOccupationTitle ());
            assertTrue (job.isOccupationTitlePresent ());

            assertTrue (recommendation.clickRecommendations ());
            assertTrue (recommendation.isRecommendationsPresent ());
            assertTrue (recommendation.clickTileView ());
            assertTrue (recommendation.scrollDown ());
            verifyRecommendationsData (recommendation.getJobGoals (), programCode);
        }

        // Test: check location on Specific Occupations tab
        job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertEquals (job.getLocation (), String.format (location, loc.getCity (), loc.getState ()));

        // Test: set an occupation to Product Manager
        String title = "Product Manager";
        assertTrue (job.enterJobTitleAutocomplete (title));
        if (CareerEnvironment.isIronyard)
            assertTrue (job.clickTileView ());
        verifySearchOccupation (job.getJobGoals (), title);

        // Test: change location using autocomplete
        loc = new Location ("San Diego", "CA");
        assertTrue (job.enterLocationAutocomplete (String.format (location, loc.getCity (), loc.getState ())));
        assertTrue (job.checkLoadingIcon ());
        assertEquals (job.getLocation (), String.format (location, loc.getCity (), loc.getState ()));
        verifySearchOccupation (job.getJobGoals (), title, getStateAreaId (loc));

        // Test: check location on Career Areas tab
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());
        assertEquals (career.getLocation (), String.format (location, loc.getCity (), loc.getState ()));

        // Test: set career area to Art and Design Workers
        assertTrue (career.clickMainDropdown ());
        career.useMainDropdownMenu (2);
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (1);
        String minorId = career.getMinorFamily ();
        verifySearchCareer (career.getJobGoals (), minorId, getStateAreaId (loc));

        // Test: go to goal detail page
        LaborData testGoal = career.getJobGoal (1);
        assertTrue (career.clickJobTitle (testGoal));
        GoalDetail detail = new GoalDetail ();
        assertTrue (detail.isGoalDetailPresent ());
        LaborData testJobPDX = detail.getGoalDetail ().getLaborData ();

        // Test: go back to Career Areas
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (career.isCareerAreaPresent ());
        assertTrue (career.isTileViewPresent ());

        // Test: enter zipcode instead of city, state
        assertTrue (career.enterLocation ("98005"));
        assertTrue (career.checkLoadingIcon ());
        assertEquals (career.getLocation (), String.format (location, loc.getCity (), loc.getState ()));

        // Test: change location using autocomplete and verify it across
        loc = new Location ("New York", "NY");
        assertTrue (career.enterLocationAutocomplete (String.format (location, loc.getCity (), loc.getState ())));
        assertTrue (career.checkLoadingIcon ());
        assertEquals (career.getLocation (), String.format (location, loc.getCity (), loc.getState ()));
        verifySearchCareer (career.getJobGoals (), minorId, getStateAreaId (loc));

        // Test: go to goal detail page, confirm it's different - ANGCGS-706
        assertTrue (career.clickJobTitle (testGoal));
        assertTrue (detail.checkLoadingIcon ());
        assertTrue (detail.isGoalDetailPresent ());
        LaborData textJobNYC = detail.getGoalDetail ().getLaborData ();
        assertNotEquals (textJobNYC.getSalaryTrendMin (), testJobPDX.getSalaryTrendMin ());
        assertNotEquals (textJobNYC.getSalaryTrendMax (), testJobPDX.getSalaryTrendMax ());

        // Test: go back to Career Areas, click Specific Occupations tab
        assertTrue (detail.clickBackToPreviousPage ());
        assertTrue (career.isCareerAreaPresent ());
        assertTrue (career.isTileViewPresent ());
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.isTileViewPresent ());
        assertEquals (job.getLocation (), String.format (location, loc.getCity (), loc.getState ()));

        // Test: click Our Recommendations tab
        if (!CareerEnvironment.isIronyard) {
            assertTrue (recommendation.clickRecommendations ());
            assertTrue (recommendation.isRecommendationsPresent ());
            assertTrue (recommendation.isTileViewPresent ());
            assertEquals (recommendation.getLocation (), String.format (location, loc.getCity (), loc.getState ()));
        }
    }
}
