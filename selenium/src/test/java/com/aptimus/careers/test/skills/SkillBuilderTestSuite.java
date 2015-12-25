package com.aptimus.careers.test.skills;

import static com.aptimus.careers.util.PageHelper.Answer.no;
import static com.aptimus.careers.util.PageHelper.Answer.yes;
import static com.aptimus.careers.util.PageHelper.Rating.Advanced;
import static com.aptimus.careers.util.PageHelper.Rating.Beginner;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import java.util.List;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.JobSearchResult.Result;
import com.aptimus.careers.dto.skill.RSkill;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.skills.MainSkill;
import com.aptimus.careers.ui.skills.SkillListContainer;

@Test (groups = { "SkillBuilder" })
public class SkillBuilderTestSuite extends SkillBuilderTestBase {

    private MainDashboard dashboard;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        deleteMySkills ();
        dashboard = new MainDashboard ();
        dashboard.disableWelcome ();
        dashboard.checkLoadingIcon ();
        dashboard.isDashboardPresent ();
    }

    public void verifyAllModulesPresent () {

        // Test: check all modules are present for Skill Builder
        SkillListContainer skills = dashboard.gotoSkillBuilder ();
        assertTrue (skills.areAllModulesPresent ());
        assertEquals (skills.getHeading (), "Skill Builder");
        assertTrue (skills.getHeadingText ().length () > 10, "looking for some description");
        assertEquals (skills.getCountHeader (), "Showing Top Skills for:");
        assertTrue (skills.isHelperLinkPresent ());
        assertTrue (skills.isEditCareerGoalsPresent ());
    }

    public void selectDifferentGoal () {
        List <Result> goals = setMyGoals ();

        // Test: set skill rating to Basic
        SkillListContainer skills = dashboard.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        RSkill testSkill = skills.getSkill (1);
        testSkill.setUserDeclaredLevel (Beginner.name ());
        assertTrue (skills.setRating (testSkill));

        // Test: set skill rating to Advance
        testSkill = skills.getSkill (2);
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.setRating (testSkill));
        verifySkillsUItoServiceMatch (skills.getSkills (), goals.get (0));

        // Test: change to a diff goal
        Result testGoal = getGoalByName (goals, "Occupational Therapist");
        assertTrue (skills.clickGoalsDropdown ());
        assertTrue (skills.setGoal (testGoal.getName ()));
        assertEquals (skills.getSelectedGoal (), testGoal.getName ());
        verifySkillsUItoServiceMatch (skills.getSkills (), testGoal);

        // Test: error message for goal with no skill
        testGoal = getGoalByName (goals, "Driller / Drill Operator");
        assertTrue (skills.clickGoalsDropdown ());
        assertTrue (skills.setGoal (testGoal.getName ()));
        assertEquals (skills.getSelectedGoal (), testGoal.getName ());
        assertTrue (skills.getNoSkills ());
        String error = "Sorry, we don’t have any data on the skills required for %s.";
        assertTrue (skills.getNoSkillsMessage ().contains (String.format (error, "Driller / Drill Operator")));

        // Test: click on diff goal in skill's important list
        testGoal = getGoalByName (goals, "Healthcare Administrator");
        assertTrue (skills.clickGoalsDropdown ());
        assertTrue (skills.setGoal (testGoal.getName ()));
        assertEquals (skills.getSelectedGoal (), testGoal.getName ());
        for (RSkill skill : skills.getSkills ()) {
            if (!skill.getUserJobCodesThisSkillAppearsIn ().isEmpty ()) {
                assertTrue (skills.toggleListWindow (skill));

                String otherGoal = skill.getUserJobCodesThisSkillAppearsIn ().values ().iterator ().next ();
                for (Result goal : goals)
                    if (goal.getName ().equals (otherGoal))
                        assertTrue (skills.clickAnotherGoal (skill, otherGoal));

                assertEquals (skills.getSelectedGoal (), otherGoal);
                break;
            }
        }
        deleteMyGoals ();
    }

    public void flagSkillDescription () {

        // Test: flag window close button
        SkillListContainer skills = dashboard.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        RSkill skill1 = skills.getSkill (1);
        assertTrue (skills.toggleListWindow (skill1));
        assertTrue (skills.clickWikiFlag (skill1));
        assertTrue (skills.closeWikiFlagWindow ());

        // Test: flag window no button
        assertTrue (skills.clickWikiFlag (skill1));
        assertTrue (skills.clickWikiFlagIndicator (skill1, no));

        // Test: flag window yes button
        assertTrue (skills.clickWikiFlag (skill1));
        assertTrue (skills.clickWikiFlagIndicator (skill1, yes));
    }

    public void verifySkillBuilderWhenNoGoalsSet () {
        String noGoalsDesc = "It looks like you haven't set your goals yet.";
        deleteMyGoals ();

        MainSkill skills = dashboard.gotoSkillBuilder ();
        assertTrue (skills.getNoGoalsDescription ().contains (noGoalsDesc));
        assertTrue (skills.isSetCareerGoalsPresent ());
        assertFalse (skills.isEditCareerGoalsPresent ());
    }
}
