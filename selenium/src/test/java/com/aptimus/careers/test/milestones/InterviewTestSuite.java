package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.AceYourInterview;
import static com.aptimus.careers.dto.milestones.Milestone.DevelopYourGamePlan;
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
import com.aptimus.careers.ui.interview.Questions;
import com.aptimus.careers.ui.plan.MainMilestones;

@Test (groups = { "Milestones" })
public class InterviewTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = AceYourInterview.number.replace ("Milestone ", "") + ".";

        MainMilestones interview = new MainCareer ().gotoMilestone (AceYourInterview);
        assertTrue (interview.areAllModulesPresent ());
        assertEquals (interview.getBreadcrumb (), CareerEnvironment.brand + " > " + AceYourInterview.number);
        assertEquals (interview.getHeaderTitle (), "Ace Your Interview");
        assertTrue (interview.getDescription ().length () > 10);

        Stage stage1 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "Learn what employers want");
        assertTrue (stage1.getDescription ().length () > 10, "Hear what hiring managers...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Be a good storyteller");
        assertTrue (stage2.getDescription ().length () > 10, "Discover how to answer...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertFalse (stage2.isForTool ());

        Stage stage3 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Do your research");
        assertTrue (stage3.getDescription ().length () > 10, "Make sure you know your...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertFalse (stage3.isForTool ());

        Stage stage4 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage4.getStageNumber (), milestone + ++idx);
        assertEquals (stage4.getTitle (), "Use the Interview Prep tool");
        assertTrue (stage4.getDescription ().length () > 10, "Use the Interview Prep tool...");
        assertTrue (stage4.getDuration ().length () > 3, "duration=" + stage4.getDuration ());
        assertTrue (stage4.isForTool ());

        Stage stage5 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage5.getStageNumber (), milestone + ++idx);
        assertEquals (stage5.getTitle (), "Explain your career history");
        assertTrue (stage5.getDescription ().length () > 10, "How to explain when and...");
        assertTrue (stage5.getDuration ().length () > 3, "duration=" + stage5.getDuration ());
        assertFalse (stage5.isForTool ());

        Stage stage6 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage6.getStageNumber (), milestone + ++idx);
        assertEquals (stage6.getTitle (), "Ask your own questions");
        assertTrue (stage6.getDescription ().length () > 10, "Coming prepared with questions...");
        assertTrue (stage6.getDuration ().length () > 3, "duration=" + stage6.getDuration ());
        assertFalse (stage6.isForTool ());

        Stage stage7 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage7.getStageNumber (), milestone + ++idx);
        assertEquals (stage7.getTitle (), "Practice makes perfect");
        assertTrue (stage7.getDescription ().length () > 10, "The best way to improve your...");
        assertTrue (stage7.getDuration ().length () > 3, "duration=" + stage7.getDuration ());
        assertFalse (stage7.isForTool ());

        Stage stage8 = interview.getStage (AceYourInterview.stages.get (idx));
        assertEquals (stage8.getStageNumber (), milestone + ++idx);
        assertEquals (stage8.getTitle (), "Do informational interviews");
        assertTrue (stage8.getDescription ().length () > 10, "This is a great way to learn...");
        assertTrue (stage8.getDuration ().length () > 3, "duration=" + stage8.getDuration ());
        assertFalse (stage8.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones interview = dashboard.gotoMilestone (AceYourInterview);
        assertTrue (interview.isMilestonePresent (AceYourInterview));
        assertTrue (interview.isMilestoneHighlighted (AceYourInterview));
        assertTrue (interview.isPrevEnabled ());
        assertTrue (interview.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 8, click Previous Milestone
        assertTrue (interview.clickNextMilestone ());
        MainMilestones strategies = new MainMilestones ();
        assertTrue (strategies.isMilestonePresent (DevelopYourGamePlan));
        assertTrue (strategies.clickPreviousMilestone ());
        assertTrue (interview.isMilestonePresent (AceYourInterview));

        // Test: click Previous Milestone, verify we're in Milestone 6, click Next Milestone
        assertTrue (interview.clickPreviousMilestone ());
        MainMilestones letter = new MainMilestones ();
        assertTrue (letter.isMilestonePresent (WriteGreatCoverletter));
        assertTrue (letter.clickNextMilestone ());
        assertTrue (interview.isMilestonePresent (AceYourInterview));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = interview.getStage (AceYourInterview.stages.get (idx));
        assertTrue (interview.clickStage (stage1));
        assertTrue (interview.markAsComplete (stage1));
        assertTrue (interview.isStageDone (stage1));
        assertTrue (interview.markStageDone (stage1));
        assertFalse (interview.isStageDone (stage1));
        assertTrue (interview.markStageDone (stage1));
        assertTrue (interview.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < AceYourInterview.stages.size (); ++i)
            if (i == idx)
                assertTrue (interview.isStageExpanded (AceYourInterview.stages.get (i)));
            else
                assertTrue (interview.isStageCollapsed (AceYourInterview.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = interview.getStage (AceYourInterview.stages.get (++idx));
        assertTrue (interview.markStageDone (stage2));
        assertTrue (interview.isStageDone (stage2));

        // Test: marking stage 3 complete, using both Stage check box and Stage details check box.
        Stage stage3 = interview.getStage (AceYourInterview.stages.get (++idx));
        assertTrue (interview.markStageDone (stage3));
        assertTrue (interview.isStageDone (stage3));

        // Test: click on stage detail and click Interview Prep tool
        Stage stage4 = interview.getStage (AceYourInterview.stages.get (++idx));
        assertTrue (interview.clickStage (stage4));
        assertTrue (interview.isToolPresent (stage4));
        assertTrue (interview.clickToolButton (stage4));

        assertTrue (new Questions ().isInterviewPresent ());
        assertTrue (interview.clickClose ());

        // CGS-701
        assertTrue (interview.clickStage (stage4));

        assertTrue (interview.isMilestonePresent (AceYourInterview));
        assertTrue (interview.markAsComplete (stage4));
        assertTrue (interview.isStageDone (stage4));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < AceYourInterview.stages.size (); ++i)
            if (i == idx)
                assertTrue (interview.isStageExpanded (AceYourInterview.stages.get (i)));
            else
                assertTrue (interview.isStageCollapsed (AceYourInterview.stages.get (i)));

        // Test: marking stage 5 complete, using both Stage check box and Stage details check box.
        Stage stage5 = interview.getStage (AceYourInterview.stages.get (++idx));
        assertTrue (interview.markStageDone (stage5));
        assertTrue (interview.isStageDone (stage5));

        // Test: marking stage 6 complete, using both Stage check box and Stage details check box.
        Stage stage6 = interview.getStage (AceYourInterview.stages.get (++idx));
        assertTrue (interview.markStageDone (stage6));
        assertTrue (interview.isStageDone (stage6));

        // Test: marking stage 7 complete, using both Stage check box and Stage details check box.
        Stage stage7 = interview.getStage (AceYourInterview.stages.get (++idx));
        assertTrue (interview.markStageDone (stage7));
        assertTrue (interview.isStageDone (stage7));

        // Test: marking stage 8 complete, using both Stage check box and Stage details check box.
        Stage stage8 = interview.getStage (AceYourInterview.stages.get (++idx));
        assertTrue (interview.markStageDone (stage8));
        assertTrue (interview.isStageDone (stage8));
        assertTrue (interview.isMilestoneDone (stage4));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You now know how to interview like a pro.";
        assertTrue (interview.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 8
        assertTrue (interview.clickContinue ());
        assertTrue (interview.isMilestonePresent (DevelopYourGamePlan));
    }
}
