package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.CraftYourImage;
import static com.aptimus.careers.dto.milestones.Milestone.NetworkLikePro;
import static com.aptimus.careers.dto.milestones.Milestone.WriteGreatCoverletter;
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
public class NetworkTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = NetworkLikePro.number.replace ("Milestone ", "") + ".";

        MainMilestones network = new MainCareer ().gotoMilestone (NetworkLikePro);
        assertTrue (network.areAllModulesPresent ());
        assertEquals (network.getBreadcrumb (), CareerEnvironment.brand + " > " + NetworkLikePro.number);
        assertEquals (network.getHeaderTitle (), "Network Like a Pro");
        assertTrue (network.getDescription ().length () > 10);

        Stage stage1 = network.getStage (NetworkLikePro.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "Learn networking basics");
        assertTrue (stage1.getDescription ().length () > 10, "What exactly is networking...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage3 = network.getStage (NetworkLikePro.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Use LinkedIn");
        assertTrue (stage3.getDescription ().length () > 10, "Building a powerful professional...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertFalse (stage3.isForTool ());

        Stage stage5 = network.getStage (NetworkLikePro.stages.get (idx));
        assertEquals (stage5.getStageNumber (), milestone + ++idx);
        assertEquals (stage5.getTitle (), "Join professional organizations");
        assertTrue (stage5.getDescription ().length () > 10, "If you’re new to your field...");
        assertTrue (stage5.getDuration ().length () > 3, "duration=" + stage5.getDuration ());
        assertFalse (stage5.isForTool ());

        Stage stage6 = network.getStage (NetworkLikePro.stages.get (idx));
        assertEquals (stage6.getStageNumber (), milestone + ++idx);
        assertEquals (stage6.getTitle (), "Put yourself out there");
        assertTrue (stage6.getDescription ().length () > 10, "Asking your network for help...");
        assertTrue (stage6.getDuration ().length () > 3, "duration=" + stage6.getDuration ());
        assertFalse (stage6.isForTool ());

        Stage stage7 = network.getStage (NetworkLikePro.stages.get (idx));
        assertEquals (stage7.getStageNumber (), milestone + ++idx);
        assertEquals (stage7.getTitle (), "Create a plan");
        assertTrue (stage7.getDescription ().length () > 10, "Keep yourself on track by...");
        assertTrue (stage7.getDuration ().length () > 3, "duration=" + stage7.getDuration ());
        assertFalse (stage7.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones network = dashboard.gotoMilestone (NetworkLikePro);
        assertTrue (network.isMilestonePresent (NetworkLikePro));
        assertTrue (network.isMilestoneHighlighted (NetworkLikePro));
        assertTrue (network.isPrevEnabled ());
        assertTrue (network.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 6, click Previous Milestone
        assertTrue (network.clickNextMilestone ());
        MainMilestones letter = new MainMilestones ();
        assertTrue (letter.isMilestonePresent (WriteGreatCoverletter));
        assertTrue (letter.clickPreviousMilestone ());
        assertTrue (network.isMilestonePresent (NetworkLikePro));

        // Test: click Previous Milestone, verify we're in Milestone 4, click Next Milestone
        assertTrue (network.clickPreviousMilestone ());
        MainMilestones image = new MainMilestones ();
        assertTrue (image.isMilestonePresent (CraftYourImage));
        assertTrue (image.clickNextMilestone ());
        assertTrue (network.isMilestonePresent (NetworkLikePro));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = network.getStage (NetworkLikePro.stages.get (idx));
        assertTrue (network.clickStage (stage1));
        assertTrue (network.markAsComplete (stage1));
        assertTrue (network.isStageDone (stage1));
        assertTrue (network.markStageDone (stage1));
        assertFalse (network.isStageDone (stage1));
        assertTrue (network.markStageDone (stage1));
        assertTrue (network.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < NetworkLikePro.stages.size (); ++i)
            if (i == idx)
                assertTrue (network.isStageExpanded (NetworkLikePro.stages.get (i)));
            else
                assertTrue (network.isStageCollapsed (NetworkLikePro.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = network.getStage (NetworkLikePro.stages.get (++idx));
        assertTrue (network.markStageDone (stage2));
        assertTrue (network.isStageDone (stage2));

        // Test: marking stage 3 complete, using both Stage check box and Stage details check box.
        Stage stage3 = network.getStage (NetworkLikePro.stages.get (++idx));
        assertTrue (network.markStageDone (stage3));
        assertTrue (network.isStageDone (stage3));

        // Test: marking stage 4 complete
        Stage stage4 = network.getStage (NetworkLikePro.stages.get (++idx));
        assertTrue (network.markStageDone (stage4));
        assertTrue (network.isStageDone (stage4));

        // Test: marking stage 5 complete, using both Stage check box and Stage details check box.
        Stage stage5 = network.getStage (NetworkLikePro.stages.get (++idx));
        assertTrue (network.markStageDone (stage5));
        assertTrue (network.isStageDone (stage5));
        assertTrue (network.isMilestoneDone (stage5));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You're now a networking expert.";
        assertTrue (network.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 6
        assertTrue (network.clickContinue ());
        assertTrue (network.isMilestonePresent (WriteGreatCoverletter));
    }
}
