package com.aptimus.careers.test.resume;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.resume.Contact;
import com.aptimus.careers.dto.resume.Education.School;
import com.aptimus.careers.dto.resume.Experience.Employer;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.resume.EditView;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.resume.section.JobExperience;
import com.aptimus.careers.ui.resume.section.ResumeContact;
import com.aptimus.careers.ui.resume.section.ResumeEducation;
import com.aptimus.careers.ui.resume.section.SummaryQualifications;
import com.aptimus.careers.util.PageHelper.ResumeSamples;
import com.aptimus.careers.util.TestHelper;
import com.thedeanda.lorem.LoremIpsum;

@Test (groups = { "ResumeBuilder" })
public class ResumeBuilderTestSuite extends ResumeTestBase {

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteAllSavedResumes ();
    }

    public void checkAllModules () {
        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.areAllModulesPresent ());
        assertEquals (resume.getHeading (), "Resume Builder");
        assertTrue (resume.isCreateNewPresent (), "Create New Resume");
        assertTrue (resume.isImportResumePresent (), "Upload From File");

        assertTrue (resume.createNewResume (generateRandomTitle ()));
        EditView editor = new EditView ();
        assertTrue (editor.isEditViewPresent ());

        // Test: trying Samples
        assertTrue (editor.clickSamples ());
        assertTrue (editor.getSamplesDescription ().length () > 10);
        for (ResumeSamples sample : ResumeSamples.values ()) {
            assertTrue (editor.clickResumeSample (sample));
            assertTrue (editor.closeSample ());
        }
    }

    public void createResume () {
        String success = "Resume saved at";
        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());

        // Test: click create new resume, empty resume title
        assertTrue (resume.isCreateNewPresent (), "Create New Resume");
        assertTrue (resume.clickCreateNewResume ());
        assertTrue (resume.clickCreate ());
        assertEquals (resume.getResumeTitleError (), "Resume title is required.");
        assertTrue (resume.clickCancel ());

        // Test: click create new resume again, title name is > 75 chars - ANGCGS-564
        String title = "selenium - " + TestHelper.dummyString (75);
        assertTrue (resume.createNewResume (title));

        // Test: check all sections present
        ResumeContact contact = new ResumeContact ();
        assertTrue (contact.isEditViewPresent ());
        assertTrue (contact.isContactPresent (), "is resume contact there?");
        String resumeId = contact.getResumeId ();

        SummaryQualifications summary = new SummaryQualifications ();
        assertTrue (summary.isSummaryPresent ());

        assertTrue (new JobExperience ().isExperiencePresent (), "is Professional Experience there?");
        assertTrue (new ResumeEducation ().isEducationPresent (), "is Education there?");

        // Test: go back to list view
        assertTrue (contact.clickBackToListView ());
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());
        assertTrue (resume.setPublic (resumeId));
        UserResume uiResume = resume.getResume (1);
        UserResume svcResume = getResume (resumeId);
        svcResume.getResume ().setPrivacySetting ("PUBLIC");
        assertEquals (uiResume.getName (), title.substring (0, 75));
        assertEquals (svcResume.getName (), title.substring (0, 75));
        verifyResumeList (uiResume, svcResume);

        // Test: click edit, fill out minimum required fields
        assertTrue (resume.clickEdit (resumeId));
        assertTrue (contact.isEditViewPresent ());
        Contact testContact = minContactInfo ();
        assertTrue (contact.enterContactDetails (testContact));
        String summaryInfo = LoremIpsum.getInstance ().getWords (30);
        assertTrue (summary.enterSummary (summaryInfo));
        assertTrue (summary.clickSave ());
        assertTrue (summary.isSuccessPresent (success));

        // Test: rename resume title with > 75 chars - ANGCGS-564
        assertEquals (contact.getResumeTitle (), title.substring (0, 75));
        title = "selenium dup - " + TestHelper.dummyString (75);
        assertTrue (contact.enterNewTitle (title));
        assertTrue (contact.clickSave ());
        assertTrue (contact.isSuccessPresent (success));

        svcResume = getResume (resumeId);
        assertEquals (svcResume.getName (), title.substring (0, 75));
        assertEquals (summaryInfo, svcResume.getResume ().getSummary ().getUserSummary ());
        verifyContact (testContact, svcResume.getResume ().getContact ());

        // Test: another try, go back to list view, leave the page
        assertTrue (contact.clickBackToListView ());
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());
        assertEquals (resume.getPrivacySetting (resumeId), "PUBLIC");
        assertEquals (resume.getResume (1).getName (), title.substring (0, 75));

        // Test: delete resume
        assertTrue (resume.clickDelete (resumeId));
        assertTrue (resume.clickCancelDelete ());
        assertTrue (resume.clickDelete (resumeId));
        assertTrue (resume.clickYesDelete ());
    }

    public void testDuplicateResume () {
        String error = "Resume already exists with the given file name.";
        String success = "Resume saved at";
        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());

        // Test: click create new resume
        String title = generateRandomTitle ();
        assertTrue (resume.isCreateNewPresent (), "Create New Resume");
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.createNewResume (title));

        // Test: check all sections present
        Contact testContact = contactInfo ();
        ResumeContact contact = new ResumeContact ();
        assertTrue (contact.isEditViewPresent ());
        assertTrue (contact.isContactPresent (), "is resume contact there?");
        assertTrue (contact.enterContactDetails (testContact));

        String testSummary = LoremIpsum.getInstance ().getWords (30);
        SummaryQualifications summary = new SummaryQualifications ();
        assertTrue (summary.isSummaryPresent ());
        assertTrue (summary.enterSummary (testSummary));

        Employer healthTrio = HealthTrio ();
        Employer impactEdu = ImpactEdu ();
        JobExperience work = new JobExperience ();
        assertTrue (work.isExperiencePresent (), "is Professional Experience there?");
        assertTrue (work.clickAdd ());
        assertTrue (work.enterJobDetails (0, healthTrio));
        assertTrue (work.clickAdd ());
        assertTrue (work.enterJobDetails (1, impactEdu));

        School bsOSU = bsOSU ();
        School msUW = msUW ();
        ResumeEducation school = new ResumeEducation ();
        assertTrue (school.isEducationPresent (), "is Education there?");
        assertTrue (school.clickAdd ());
        assertTrue (school.enterEducationDetails (0, bsOSU));
        assertTrue (school.clickAdd ());
        assertTrue (school.enterEducationDetails (1, msUW));
        assertTrue (school.clickSave ());
        assertTrue (school.isSuccessPresent (success));
        String resumeId = school.getResumeId ();

        // Test: go back to list view
        assertTrue (school.clickBackToListView ());
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());

        // Test: create resume with same title
        assertTrue (resume.startNewResume (title));
        assertEquals (resume.getResumeTitleError (), error);
        assertTrue (resume.clickCancel ());

        // Test: create duplicate resume with same title
        assertTrue (resume.clickDuplicate (resumeId));
        assertTrue (resume.enterNewResumeTitle (title));
        assertTrue (resume.clickCreate ());
        assertEquals (resume.getResumeTitleError (), error);
        assertTrue (resume.clickCancel ());

        // Test: another try, create duplicate resume
        assertTrue (resume.clickDuplicate (resumeId));
        assertTrue (resume.enterNewResumeTitle ("dup - " + title));
        assertTrue (resume.clickCreate ());
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());

        // Test: compare duplicate resume against original
        UserResume dupResume = resume.getResume (1);
        assertEquals (dupResume.getName (), "dup - " + title);
        assertTrue (resume.clickEdit (dupResume.getResumeId ()));
        assertTrue (contact.isEditViewPresent ());

        assertTrue (contact.enterNewTitle (title));
        assertTrue (contact.clickSave ());

        assertTrue (contact.enterNewTitle ("dup - " + title));
        assertTrue (contact.clickSave ());
        assertTrue (school.isSuccessPresent (success));

        verifyContact (contact.getContact (), testContact);
        assertEquals (summary.getSummary (), testSummary);
        verifyExperience (work.getExperiences (), resumeId);
        verifyEducation (school.getEducations (), resumeId);
    }

    // CGS-460
    @Test (enabled = false)
    public void checkMaxTwentyFiveResumes () {
        String max25Message = "You reached max number of allowed resumes.";
        createResumes (25);

        // Test: check maximum resumes limit message
        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());

        assertTrue (resume.startNewResume (generateRandomTitle ()));
        assertTrue (resume.getResumeLimitMessage (max25Message));
    }
}
