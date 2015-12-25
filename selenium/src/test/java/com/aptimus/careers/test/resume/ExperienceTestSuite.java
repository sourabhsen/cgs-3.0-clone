package com.aptimus.careers.test.resume;

import static com.aptimus.careers.util.PageHelper.ResumeSection.EXPERIENCE;
import static org.testng.Assert.assertTrue;
import java.util.List;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.resume.Experience.Employer;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.resume.section.JobExperience;

@Test (groups = { "ResumeBuilder" })
public class ExperienceTestSuite extends ResumeTestBase {

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteAllSavedResumes ();
    }

    public void checkProfessionalExperience () {
        String success = "Resume saved at";
        Employer healthTrio = HealthTrio ();
        Employer impactEdu = ImpactEdu ();

        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.createNewResume (generateRandomTitle ()));

        // Test: enter blank experience and check for error message.
        JobExperience work = new JobExperience ();
        assertTrue (work.isEditViewPresent ());
        assertTrue (work.isExperiencePresent (), "is Professional Experience there?");
        assertTrue (work.clickAdd ());
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        // Test: check infotip
        String infotip = "Here are two helpful hints";
        assertTrue (work.getExperienceInfoTip ().contains (infotip));

        // Test: only employer
        assertTrue (work.enterEmployer (0, healthTrio.getEmployer ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        // Test: with employer city
        assertTrue (work.enterEmployerCity (0, healthTrio.getAddress ().getCity ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        // Test: with employer state
        assertTrue (work.enterEmployerState (0, healthTrio.getAddress ().getState ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        // Test: with job title, try infotip
        infotip = "Some employers use unique titles for common jobs";
        assertTrue (work.getJobTitleInfoTip (0).contains (infotip));
        assertTrue (work.enterJobTitle (0, healthTrio.getJobTitle ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        // Test: with job description, try infotip
        infotip = "Review the job description of the position you want";
        assertTrue (work.getJobDescInfoTip (0).contains (infotip));
        assertTrue (work.enterJobDescription (0, healthTrio.getDescription ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        // Test: with job end date
        assertTrue (work.enterEndDate (0, healthTrio.getEndDate ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        // Test: with job start date
        assertTrue (work.enterStartDate (0, healthTrio.getStartDate ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        String resumeId = work.getResumeId ();
        verifyExperience (work.getExperience (0), healthTrio);

        // Test: bad dates - CGS-44
        // assertEquals (work.enterBadStartDate (0, "MM/YYYY"), "Required field");
        // assertTrue (work.enterStartDate (0, healthTrio.getStartDate ())); // 01/2009
        // assertEquals (work.enterBadEndDate (0, "a bad date"), "Required field");
        // assertEquals (work.enterBadEndDate (0, "01/2008"),
        // "End date cannot fall before start date");
        // assertEquals (work.enterBadEndDate (0, "06/3000"), "You cannot pick a date in future");
        // assertTrue (work.setCurrent (0));
        // assertEquals (work.getEndDate (0), "Present");
        // assertTrue (work.clickSave ());
        // assertTrue (work.isSuccessPresent (success));
        healthTrio = work.getExperience (0);

        // Test: go back to list view, click edit
        assertTrue (work.clickBackToListView ());
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());
        assertTrue (resume.clickEdit (resumeId));
        assertTrue (work.isEditViewPresent ());

        // Test: enter some more experiences
        assertTrue (work.clickAdd ());
        assertTrue (work.enterJobDetails (1, impactEdu));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        List <Employer> uiEmployers = work.getExperiences ();
        verifyExperience (uiEmployers.get (0), healthTrio);
        verifyExperience (uiEmployers, resumeId);
    }

    public void addDeleteJobHistories () {
        String success = "Resume saved at";
        Employer healthTrio = HealthTrio ();
        Employer impactEdu = ImpactEdu ();
        Employer realNetworks = RealNetworks ();
        uploadResumeDoc ();

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        MainResume resume = dashboard.gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());

        UserResume testResume = resume.getResume (1);
        assertTrue (resume.clickEdit (testResume.getResumeId ()));

        // Test: verified job histories
        JobExperience work = new JobExperience ();
        assertTrue (work.isEditViewPresent ());
        assertTrue (work.isExperiencePresent (), "is Professional Experience there?");

        // ANGCGS-751
        assertTrue (work.enterEmployerState (0, healthTrio.getAddress ().getState ()));
        assertTrue (work.enterEmployerState (1, impactEdu.getAddress ().getState ()));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));
        // end work around - ANGCGS-751

        // Test: adding one more job history after file upload - ANGCGS-759
        assertTrue (work.clickAdd ());
        assertTrue (work.enterJobDetails (2, realNetworks));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        verifyExperience (work.getExperience (0), healthTrio);
        verifyExperience (work.getExperience (1), impactEdu);
        verifyExperience (work.getExperience (2), realNetworks);
        verifyExperience (work.getExperiences (), testResume.getResumeId ());

        // Test: delete job histories - last one
        assertTrue (work.clickDelete (2));
        assertTrue (work.clickCancelDelete ());
        assertTrue (work.isSectionPresent (2));

        assertTrue (work.clickDelete (2));
        assertTrue (work.clickYesDelete ());
        assertTrue (work.isSectionDeleted (2));

        // Test: delete 1st section, expect 2nd section to move up
        assertTrue (work.clickDelete (0));
        assertTrue (work.clickYesDelete ());
        assertTrue (work.isSectionDeleted (1));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));

        verifyExperience (work.getExperience (0), impactEdu);
        verifyExperience (work.getExperiences (), testResume.getResumeId ());

        // Test: delete entire Experience section
        assertTrue (work.clickDeleteExperience ());
        assertTrue (work.clickCancelDelete ());
        assertTrue (work.isExperiencePresent ());

        assertTrue (work.clickDeleteExperience ());
        assertTrue (work.clickYesDelete ());
        assertTrue (work.isExperienceDeleted ());
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));
        assertTrue (getResume (testResume.getResumeId ()).getResume ().getExperience ().getJobs ().size () == 0);

        // Test: add Experience section back
        assertTrue (work.insertSection (EXPERIENCE));
        assertTrue (work.isExperiencePresent (), "is Professional Experience there?");
        assertTrue (work.clickAdd ());
        assertTrue (work.enterJobDetails (0, realNetworks));
        assertTrue (work.clickSave ());
        assertTrue (work.isSuccessPresent (success));
        verifyExperience (work.getExperiences (), testResume.getResumeId ());
    }
}
