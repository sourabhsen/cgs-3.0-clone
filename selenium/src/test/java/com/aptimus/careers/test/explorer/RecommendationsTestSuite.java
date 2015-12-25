package com.aptimus.careers.test.explorer;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNotEquals;
import static org.testng.Assert.assertTrue;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.testng.SkipException;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.dto.survey.Questionnaire;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.explorer.CareerArea;
import com.aptimus.careers.ui.explorer.InterestSurvey;
import com.aptimus.careers.ui.explorer.Occupation;
import com.aptimus.careers.ui.explorer.Recommendation;
import com.aptimus.careers.util.PageHelper.Trait;

@Test (groups = { "Explorer" })
public class RecommendationsTestSuite extends ExplorerTestBase {

    public void checkAllModules () {
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();

        // Test: check all modules are present for Goal Search - Recommendations
        assertTrue (recommendation.areAllModulesPresent ());
        assertTrue (recommendation.isMyGoalsPresent ());
        assertEquals (recommendation.getHeading (), "Career Exploration");
        assertTrue (recommendation.getDescription ().length () > 10, "looking for some description ...");
        assertTrue (recommendation.getMyGoalsLabel ().startsWith ("My Career Goals"));
        assertEquals (recommendation.getRecommendationsLabel (), "Our Recommendations");
        assertTrue (recommendation.getDisclaimerText ().startsWith ("The information on this site is intended"));
    }

    public void changeDegreeProgram () {
        if (CareerEnvironment.isIronyard)
            throw new SkipException ("This test is not for IronYard user");

        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: using autocomplete to change degree program
        String oldProgram = recommendation.getProgramName ();
        assertEquals (oldProgram, getUserDegree ());
        assertTrue (recommendation.enterKeywords ("Bachelor"));

        String newProgram = recommendation.useProgramSearchAutocomplete (2);
        assertNotEquals (newProgram, oldProgram);
        oldProgram = recommendation.getProgramName ();
        assertEquals (oldProgram, newProgram);

        // Test: press enter while the dropdown window still active
        assertTrue (recommendation.enterKeywords ("Associate"));
        assertTrue (recommendation.isDropdownPresent ());
        assertTrue (recommendation.pressEnter ());
        recommendation.wait (500);
        assertTrue (recommendation.pressEnter ());
        newProgram = recommendation.getProgramName ();
        assertNotEquals (newProgram, oldProgram);

        // Test: change degree program with an invalid keyword
        assertTrue (recommendation.enterKeywords ("invalid key word"));
        assertTrue (recommendation.pressEnter ());
        assertEquals (recommendation.getProgramName (), newProgram);
    }

    public void tryingDifferentViews () {
        takeInterestSurvey ();

        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());

        // Test: at Recommendations tab, click on list view icon
        assertTrue (recommendation.isListViewPresent ());
        assertTrue (recommendation.clickTileView ());
        List <LaborData> tileViewJobs = recommendation.getJobGoals ();
        assertTrue (recommendation.clickListView ());
        List <LaborData> listViewJobs = recommendation.getJobGoals ();

        assertEquals (listViewJobs.size (), tileViewJobs.size ());
        for (int i = 0; i < listViewJobs.size (); ++i)
            verifyLabordataAcrossPages (listViewJobs.get (i), tileViewJobs.get (i));

        // Test: switch to Occupation Title tab
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertTrue (job.enterJobTitleAutocomplete ("Nurse Educator"));
        assertTrue (job.isListViewPresent ());
        assertTrue (job.clickTileView ());

        // Test: click on tile view icon
        tileViewJobs = job.getJobGoals ();
        assertTrue (job.clickListView ());
        listViewJobs = job.getJobGoals ();

        assertEquals (listViewJobs.size (), tileViewJobs.size ());
        for (int i = 0; i < listViewJobs.size (); ++i)
            verifyLabordataAcrossPages (listViewJobs.get (i), tileViewJobs.get (i));

        // Test: switch to Career Areas tab
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());
        assertTrue (career.clickMainDropdown ());
        career.useMainDropdownMenu (1);
        assertTrue (career.clickSubDropdown ());
        career.useSubDropdownMenu (1);
        assertTrue (career.isListViewPresent ());
        assertTrue (career.clickTileView ());

        // Test: click on list view icon
        tileViewJobs = career.getJobGoals ();
        assertTrue (career.clickListView ());
        listViewJobs = career.getJobGoals ();

        assertEquals (listViewJobs.size (), tileViewJobs.size ());
        for (int i = 0; i < listViewJobs.size (); ++i)
            verifyLabordataAcrossPages (listViewJobs.get (i), tileViewJobs.get (i));
    }

    public void takingInterestSurvey () {
        resetInterestSurvey ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        Recommendation recommendation = dashboard.gotoCareerExploration ();
        assertTrue (recommendation.isRecommendationsPresent ());
        assertTrue (recommendation.isInterestSurveyPresent ());
        assertTrue (recommendation.clickInterestAssessment ());

        // Test: check all modules are present for Interest Assessment
        InterestSurvey survey = new InterestSurvey ();
        assertTrue (survey.isSurveyPresent ());
        assertEquals (survey.getHeading (), "Interest Assessment");
        assertTrue (survey.getDescription ().length () > 10, "looking for some description ...");

        // Test: take an interest survey
        Questionnaire questions = getInterestSurvey ();
        for (int i = 1; i <= 10; ++i) {
            assertTrue (survey.isPagePresent (i));
            for (int j = 1; j <= 6; ++j) {
                int answer = (j / 2 == 2 ? j % 2 : j / 2);
                assertEquals (survey.getSurveyQuestion (j), questions.getQuestions ( (i - 1) * 6 + j).getItemText ());
                assertTrue (survey.answerSurvey (j, answer));
            }
            assertTrue (survey.clickNext ());
        }

        assertTrue (survey.isSurveyResultPresent ());
        assertTrue (survey.checkLoadingIcon ());
        verifyUserScores (survey.getScales ());

        // Test: re-take Interest Assessment - ANGCGS-490
        assertTrue (survey.clickRetakeAssessment ());
        assertTrue (survey.checkLoadingIcon ());
        assertTrue (survey.isSurveyPresent ());
        for (int i = 1; i <= 10; ++i) {
            assertTrue (survey.isPagePresent (i));
            if (i < 4) {
                for (int j = 1; j <= 6; ++j) {
                    int answer = 4;
                    assertTrue (survey.answerSurvey (j, answer));
                }
            }
            assertTrue (survey.clickNext ());
        }

        assertTrue (survey.isSurveyResultPresent ());
        assertTrue (survey.checkLoadingIcon ());
        verifyUserScores (survey.getScales ());

        // Test: mouse over survey results for description of each traits
        Map <Trait, String> occupationalInterest = new HashMap <Trait, String> ();
        for (Trait trait : Trait.values ())
            occupationalInterest.put (trait, survey.getInterestDesc (trait));
        verifyInterestText (occupationalInterest);
    }
}
