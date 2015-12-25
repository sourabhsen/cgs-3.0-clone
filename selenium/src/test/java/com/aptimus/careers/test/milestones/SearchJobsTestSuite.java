package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.dto.milestones.Milestone.AdvanceYourCareer;
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
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.plan.MainMilestones;

@Test (groups = { "Milestones" })
public class SearchJobsTestSuite extends CareerPlanTestBase {

    private int idx;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        idx = 0;
    }

    public void verifyAllModulesPresent () {
        String milestone = SearchAndApply.number.replace ("Milestone ", "") + ".";

        MainMilestones jobsearch = new MainCareer ().gotoMilestone (SearchAndApply);
        assertTrue (jobsearch.areAllModulesPresent ());
        assertEquals (jobsearch.getBreadcrumb (), CareerEnvironment.brand + " > " + SearchAndApply.number);
        assertEquals (jobsearch.getHeaderTitle (), "Search and Apply");
        assertTrue (jobsearch.getDescription ().length () > 10);

        Stage stage1 = jobsearch.getStage (SearchAndApply.stages.get (idx));
        assertEquals (stage1.getStageNumber (), milestone + ++idx);
        assertEquals (stage1.getTitle (), "Customize it");
        assertTrue (stage1.getDescription ().length () > 10, "Want to get noticed? Make...");
        assertTrue (stage1.getDuration ().length () > 3, "duration=" + stage1.getDuration ());
        assertFalse (stage1.isForTool ());

        Stage stage2 = jobsearch.getStage (SearchAndApply.stages.get (idx));
        assertEquals (stage2.getStageNumber (), milestone + ++idx);
        assertEquals (stage2.getTitle (), "Use the Job Search tool");
        assertTrue (stage2.getDescription ().length () > 10, "Use the Job Search tool to look...");
        assertTrue (stage2.getDuration ().length () > 3, "duration=" + stage2.getDuration ());
        assertTrue (stage2.isForTool ());

        Stage stage3 = jobsearch.getStage (SearchAndApply.stages.get (idx));
        assertEquals (stage3.getStageNumber (), milestone + ++idx);
        assertEquals (stage3.getTitle (), "Track your job applications");
        assertTrue (stage3.getDescription ().length () > 10, "Stay organized during your job...");
        assertTrue (stage3.getDuration ().length () > 3, "duration=" + stage3.getDuration ());
        assertFalse (stage3.isForTool ());

        Stage stage4 = jobsearch.getStage (SearchAndApply.stages.get (idx));
        assertEquals (stage4.getStageNumber (), milestone + ++idx);
        assertEquals (stage4.getTitle (), "Prepare for interviews");
        assertTrue (stage4.getDescription ().length () > 10, "Brush up on your interviewing...");
        assertTrue (stage4.getDuration ().length () > 3, "duration=" + stage4.getDuration ());
        assertFalse (stage4.isForTool ());

        Stage stage5 = jobsearch.getStage (SearchAndApply.stages.get (idx));
        assertEquals (stage5.getStageNumber (), milestone + ++idx);
        assertEquals (stage5.getTitle (), "Follow up");
        assertTrue (stage5.getDescription ().length () > 10, "Learn why it’s important to follow...");
        assertTrue (stage5.getDuration ().length () > 3, "duration=" + stage5.getDuration ());
        assertFalse (stage5.isForTool ());

        Stage stage6 = jobsearch.getStage (SearchAndApply.stages.get (idx));
        assertEquals (stage6.getStageNumber (), milestone + ++idx);
        assertEquals (stage6.getTitle (), "Offers and Negotiations");
        assertTrue (stage6.getDescription ().length () > 10, "What to keep in mind when...");
        assertTrue (stage6.getDuration ().length () > 3, "duration=" + stage6.getDuration ());
        assertFalse (stage6.isForTool ());
    }

    public void completingStages () {
        deleteCompletedStages ();
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        MainMilestones jobsearch = dashboard.gotoMilestone (SearchAndApply);
        assertTrue (jobsearch.isMilestonePresent (SearchAndApply));
        assertTrue (jobsearch.isMilestoneHighlighted (SearchAndApply));
        assertTrue (jobsearch.isPrevEnabled ());
        assertTrue (jobsearch.isNextEnabled ());

        // Test: click Next Milestone, verify we're in Milestone 10, click Previous Milestone
        assertTrue (jobsearch.clickNextMilestone ());
        MainMilestones management = new MainMilestones ();
        assertTrue (management.isMilestonePresent (AdvanceYourCareer));
        assertTrue (management.clickPreviousMilestone ());
        assertTrue (jobsearch.isMilestonePresent (SearchAndApply));

        // Test: click Previous Milestone, verify we're in Milestone 8, click Next Milestone
        assertTrue (jobsearch.clickPreviousMilestone ());
        MainMilestones strategies = new MainMilestones ();
        assertTrue (strategies.isMilestonePresent (DevelopYourGamePlan));
        assertTrue (strategies.clickNextMilestone ());
        assertTrue (jobsearch.isMilestonePresent (SearchAndApply));

        // Test: marking stage 1 complete, using both Stage check box and Stage details check box.
        Stage stage1 = jobsearch.getStage (SearchAndApply.stages.get (idx));
        assertTrue (jobsearch.clickStage (stage1));
        assertTrue (jobsearch.markAsComplete (stage1));
        assertTrue (jobsearch.isStageDone (stage1));
        assertTrue (jobsearch.markStageDone (stage1));
        assertFalse (jobsearch.isStageDone (stage1));
        assertTrue (jobsearch.markStageDone (stage1));
        assertTrue (jobsearch.isStageDone (stage1));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < SearchAndApply.stages.size (); ++i)
            if (i == idx)
                assertTrue (jobsearch.isStageExpanded (SearchAndApply.stages.get (i)));
            else
                assertTrue (jobsearch.isStageCollapsed (SearchAndApply.stages.get (i)));

        // Test: click on stage detail and click Job Search tool
        Stage stage2 = jobsearch.getStage (SearchAndApply.stages.get (++idx));
        assertTrue (jobsearch.clickStage (stage2));
        assertTrue (jobsearch.isToolPresent (stage2));
        assertTrue (jobsearch.clickToolButton (stage2));

        JobSearch search = new JobSearch ();
        assertTrue (search.areSearchFieldsPresent ());
        assertTrue (jobsearch.clickClose ());

        // CGS-701
        assertTrue (jobsearch.clickStage (stage2));

        assertTrue (jobsearch.isMilestonePresent (SearchAndApply));

        // Test: click Job Search tool, do a search and close modal - CGS-472
        assertTrue (jobsearch.clickToolButton (stage2));
        assertTrue (search.areSearchFieldsPresent ());
        assertTrue (search.doSearch ("developer", "Seattle, WA"));

        SearchResults results = new SearchResults ();
        assertTrue (results.areAllModulesPresent ());
        assertTrue (jobsearch.clickClose ());

        // CGS-701
        assertTrue (jobsearch.clickStage (stage2));

        assertTrue (jobsearch.isMilestonePresent (SearchAndApply));
        assertTrue (jobsearch.markAsComplete (stage2));
        assertTrue (jobsearch.isStageDone (stage2));

        // Test: check when one stage is open remaining stages are closed ANGCGS-527
        for (int i = 0; i < SearchAndApply.stages.size (); ++i)
            if (i == idx)
                assertTrue (jobsearch.isStageExpanded (SearchAndApply.stages.get (i)));
            else
                assertTrue (jobsearch.isStageCollapsed (SearchAndApply.stages.get (i)));

        // Test: marking stage 3 complete, using both Stage check box and Stage details check box.
        Stage stage3 = jobsearch.getStage (SearchAndApply.stages.get (++idx));
        assertTrue (jobsearch.markStageDone (stage3));
        assertTrue (jobsearch.isStageDone (stage3));

        // Test: marking stage 4 complete, using both Stage check box and Stage details check box.
        Stage stage4 = jobsearch.getStage (SearchAndApply.stages.get (++idx));
        assertTrue (jobsearch.markStageDone (stage4));
        assertTrue (jobsearch.isStageDone (stage4));

        // Test: marking stage 5 complete, using both Stage check box and Stage details check box.
        Stage stage5 = jobsearch.getStage (SearchAndApply.stages.get (++idx));
        assertTrue (jobsearch.markStageDone (stage5));
        assertTrue (jobsearch.isStageDone (stage5));

        // Test: marking stage 6 complete, using both Stage check box and Stage details check box.
        Stage stage6 = jobsearch.getStage (SearchAndApply.stages.get (++idx));
        assertTrue (jobsearch.markStageDone (stage6));
        assertTrue (jobsearch.isStageDone (stage6));
        assertTrue (jobsearch.isMilestoneDone (stage6));

        // Test: verify milestone completion message ANGCGS-576
        String completionMessage = "You now know how to apply for jobs and manage all of your applications.";
        assertTrue (jobsearch.getMilestoneCompletionMessage ().contains (completionMessage));

        // Test: click Continue, verify we're in Milestone 10
        assertTrue (jobsearch.clickContinue ());
        assertTrue (jobsearch.isMilestonePresent (AdvanceYourCareer));
    }
}
