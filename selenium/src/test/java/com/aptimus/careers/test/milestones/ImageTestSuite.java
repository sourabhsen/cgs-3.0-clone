package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.BuildYourResume;
import static com.aptimus.careers.dto.milestones.Milestone.CraftYourImage;
import static com.aptimus.careers.dto.milestones.Milestone.NetworkLikePro;
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
public class ImageTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = CraftYourImage.number.replace ("Milestone ", "") + ".";

        MainMilestones image = new MainCareer ().gotoMilestone (CraftYourImage);
        assertTrue (image.areAllModulesPresent ());
        assertEquals (image.getBreadcrumb (), CareerEnvironment.brand + " > " + CraftYourImage.number);
        assertEquals (image.getHeaderTitle (), "Craft Your Image");
        assertTrue (image.getDescription ().length () > 10);

        Stage stage1 = image.getStage (CraftYourImage.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "What's your brand?");
        assertTrue (stage1.getDescription ().length () > 10, "Learn about professional branding...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = image.getStage (CraftYourImage.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "The elevator pitch");
        assertTrue (stage2.getDescription ().length () > 10, "Get tips on creating this short...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertFalse (stage2.isForTool ());

        Stage stage3 = image.getStage (CraftYourImage.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Your online presence");
        assertTrue (stage3.getDescription ().length () > 10, "Potential employers will likely look you...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertFalse (stage3.isForTool ());

        Stage stage4 = image.getStage (CraftYourImage.stages.get (idx));
        assertEquals (stage4.getStageNumber (), milestone + ++idx);
        assertEquals (stage4.getTitle (), "LinkedIn Basics");
        assertTrue (stage4.getDescription ().length () > 10, "Learn how to create an effective LinkedIn...");
        assertTrue (stage4.getDuration ().length () > 3, "duration=" + stage4.getDuration ());
        assertFalse (stage4.isForTool ());

        Stage stage5 = image.getStage (CraftYourImage.stages.get (idx));
        assertEquals (stage5.getStageNumber (), milestone + ++idx);
        assertEquals (stage5.getTitle (), "Dress for success");
        assertTrue (stage5.getDescription ().length () > 10, "Appearance matters. Follow these...");
        assertTrue (stage5.getDuration ().length () > 3, "duration=" + stage5.getDuration ());
        assertFalse (stage5.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones image = dashboard.gotoMilestone (CraftYourImage);
        assertTrue (image.isMilestonePresent (CraftYourImage));
        assertTrue (image.isMilestoneHighlighted (CraftYourImage));
        assertTrue (image.isPrevEnabled ());
        assertTrue (image.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 5, click Previous Milestone
        assertTrue (image.clickNextMilestone ());
        MainMilestones network = new MainMilestones ();
        assertTrue (network.isMilestonePresent (NetworkLikePro));
        assertTrue (network.clickPreviousMilestone ());
        assertTrue (image.isMilestonePresent (CraftYourImage));

        // Test: click Previous Milestone, verify we're in Milestone 3, click Next Milestone
        assertTrue (image.clickPreviousMilestone ());
        MainMilestones resume = new MainMilestones ();
        assertTrue (resume.isMilestonePresent (BuildYourResume));
        assertTrue (resume.clickNextMilestone ());
        assertTrue (image.isMilestonePresent (CraftYourImage));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = image.getStage (CraftYourImage.stages.get (idx));
        assertTrue (image.clickStage (stage1));
        assertTrue (image.markAsComplete (stage1));
        assertTrue (image.isStageDone (stage1));
        assertTrue (image.markStageDone (stage1));
        assertFalse (image.isStageDone (stage1));
        assertTrue (image.markStageDone (stage1));
        assertTrue (image.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < CraftYourImage.stages.size (); ++i)
            if (i == idx)
                assertTrue (image.isStageExpanded (CraftYourImage.stages.get (i)));
            else
                assertTrue (image.isStageCollapsed (CraftYourImage.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = image.getStage (CraftYourImage.stages.get (++idx));
        assertTrue (image.markStageDone (stage2));
        assertTrue (image.isStageDone (stage2));

        // Test: marking stage 3 complete, using both Stage check box and Stage details check box.
        Stage stage3 = image.getStage (CraftYourImage.stages.get (++idx));
        assertTrue (image.markStageDone (stage3));
        assertTrue (image.isStageDone (stage3));

        // Test: marking stage 4 complete, using both Stage check box and Stage details check box.
        Stage stage4 = image.getStage (CraftYourImage.stages.get (++idx));
        assertTrue (image.markStageDone (stage4));
        assertTrue (image.isStageDone (stage4));

        // Test: marking stage 5 complete, using both Stage check box and Stage details check box.
        Stage stage5 = image.getStage (CraftYourImage.stages.get (++idx));
        assertTrue (image.markStageDone (stage5));
        assertTrue (image.isStageDone (stage5));
        assertTrue (image.isMilestoneDone (stage5));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You're now know how to craft your professional image.";
        assertTrue (image.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 5
        assertTrue (image.clickContinue ());
        assertTrue (image.isMilestonePresent (NetworkLikePro));
    }
}
