package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.AceYourInterview;
import static com.aptimus.careers.dto.milestones.Milestone.DevelopYourGamePlan;
import static com.aptimus.careers.dto.milestones.Milestone.SearchAndApply;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.milestones.Stage;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.plan.MainMilestones;

@Test (groups = { "Milestones" })
public class StrategiesTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = DevelopYourGamePlan.number.replace ("Milestone ", "") + ".";

        MainMilestones strategies = new MainCareer ().gotoMilestone (DevelopYourGamePlan);
        assertTrue (strategies.areAllModulesPresent ());
        assertEquals (strategies.getBreadcrumb (), CareerEnvironment.brand + " > " + DevelopYourGamePlan.number);
        assertEquals (strategies.getHeaderTitle (), "Develop Your Game Plan");
        assertTrue (strategies.getDescription ().length () > 10);

        Stage stage1 = strategies.getStage (DevelopYourGamePlan.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "What hiring managers want");
        assertTrue (stage1.getDescription ().length () > 10, "Learn what hiring managers have...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = strategies.getStage (DevelopYourGamePlan.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Select and prioritize job postings");
        assertTrue (stage2.getDescription ().length () > 10, "Learn how to find the right...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertFalse (stage2.isForTool ());

        Stage stage3 = strategies.getStage (DevelopYourGamePlan.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Apply through an insider");
        assertTrue (stage3.getDescription ().length () > 10, "Get your application to the top...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertFalse (stage3.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones strategies = dashboard.gotoMilestone (DevelopYourGamePlan);
        assertTrue (strategies.isMilestonePresent (DevelopYourGamePlan));
        assertTrue (strategies.isMilestoneHighlighted (DevelopYourGamePlan));
        assertTrue (strategies.isPrevEnabled ());
        assertTrue (strategies.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 9, click Previous Milestone
        assertTrue (strategies.clickNextMilestone ());
        MainMilestones jobsearch = new MainMilestones ();
        assertTrue (jobsearch.isMilestonePresent (SearchAndApply));
        assertTrue (jobsearch.clickPreviousMilestone ());
        assertTrue (strategies.isMilestonePresent (DevelopYourGamePlan));

        // Test: click Previous Milestone, verify we're in Milestone 7, click Next Milestone
        assertTrue (strategies.clickPreviousMilestone ());
        MainMilestones interview = new MainMilestones ();
        assertTrue (interview.isMilestonePresent (AceYourInterview));
        assertTrue (interview.clickNextMilestone ());
        assertTrue (strategies.isMilestonePresent (DevelopYourGamePlan));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = strategies.getStage (DevelopYourGamePlan.stages.get (idx));
        assertTrue (strategies.clickStage (stage1));
        assertTrue (strategies.markAsComplete (stage1));
        assertTrue (strategies.isStageDone (stage1));
        assertTrue (strategies.markStageDone (stage1));
        assertFalse (strategies.isStageDone (stage1));
        assertTrue (strategies.markStageDone (stage1));
        assertTrue (strategies.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < DevelopYourGamePlan.stages.size (); ++i)
            if (i == idx)
                assertTrue (strategies.isStageExpanded (DevelopYourGamePlan.stages.get (i)));
            else
                assertTrue (strategies.isStageCollapsed (DevelopYourGamePlan.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = strategies.getStage (DevelopYourGamePlan.stages.get (++idx));
        assertTrue (strategies.markStageDone (stage2));
        assertTrue (strategies.isStageDone (stage2));

        // Test: marking stage 3 complete, using both Stage check box and Stage details check box.
        Stage stage3 = strategies.getStage (DevelopYourGamePlan.stages.get (++idx));
        assertTrue (strategies.markStageDone (stage3));
        assertTrue (strategies.isStageDone (stage3));
        assertTrue (strategies.isMilestoneDone (stage3));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You now know the best strategies for your job search.";
        assertTrue (strategies.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 9
        assertTrue (strategies.clickContinue ());
        assertTrue (strategies.isMilestonePresent (SearchAndApply));
    }
}
