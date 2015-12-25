package com.aptimus.careers.test.resume;

import static com.aptimus.careers.util.PageHelper.ResumeSection.EDUCATION;
import static org.testng.Assert.assertTrue;
import java.util.List;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.resume.Education.School;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.resume.section.ResumeEducation;

@Test (groups = { "ResumeBuilder" })
public class EducationTestSuite extends ResumeTestBase {

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteAllSavedResumes ();
    }

    public void checkEducation () {
        String success = "Resume saved at";
        School bsOSU = minSchool ();
        School msUW = msUW ();

        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.createNewResume (generateRandomTitle ()));

        // Test: enter blank education and check for error message.
        ResumeEducation school = new ResumeEducation ();
        assertTrue (school.isEditViewPresent ());
        assertTrue (school.isEducationPresent (), "is Education there?");
        assertTrue (school.clickAdd ());
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: only school name
        assertTrue (school.enterSchoolName (0, bsOSU.getInstitution ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: with school city
        assertTrue (school.enterSchoolCity (0, bsOSU.getAddress ().getCity ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: with school state
        assertTrue (school.enterSchoolState (0, bsOSU.getAddress ().getState ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: with degree level
        assertTrue (school.enterDegreeLevel (0, bsOSU.getDegreeLevel ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: with degree type, try infotip
        String infotip = "Make sure what you enter is what your diploma states";
        assertTrue (school.getDegreeTypeInfoTip (0).contains (infotip));
        assertTrue (school.enterDegreeType (0, bsOSU.getDegreeType ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: with degree major, try infotip
        infotip = "You can include multiple majors or emphases by separating them with commas";
        assertTrue (school.getMajorInfoTip (0).contains (infotip));
        assertTrue (school.enterMajor (0, bsOSU.getMajor ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: with graduation date
        assertTrue (school.enterEndDate (0, bsOSU.getCompletionDate ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: with job start date
        assertTrue (school.enterStartDate (0, bsOSU.getStartDate ()));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        // Test: try infotip for GPA and details
        infotip = "We recommend including your GPA if it is 3.0 or above";
        assertTrue (school.getGpaInfoTip (0).contains (infotip));
        infotip = "consider adding a couple of your most relevant courses or projects";
        assertTrue (school.getDetailsInfoTip (0).contains (infotip));

        String resumeId = school.getResumeId ();
        verifyEducation (school.getEducation (0), bsOSU);

        // Test: bad dates - CGS-41
        // assertEquals (school.enterBadStartDate (0, "MM/YYYY"), "Required field");
        // assertTrue (school.enterStartDate (0, bsOSU.getStartDate ())); // 01/1994
        // assertEquals (school.enterBadEndDate (0, "a bad date"), "Required field");
        // assertEquals (school.enterBadEndDate (0, "01/1993"),
        // "End date cannot fall before start date");
        // assertEquals (school.enterBadEndDate (0, "06/3000"), "You cannot pick a date in future");
        // assertTrue (school.setCurrent (0));
        // assertEquals (school.getEndDate (0), "Present");
        // assertTrue (school.clickSave ());
        // assertTrue (school.isSuccessPresent (success));
        bsOSU = school.getEducation (0);

        // Test: go back to list view, click edit
        assertTrue (school.clickBackToListView ());
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());
        assertTrue (resume.clickEdit (resumeId));
        assertTrue (school.isEditViewPresent ());

        // Test: enter some more educations
        assertTrue (school.clickAdd ());
        assertTrue (school.enterEducationDetails (1, msUW));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        List <School> uiSchools = school.getEducations ();
        verifyEducation (uiSchools.get (0), bsOSU);
        verifyEducation (uiSchools, resumeId);
    }

    public void addDeleteEducations () {
        String success = "Resume saved at";
        School msUO = msUO ();
        School msUW = msUW ();
        School bsOSU = bsOSU ();
        uploadResumeDoc ();

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        MainResume resume = dashboard.gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());

        UserResume testResume = resume.getResume (1);
        assertTrue (resume.clickEdit (testResume.getResumeId ()));

        // Test: verified education histories
        ResumeEducation school = new ResumeEducation ();
        assertTrue (school.isEditViewPresent ());
        assertTrue (school.isEducationPresent (), "is Education there?");

        // work around - ANGCGS-854
        assertTrue (school.enterSchoolState (0, msUW.getAddress ().getState ()));
        assertTrue (school.enterStartDate (0, msUW.getStartDate ()));
        assertTrue (school.enterEndDate (0, msUW.getCompletionDate ()));
        msUW.setDegreeType ("");
        msUW.setGpa (null);
        msUW.setDetails (null);

        assertTrue (school.enterSchoolState (1, bsOSU.getAddress ().getState ()));
        assertTrue (school.enterStartDate (1, bsOSU.getStartDate ()));
        assertTrue (school.enterEndDate (1, bsOSU.getCompletionDate ()));
        bsOSU.setDegreeType ("");
        bsOSU.setGpa (null);
        bsOSU.setDetails (null);
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));
        // end work around - ANGCGS-854

        // Test: adding one more education history after file upload - ANGCGS-759
        assertTrue (school.clickAdd ());
        assertTrue (school.enterEducationDetails (2, msUO));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        verifyEducation (school.getEducation (0), msUW);
        verifyEducation (school.getEducation (1), bsOSU);
        verifyEducation (school.getEducation (2), msUO);
        verifyEducation (school.getEducations (), testResume.getResumeId ());

        // Test: delete educations - last one
        assertTrue (school.clickDelete (2));
        assertTrue (school.clickCancelDelete ());
        assertTrue (school.isSectionPresent (2));

        assertTrue (school.clickDelete (2));
        assertTrue (school.clickYesDelete ());
        assertTrue (school.isSectionDeleted (2));

        // Test: delete 1st section, expect 2nd section to move up
        assertTrue (school.clickDelete (0));
        assertTrue (school.clickYesDelete ());
        assertTrue (school.isSectionDeleted (1));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        verifyEducation (school.getEducation (0), bsOSU);
        verifyEducation (school.getEducations (), testResume.getResumeId ());

        // Test: delete entire Education section
        assertTrue (school.clickDeleteEducation ());
        assertTrue (school.clickCancelDelete ());
        assertTrue (school.isEducationPresent ());

        assertTrue (school.clickDeleteEducation ());
        assertTrue (school.clickYesDelete ());
        assertTrue (school.isEducationDeleted ());
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));
        assertTrue (getResume (testResume.getResumeId ()).getResume ().getEducation ().getSchools ().size () == 0);

        // Test: add Education section back
        assertTrue (school.insertSection (EDUCATION));
        assertTrue (school.isEducationPresent (), "is Education there?");
        assertTrue (school.clickAdd ());
        assertTrue (school.enterEducationDetails (0, msUO));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));
        verifyEducation (school.getEducations (), testResume.getResumeId ());
    }
}
