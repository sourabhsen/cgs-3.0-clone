package com.aptimus.careers.test.explorer;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.explorer.CareerArea;
import com.aptimus.careers.ui.explorer.Occupation;
import com.aptimus.careers.ui.explorer.Recommendation;

@Test (groups = { "Explorer" })
public class CareerAreasTestSuite extends ExplorerTestBase {

    public void checkAllModules () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: check all modules are present for Goal Search - Career Area
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.areAllModulesPresent ());
        assertTrue (career.isMyGoalsPresent ());
        assertEquals (career.getHeading (), "Career Exploration");
        assertTrue (career.getMyGoalsLabel ().startsWith ("My Career Goals"));
        assertEquals (career.getCareerAreaLabel (), "Career Areas");
        assertTrue (career.getTabDescripton ().startsWith ("Choose a broad career area then select a specific"));
        assertTrue (career.getDisclaimerText ().startsWith ("The information on this site is intended"));
    }

    public void searchCareerArea () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: verify search results for
        // Architecture and Engineering Occupations > Architects, Surveyors, and Cartographers
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());
        assertTrue (career.clickMainDropdown ());
        career.useMainDropdownMenu (1);
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (1);
        assertTrue (career.isListViewPresent ());
        assertTrue (career.clickTileView ());
        verifySearchCareer (career.getJobGoals (), career.getMinorFamily ());

        // Test: verify search results for
        // Farming, Fishing, and Forestry Occupations > Fishing and Hunting Workers
        String mainFamily = "Farming, Fishing, and Forestry Occupations";
        String minFamily = "Fishing and Hunting Workers";
        String error = "Sorry, we could not find any labor market data for this search.";

        assertTrue (career.clickMainDropdown ());
        assertEquals (career.selectFromMainDropdown (mainFamily), mainFamily);
        assertTrue (career.clickSubDropdown ());
        assertEquals (career.selectFromSubDropdown (minFamily), minFamily);
        assertEquals (career.getNoGoalsMessage (), error);

        // Test: trying a different minor family
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (3);
        verifySearchCareer (career.getJobGoals (), career.getMinorFamily ());
    }

    public void selectionPersistency () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: testing selection persistency between tabs
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());

        assertTrue (career.clickMainDropdown ());
        career.useMainDropdownMenu (1);
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (1);
        String majorTitle = career.getMajorTitle ();
        String minorTitle = career.getMinorTitle ();

        // Test: click on Occupation Title
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());

        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());
        assertEquals (career.getMainDropdownText (), majorTitle);
        assertEquals (career.getSubDropdownText (), minorTitle);

        // Test: select a different major and minor career
        assertTrue (career.clickMainDropdown ());
        career.useMainDropdownMenu (2);
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (2);
        majorTitle = career.getMajorTitle ();
        minorTitle = career.getMinorTitle ();

        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());

        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());
        assertEquals (career.getMainDropdownText (), majorTitle);
        assertEquals (career.getSubDropdownText (), minorTitle);
    }
}
