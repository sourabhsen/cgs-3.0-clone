package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.AceYourInterview;
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
public class CoverLetterTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = WriteGreatCoverletter.number.replace ("Milestone ", "") + ".";

        MainMilestones letter = new MainCareer ().gotoMilestone (WriteGreatCoverletter);
        assertTrue (letter.areAllModulesPresent ());
        assertEquals (letter.getBreadcrumb (), CareerEnvironment.brand + " > " + WriteGreatCoverletter.number);
        assertEquals (letter.getHeaderTitle (), "Write a Great Cover Letter");
        assertTrue (letter.getDescription ().length () > 10);

        Stage stage1 = letter.getStage (WriteGreatCoverletter.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "What employers want to see");
        assertTrue (stage1.getDescription ().length () > 10, "What do hiring managers look...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = letter.getStage (WriteGreatCoverletter.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Get your story straight");
        assertTrue (stage2.getDescription ().length () > 10, "Start brainstorming for the...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertFalse (stage2.isForTool ());

        Stage stage3 = letter.getStage (WriteGreatCoverletter.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Polish it up");
        assertTrue (stage3.getDescription ().length () > 10, "Use our cover-letter checklist...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertFalse (stage3.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones letter = dashboard.gotoMilestone (WriteGreatCoverletter);
        assertTrue (letter.isMilestonePresent (WriteGreatCoverletter));
        assertTrue (letter.isMilestoneHighlighted (WriteGreatCoverletter));
        assertTrue (letter.isPrevEnabled ());
        assertTrue (letter.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 7, click Previous Milestone
        assertTrue (letter.clickNextMilestone ());
        MainMilestones interview = new MainMilestones ();
        assertTrue (interview.isMilestonePresent (AceYourInterview));
        assertTrue (interview.clickPreviousMilestone ());
        assertTrue (letter.isMilestonePresent (WriteGreatCoverletter));

        // Test: click Previous Milestone, verify we're in Milestone 5, click Next Milestone
        assertTrue (letter.clickPreviousMilestone ());
        MainMilestones network = new MainMilestones ();
        assertTrue (network.isMilestonePresent (NetworkLikePro));
        assertTrue (network.clickNextMilestone ());
        assertTrue (letter.isMilestonePresent (WriteGreatCoverletter));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = letter.getStage (WriteGreatCoverletter.stages.get (idx));
        assertTrue (letter.clickStage (stage1));
        assertTrue (letter.markAsComplete (stage1));
        assertTrue (letter.isStageDone (stage1));
        assertTrue (letter.markStageDone (stage1));
        assertFalse (letter.isStageDone (stage1));
        assertTrue (letter.markStageDone (stage1));
        assertTrue (letter.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < WriteGreatCoverletter.stages.size (); ++i)
            if (i == idx)
                assertTrue (letter.isStageExpanded (WriteGreatCoverletter.stages.get (i)));
            else
                assertTrue (letter.isStageCollapsed (WriteGreatCoverletter.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = letter.getStage (WriteGreatCoverletter.stages.get (++idx));
        assertTrue (letter.markStageDone (stage2));
        assertTrue (letter.isStageDone (stage2));

        // Test: marking stage 3 complete, using both Stage check box and Stage details check box.
        Stage stage3 = letter.getStage (WriteGreatCoverletter.stages.get (++idx));
        assertTrue (letter.markStageDone (stage3));
        assertTrue (letter.isStageDone (stage3));
        assertTrue (letter.isMilestoneDone (stage3));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You now know how to create a great cover letter.";
        assertTrue (letter.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 7
        assertTrue (letter.clickContinue ());
        assertTrue (letter.isMilestonePresent (AceYourInterview));
    }
}
