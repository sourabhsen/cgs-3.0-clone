package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.BuildYourResume;
import static com.aptimus.careers.dto.milestones.Milestone.CraftYourImage;
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
import com.aptimus.careers.ui.plan.MainMilestones;
import com.aptimus.careers.ui.resume.MainResume;

@Test (groups = { "Milestones" })
public class ResumeTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = BuildYourResume.number.replace ("Milestone ", "") + ".";

        MainMilestones resumes = new MainCareer ().gotoMilestone (BuildYourResume);
        assertTrue (resumes.areAllModulesPresent ());
        assertEquals (resumes.getBreadcrumb (), CareerEnvironment.brand + " > " + BuildYourResume.number);
        assertEquals (resumes.getHeaderTitle (), "Build Your Resume");
        assertTrue (resumes.getDescription ().length () > 10);

        Stage stage1 = resumes.getStage (BuildYourResume.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "Discover what recruiters want");
        assertTrue (stage1.getDescription ().length () > 10, "Make employers sit up...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = resumes.getStage (BuildYourResume.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Learn how to create your targeted resume");
        assertTrue (stage2.getDescription ().length () > 10, "Why it’s critical to...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertFalse (stage2.isForTool ());

        Stage stage3 = resumes.getStage (BuildYourResume.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Build your resume");
        assertTrue (stage3.getDescription ().length () > 10, "Use the Resume Builder tool...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertTrue (stage3.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones resumes = dashboard.gotoMilestone (BuildYourResume);
        assertTrue (resumes.isMilestonePresent (BuildYourResume));
        assertTrue (resumes.isMilestoneHighlighted (BuildYourResume));
        assertTrue (resumes.isPrevEnabled ());
        assertTrue (resumes.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 4, click Previous Milestone
        assertTrue (resumes.clickNextMilestone ());
        MainMilestones image = new MainMilestones ();
        assertTrue (image.isMilestonePresent (CraftYourImage));
        assertTrue (image.clickPreviousMilestone ());
        assertTrue (resumes.isMilestonePresent (BuildYourResume));

        // Test: click Previous Milestone, verify we're in Milestone 2, click Next Milestone
        assertTrue (resumes.clickPreviousMilestone ());
        MainMilestones skills = new MainMilestones ();
        assertTrue (skills.isMilestonePresent (SharpenYourSkills));
        assertTrue (skills.clickNextMilestone ());
        assertTrue (resumes.isMilestonePresent (BuildYourResume));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = resumes.getStage (BuildYourResume.stages.get (idx));
        assertTrue (resumes.clickStage (stage1));
        assertTrue (resumes.markAsComplete (stage1));
        assertTrue (resumes.isStageDone (stage1));
        assertTrue (resumes.markStageDone (stage1));
        assertFalse (resumes.isStageDone (stage1));
        assertTrue (resumes.markStageDone (stage1));
        assertTrue (resumes.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < BuildYourResume.stages.size (); ++i)
            if (i == idx)
                assertTrue (resumes.isStageExpanded (BuildYourResume.stages.get (i)));
            else
                assertTrue (resumes.isStageCollapsed (BuildYourResume.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = resumes.getStage (BuildYourResume.stages.get (++idx));
        assertTrue (resumes.markStageDone (stage2));
        assertTrue (resumes.isStageDone (stage2));

        // Test: click on stage detail and click Resume Builder tool
        Stage stage3 = resumes.getStage (BuildYourResume.stages.get (++idx));
        assertTrue (resumes.clickStage (stage3));
        assertTrue (resumes.isToolPresent (stage3));
        assertTrue (resumes.clickToolButton (stage3));
        assertTrue (new MainResume ().isResumePresent ());
        assertTrue (resumes.clickClose ());

        // CGS-546, CGS-701
        assertTrue (resumes.clickStage (stage3));

        assertTrue (resumes.isMilestonePresent (BuildYourResume));
        assertTrue (resumes.markAsComplete (stage3));
        assertTrue (resumes.isStageDone (stage3));
        assertTrue (resumes.isMilestoneDone (stage3));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You're now a resume expert.";
        assertTrue (resumes.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 4
        assertTrue (resumes.clickContinue ());
        assertTrue (resumes.isMilestonePresent (CraftYourImage));
    }
}
