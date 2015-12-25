package com.aptimus.careers.test.dashboard;

import static com.aptimus.careers.dto.milestones.Milestone.SetYourGoals;
import static com.aptimus.careers.dto.milestones.Milestone.SharpenYourSkills;
import static com.aptimus.careers.util.PageHelper.Tool.careerExploration;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.dashboard.modules.Goals;
import com.aptimus.careers.ui.dashboard.modules.Jobs;
import com.aptimus.careers.ui.dashboard.modules.Milestones;
import com.aptimus.careers.ui.dashboard.modules.Resumes;
import com.aptimus.careers.ui.dashboard.modules.Search;
import com.aptimus.careers.ui.dashboard.modules.Tools;
import com.aptimus.careers.ui.explorer.CareerArea;
import com.aptimus.careers.ui.explorer.Occupation;
import com.aptimus.careers.ui.explorer.Recommendation;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.plan.MainMilestones;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.skills.SkillListContainer;

public class DashboardTestSuite extends DashboardTestBase {

    @Test (groups = { "Acceptance", "Dashboard" })
    public void checkAllModulesPresent () {
        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());

        Milestones milestones = new Milestones ();
        assertTrue (milestones.isMilestonesPresent ());
        assertEquals (milestones.getHeader (), "Career Guidance Milestones");

        Tools tools = new Tools ();
        assertTrue (tools.isToolsPresent ());
        assertEquals (tools.getToolsHeader (), "Career Tools");

        Jobs jobs = new Jobs ();
        assertTrue (jobs.isMyJobsPresent ());
        assertTrue (jobs.isRecommendedTabSelected ());
        assertEquals (jobs.getModuleHeader (), "My Jobs");

        Search search = new Search ();
        assertTrue (search.isSearchJobsPresent ());
        assertEquals (search.getModuleHeader (), "Search Jobs");
        assertEquals (search.getSearchLocation (), getUserLocation ());

        Goals goals = new Goals ();
        assertTrue (goals.isGoalsPresent ());
        assertEquals (goals.getModuleHeader (), "My Goals");

        Resumes resumes = new Resumes ();
        assertTrue (resumes.isResumesPresent ());
        assertEquals (resumes.getModuleHeader (), "My Resumes");
    }

    // Pending design decission. Currently, we don't show location on Dashboard page
    @Test (groups = { "Dashboard" }, enabled = false)
    public void testLocation () {
        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.isDashboardPresent ());

        // Test: enter zipcode instead of city, state
        String location = getUserLocation ();
        assertTrue (dashboard.isLocation (location));
        assertTrue (dashboard.enterLocation ("98005"));
        assertEquals (dashboard.getLocation (), location);

        // Test: change location using autocomplete and verify it in dashboard
        location = "Houston, TX";
        assertTrue (dashboard.enterLocationAutocomplete (location));
        assertEquals (dashboard.getLocation (), location);

        // Test: go to Job Search and verify location
        JobSearch search = dashboard.gotoJobSearch ();
        assertTrue (search.areSearchFieldsPresent ());
        assertEquals (search.getCityKeyword (), location);

        // Test: use left bar nav to go to Career Exploration
        MainMilestones milestone = new MainMilestones ();
        assertTrue (milestone.clickNavTool (careerExploration));

        Recommendation recommendation = new Recommendation ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());

        if (recommendation.getProgramName ().isEmpty ()) {
            assertTrue (recommendation.enterKeywords ("Bachelor"));
            recommendation.useProgramSearchAutocomplete (2);
        }
        assertEquals (recommendation.getLocation (), location);

        // Test: check location on Specific Occupations tab
        Occupation job = new Occupation ();
        assertTrue (job.clickOccupationTitle ());
        assertTrue (job.isOccupationTitlePresent ());
        assertEquals (job.getLocation (), location);

        // Test: check location on Career Areas tab
        CareerArea career = new CareerArea ();
        assertTrue (career.clickCareerArea ());
        assertTrue (career.isCareerAreaPresent ());
        assertEquals (career.getLocation (), location);

        // Test: back to Dashboard
        assertTrue (career.clickClose ());
        assertTrue (dashboard.isDashboardPresent ());
        assertEquals (new Search ().getLocation (), location);
    }

    @Test (groups = { "Acceptance" })
    public void checkCareerTools () {
        takeInterestSurvey ();
        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.isDashboardPresent ());

        // Test: go to career exploration and save goal
        Recommendation recommendation = new MainCareer ().gotoCareerExploration ();
        assertTrue (recommendation.checkLoadingIcon ());
        assertTrue (recommendation.isRecommendationsPresent ());
        LaborData testJob1 = recommendation.getJobGoal (1);
        assertTrue (recommendation.setGoal (testJob1));
        assertTrue (recommendation.isMyGoalsCount (2));
        assertTrue (recommendation.clickClose ());

        // Test: go to Skill builder and check skills
        assertTrue (dashboard.isDashboardPresent ());
        SkillListContainer skills = new MainCareer ().gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.clickClose ());

        // Test: go to Resume builder and verify on resume builder page
        assertTrue (dashboard.isDashboardPresent ());
        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isCreateNewPresent ());
        assertTrue (resume.isImportResumePresent ());
        assertTrue (dashboard.clickClose ());
    }

    @Test (groups = { "Acceptance" })
    public void checkCareerGuidanceMilestones () {
        String brand = CareerEnvironment.brand;
        MainDashboard dashboard = new MainDashboard ();
        assertTrue (dashboard.isDashboardPresent ());

        // Test: click career exploration milestone
        Milestones milestone = new Milestones ();
        MainMilestones goals = milestone.clickMilestone (SetYourGoals);
        assertTrue (goals.isMilestonePresent (SetYourGoals));
        assertEquals (goals.getBreadcrumb (), brand + " > " + SetYourGoals.number);
        assertEquals (goals.getHeaderTitle (), "Set Your Career Goals");
        assertTrue (goals.clickHome ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: click skill builder milestone
        MainMilestones skills = milestone.clickMilestone (SharpenYourSkills);
        assertTrue (goals.isMilestonePresent (SharpenYourSkills));
        assertEquals (skills.getBreadcrumb (), brand + " > " + SharpenYourSkills.number);
        assertEquals (skills.getHeaderTitle (), "Sharpen Your Skills");
    }
}
