package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.AdvanceYourCareer;
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
public class ManageCareerTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = AdvanceYourCareer.number.replace ("Milestone ", "") + ".";

        MainMilestones management = new MainCareer ().gotoMilestone (AdvanceYourCareer);
        assertTrue (management.areAllModulesPresent ());
        assertEquals (management.getBreadcrumb (), CareerEnvironment.brand + " > " + AdvanceYourCareer.number);
        assertEquals (management.getHeaderTitle (), "Advance Your Career");
        assertTrue (management.getDescription ().length () > 10);

        Stage stage1 = management.getStage (AdvanceYourCareer.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "Professional growth");
        assertTrue (stage1.getDescription ().length () > 10, "How to take charge of your...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = management.getStage (AdvanceYourCareer.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Building relationships");
        assertTrue (stage2.getDescription ().length () > 10, "Here’s an in-depth look at relationship...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertFalse (stage2.isForTool ());

        Stage stage3 = management.getStage (AdvanceYourCareer.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Getting promoted");
        assertTrue (stage3.getDescription ().length () > 10, "Discover how to impress your...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertFalse (stage3.isForTool ());
    }

    public void completingStages () {
        // Test: setting up all Milestones as completed except 10
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones management = dashboard.gotoMilestone (AdvanceYourCareer);
        assertTrue (management.isMilestonePresent (AdvanceYourCareer));
        assertTrue (management.isMilestoneHighlighted (AdvanceYourCareer));
        assertTrue (management.isPrevEnabled ());
        assertFalse (management.isNextEnabled ());

        // Test: click Previous Milestone, verify we're in Milestone 9, click Next Milestone
        assertTrue (management.clickPreviousMilestone ());
        MainMilestones jobsearch = new MainMilestones ();
        assertTrue (jobsearch.isMilestonePresent (SearchAndApply));
        assertTrue (jobsearch.clickNextMilestone ());
        assertTrue (management.isMilestonePresent (AdvanceYourCareer));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = management.getStage (AdvanceYourCareer.stages.get (idx));
        assertTrue (management.clickStage (stage1));
        assertTrue (management.markAsComplete (stage1));
        assertTrue (management.isStageDone (stage1));
        assertTrue (management.markStageDone (stage1));
        assertFalse (management.isStageDone (stage1));
        assertTrue (management.markStageDone (stage1));
        assertTrue (management.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < AdvanceYourCareer.stages.size (); ++i)
            if (i == idx)
                assertTrue (management.isStageExpanded (AdvanceYourCareer.stages.get (i)));
            else
                assertTrue (management.isStageCollapsed (AdvanceYourCareer.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = management.getStage (AdvanceYourCareer.stages.get (++idx));
        assertTrue (management.markStageDone (stage2));
        assertTrue (management.isStageDone (stage2));

        // Test: marking stage 3 complete, using both Stage check box and Stage details check box.
        Stage stage3 = management.getStage (AdvanceYourCareer.stages.get (++idx));
        assertTrue (management.markStageDone (stage3));
        assertTrue (management.isStageDone (stage3));
        assertTrue (management.isMilestoneDone (stage3));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You're now a Career Advancement expert.";
        assertTrue (management.getMilestoneCompletionMessage ().contains (completionMessage));
    }
}
