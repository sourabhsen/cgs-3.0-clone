package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.SetYourGoals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.plan.MainMilestones;

@Test (groups = { "Accessibility" })
public class AccessibilityTestSuite extends CareerPlanTestBase {

    public void milestones () {
        MainCareer main = new MainCareer ();
        assertTrue (main.checkLoadingIcon ());

        MainMilestones goals = main.gotoMilestone (SetYourGoals);
        assertTrue (goals.areAllModulesPresent ());
        assertTrue (goals.accessibilityTest ());
        assertTrue (goals.clickNextMilestone ());

        MainMilestones skills = new MainMilestones ();
        assertTrue (skills.areAllModulesPresent ());
        assertTrue (skills.accessibilityTest ());
        assertTrue (skills.clickNextMilestone ());

        MainMilestones resumes = new MainMilestones ();
        assertTrue (resumes.areAllModulesPresent ());
        assertTrue (resumes.accessibilityTest ());
        assertTrue (resumes.clickNextMilestone ());

        MainMilestones image = new MainMilestones ();
        assertTrue (image.areAllModulesPresent ());
        assertTrue (image.accessibilityTest ());
        assertTrue (image.clickNextMilestone ());

        MainMilestones network = new MainMilestones ();
        assertTrue (network.areAllModulesPresent ());
        assertTrue (network.accessibilityTest ());
        assertTrue (network.clickNextMilestone ());

        MainMilestones letter = new MainMilestones ();
        assertTrue (letter.areAllModulesPresent ());
        assertTrue (letter.accessibilityTest ());
        assertTrue (letter.clickNextMilestone ());

        MainMilestones interview = new MainMilestones ();
        assertTrue (interview.areAllModulesPresent ());
        assertTrue (interview.accessibilityTest ());
        assertTrue (interview.clickNextMilestone ());

        MainMilestones strategies = new MainMilestones ();
        assertTrue (strategies.areAllModulesPresent ());
        assertTrue (strategies.accessibilityTest ());
        assertTrue (strategies.clickNextMilestone ());

        MainMilestones jobsearch = new MainMilestones ();
        assertTrue (jobsearch.areAllModulesPresent ());
        assertTrue (jobsearch.accessibilityTest ());
        assertTrue (jobsearch.clickNextMilestone ());

        MainMilestones management = new MainMilestones ();
        assertTrue (management.areAllModulesPresent ());
        assertTrue (management.accessibilityTest ());
    }
}
