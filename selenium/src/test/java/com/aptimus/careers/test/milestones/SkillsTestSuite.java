package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.BuildYourResume;
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
import com.aptimus.careers.ui.plan.MainMilestones;
import com.aptimus.careers.ui.skills.SkillListContainer;

@Test (groups = { "Milestones" })
public class SkillsTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = SharpenYourSkills.number.replace ("Milestone ", "") + ".";

        MainMilestones skills = new MainCareer ().gotoMilestone (SharpenYourSkills);
        assertTrue (skills.areAllModulesPresent ());
        assertEquals (skills.getBreadcrumb (), CareerEnvironment.brand + " > " + SharpenYourSkills.number);
        assertEquals (skills.getHeaderTitle (), "Sharpen Your Skills");
        assertTrue (skills.getDescription ().length () > 10);

        Stage stage1 = skills.getStage (SharpenYourSkills.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "Skill basics");
        assertTrue (stage1.getDescription ().length () > 10, "Find out why skills...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = skills.getStage (SharpenYourSkills.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Gaining experience");
        assertTrue (stage2.getDescription ().length () > 10, "Learn how to acquire skills...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertFalse (stage2.isForTool ());

        Stage stage3 = skills.getStage (SharpenYourSkills.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Develop the important skills");
        assertTrue (stage3.getDescription ().length () > 10, "Use the Skill Builder tool...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertTrue (stage3.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones skills = dashboard.gotoMilestone (SharpenYourSkills);
        assertTrue (skills.isMilestonePresent (SharpenYourSkills));
        assertTrue (skills.isMilestoneHighlighted (SharpenYourSkills));
        assertTrue (skills.isPrevEnabled ());
        assertTrue (skills.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 3, click Previous Milestone
        assertTrue (skills.clickNextMilestone ());
        MainMilestones resumes = new MainMilestones ();
        assertTrue (resumes.isMilestonePresent (BuildYourResume));
        assertTrue (resumes.clickPreviousMilestone ());
        assertTrue (skills.isMilestonePresent (SharpenYourSkills));

        // Test: click Previous Milestone, verify we're in Milestone 1, click Next Milestone
        assertTrue (skills.clickPreviousMilestone ());
        MainMilestones goals = new MainMilestones ();
        assertTrue (goals.isMilestonePresent (SetYourGoals));
        assertTrue (goals.clickNextMilestone ());
        assertTrue (skills.isMilestonePresent (SharpenYourSkills));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = skills.getStage (SharpenYourSkills.stages.get (idx));
        assertTrue (skills.clickStage (stage1));
        assertTrue (skills.markAsComplete (stage1));
        assertTrue (skills.isStageDone (stage1));
        assertTrue (skills.markStageDone (stage1));
        assertFalse (skills.isStageDone (stage1));
        assertTrue (skills.markStageDone (stage1));
        assertTrue (skills.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < SharpenYourSkills.stages.size (); ++i)
            if (i == idx)
                assertTrue (skills.isStageExpanded (SharpenYourSkills.stages.get (i)));
            else
                assertTrue (skills.isStageCollapsed (SharpenYourSkills.stages.get (i)));

        // Test: marking stage 2 complete, using both Stage check box and Stage details check box.
        Stage stage2 = skills.getStage (SharpenYourSkills.stages.get (++idx));
        assertTrue (skills.markStageDone (stage2));
        assertTrue (skills.isStageDone (stage2));

        // Test: click on stage detail and click Skill Builder tool
        Stage stage3 = skills.getStage (SharpenYourSkills.stages.get (++idx));
        assertTrue (skills.clickStage (stage3));
        assertTrue (skills.isToolPresent (stage3));
        assertTrue (skills.clickToolButton (stage3));

        assertTrue (new SkillListContainer ().isSkillBuilderPresent ());
        assertTrue (skills.clickClose ());

        // CGS-701
        assertTrue (skills.clickStage (stage3));

        assertTrue (skills.isMilestonePresent (SharpenYourSkills));
        assertTrue (skills.markAsComplete (stage3));
        assertTrue (skills.isStageDone (stage3));
        assertTrue (skills.isMilestoneDone (stage3));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < SharpenYourSkills.stages.size (); ++i)
            if (i == idx)
                assertTrue (skills.isStageExpanded (SharpenYourSkills.stages.get (i)));
            else
                assertTrue (skills.isStageCollapsed (SharpenYourSkills.stages.get (i)));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You now know which skills are important for your career goals";
        assertTrue (skills.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 3
        assertTrue (skills.clickContinue ());
        assertTrue (skills.isMilestonePresent (BuildYourResume));
    }
}
