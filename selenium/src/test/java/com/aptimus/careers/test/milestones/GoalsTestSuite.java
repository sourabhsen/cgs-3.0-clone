package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.SetYourGoals;
import static com.aptimus.careers.dto.milestones.Milestone.SharpenYourSkills;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.milestones.Stage;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.explorer.Recommendation;
import com.aptimus.careers.ui.plan.MainMilestones;

@Test (groups = { "Milestones" })
public class GoalsTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = SetYourGoals.number.replace ("Milestone ", "") + ".";

        MainMilestones goals = new MainCareer ().gotoMilestone (SetYourGoals);
        assertTrue (goals.areAllModulesPresent ());
        assertEquals (goals.getBreadcrumb (), CareerEnvironment.brand + " > " + SetYourGoals.number);
        assertEquals (goals.getHeaderTitle (), "Set Your Career Goals");
        assertTrue (goals.getDescription ().length () > 10);

        Stage stage1 = goals.getStage (SetYourGoals.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "Chart your career path");
        assertTrue (stage1.getDescription ().length () > 10, "Learn why it's...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = goals.getStage (SetYourGoals.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Set your career goals");
        assertTrue (stage2.getDescription ().length () > 10, "Use the Career Exploration...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertTrue (stage2.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones goals = dashboard.gotoMilestone (SetYourGoals);
        assertTrue (goals.isMilestonePresent (SetYourGoals));
        assertTrue (goals.isMilestoneHighlighted (SetYourGoals));
        assertFalse (goals.isPrevEnabled ());
        assertTrue (goals.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 1.2, click Previous Milestone
        assertTrue (goals.clickNextMilestone ());
        MainMilestones skills = new MainMilestones ();
        assertTrue (skills.isMilestonePresent (SharpenYourSkills));
        assertTrue (skills.clickPreviousMilestone ());
        assertTrue (goals.isMilestonePresent (SetYourGoals));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = goals.getStage (SetYourGoals.stages.get (idx));
        assertTrue (goals.clickStage (stage1));
        assertTrue (goals.markAsComplete (stage1));
        assertTrue (goals.isStageDone (stage1));
        assertTrue (goals.markStageDone (stage1));
        assertFalse (goals.isStageDone (stage1));
        assertTrue (goals.markStageDone (stage1));
        assertTrue (goals.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < SetYourGoals.stages.size (); ++i)
            if (i == idx)
                assertTrue (goals.isStageExpanded (SetYourGoals.stages.get (i)));
            else
                assertTrue (goals.isStageCollapsed (SetYourGoals.stages.get (i)));

        // Test: click on stage detail and click Career Exploration tool
        Stage stage2 = goals.getStage (SetYourGoals.stages.get (++idx));
        assertTrue (goals.clickStage (stage2));
        assertTrue (goals.isToolPresent (stage2));
        assertTrue (goals.clickToolButton (stage2));

        assertTrue (new Recommendation ().isRecommendationsPresent ());
        assertTrue (goals.clickClose ());

        // CGS-701
        assertTrue (goals.clickStage (stage2));

        assertTrue (goals.isMilestonePresent (SetYourGoals));
        assertTrue (goals.markAsComplete (stage2));
        assertTrue (goals.isStageDone (stage2));
        assertTrue (goals.isMilestoneDone (stage2));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < SetYourGoals.stages.size (); ++i)
            if (i == idx)
                assertTrue (goals.isStageExpanded (SetYourGoals.stages.get (i)));
            else
                assertTrue (goals.isStageCollapsed (SetYourGoals.stages.get (i)));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "Congratulations, you set your career goals!";
        assertTrue (goals.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 1.2
        assertTrue (goals.clickContinue ());
        assertTrue (skills.isMilestonePresent (SharpenYourSkills));
    }
}
