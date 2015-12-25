package com.aptimus.careers.test.dashboard;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.dashboard.modules.Goals;
import com.aptimus.careers.ui.explorer.MyGoals;
import com.aptimus.careers.ui.explorer.Recommendation;
import com.aptimus.careers.ui.skills.SkillListContainer;

@Test (groups = { "Dashboard" })
public class GoalsDashboardTestSuite extends DashboardTestBase {

    public void checkWidgetWithNoGoals () {
        deleteMyGoals ();

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        // Test: goals widget has no goals set, verify no saved goals message
        Goals goals = new Goals ();
        assertTrue (goals.isGoalsPresent ());
        assertEquals (goals.getNoGoalsText (), "You have no saved goals.");

        // Test: click Get Started button
        assertTrue (goals.clickGetStartedNow ());
        Recommendation recommendation = new Recommendation ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());
    }

    public void checkWidgetWithGoals () {
        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.isDashboardPresent ());
        dashboard.disableWelcome ();

        // Test: click Goals Header, verify the primary goal title.
        Goals goals = new Goals ();
        assertTrue (goals.isGoalsPresent ());
        LaborData testGoal = goals.getMyGoal ();
        String goalTitle = goals.getGoalTitle (testGoal);
        assertTrue (goals.isGoalPrimary ());
        assertTrue (goals.clickSeeAll ());

        // Test: on My Goals page, verify the goal title matched
        MyGoals myGoals = new MyGoals ();
        assertTrue (myGoals.isGoalsListPresent ());
        assertEquals (goalTitle, myGoals.getJobTitle (myGoals.getMyGoal (1)));

        // Test: click Home, build skill for primary goal
        assertTrue (myGoals.clickClose ());
        assertTrue (dashboard.isDashboardPresent ());
        assertTrue (goals.clickBuildSkill (testGoal));

        // Test: on Skill Builder page, verify the selected goal
        SkillListContainer skills = new SkillListContainer ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertEquals (skills.getSelectedGoal (), goalTitle);

        assertTrue (skills.clickClose ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: click Set a new goal link, verify the Career Exploration page.
        assertTrue (goals.clickNewGoal ());
        Recommendation recommendation = new Recommendation ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());
        assertTrue (recommendation.clickClose ());
        assertTrue (dashboard.isDashboardPresent ());
    }
}
