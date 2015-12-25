package com.aptimus.careers.test.resume;

import static com.aptimus.careers.util.PageHelper.ResumeInfoList.AWARDS;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.CERTIFICATIONS;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.HOBBIES;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.LANGUAGES;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.VOLUNTEER;
import static com.aptimus.careers.util.PageHelper.ResumeSection.ADDITIONAL_INFO;
import static org.testng.Assert.assertTrue;
import java.util.Arrays;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.resume.Resumes.AdditionalInfo;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.resume.section.AdditionalInformation;
import com.aptimus.careers.util.PageHelper.ResumeInfoList;

@Test (groups = { "ResumeBuilder" })
public class AdditionalInfoTestSuite extends ResumeTestBase {

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteAllSavedResumes ();
    }

    public void checkAdditionalInfo () {
        String success = "Resume saved at";
        AdditionalInfo infoTest = additionalInfo ();

        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.createNewResume (generateRandomTitle ()));

        // Test: insert all info fields and save
        AdditionalInformation info = new AdditionalInformation ();
        assertTrue (info.isEditViewPresent ());
        assertTrue (info.insertSection (ADDITIONAL_INFO));
        for (ResumeInfoList field : ResumeInfoList.values ()) {
            assertTrue (info.addInfo (field));
            assertTrue (info.isSectionPresent (field));
        }

        // Test: check infotip
        String infotip = "We recommend including up to four types of additional information in this section";
        assertTrue (info.getAdditionalInfoTip ().contains (infotip));
        infotip = "Include the professional skills you have that are relevant for the job";
        assertTrue (info.getSkillsInfoTip ().contains (infotip));
        infotip = "Here is a an example of a professional award";
        assertTrue (info.getAwardsInfoTip ().contains (infotip));
        infotip = "Include the professional certifications you have that are relevant for the job";
        assertTrue (info.getCertsInfoTip ().contains (infotip));
        infotip = "Knowing a foreign language sets you apart from other candidates";
        assertTrue (info.getLanguagesInfoTip ().contains (infotip));
        infotip = "Adding hobbies can help humanize your application";
        assertTrue (info.getHobbiesInfoTip ().contains (infotip));
        infotip = "Volunteer work is an important experience to highlight";
        assertTrue (info.getVolunteersInfoTip ().contains (infotip));
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));

        // Test: enter some info
        assertTrue (info.enterInfo (infoTest));
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));

        String resumeId = info.getResumeId ();
        verifyAdditionalInfo (info.getInfo (), infoTest);

        // Test: go back to list view, click edit
        assertTrue (info.clickBackToListView ());
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());
        assertTrue (resume.clickEdit (resumeId));
        assertTrue (info.isEditViewPresent ());

        // Test: enter some more info
        assertTrue (info.enterInfo (AWARDS, Arrays.asList ("an award")));
        infoTest.setAwards ("an award");
        assertTrue (info.enterInfo (CERTIFICATIONS, Arrays.asList ("a certification")));
        infoTest.setCertifications ("a certification");
        assertTrue (info.enterInfo (LANGUAGES, Arrays.asList ("a language")));
        infoTest.setLanguages ("a language");
        assertTrue (info.enterInfo (HOBBIES, Arrays.asList ("some hobby")));
        infoTest.setPersonalHobbies ("some hobby");
        assertTrue (info.enterInfo (VOLUNTEER, Arrays.asList ("busy volunteer")));
        infoTest.setVolunteerWork ("busy volunteer");
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));

        AdditionalInfo uiInfo = info.getInfo ();
        verifyAdditionalInfo (uiInfo, infoTest);
        verifyAdditionalInfo (uiInfo, resumeId);
    }

    public void addDeleteAdditionalInfo () {
        String success = "Resume saved at";
        AdditionalInfo infoTest = additionalInfo ();
        infoTest.setAwards ("an award");
        infoTest.setCertifications ("a certification");
        infoTest.setLanguages ("a language");
        infoTest.setPersonalHobbies ("some hobby");
        infoTest.setVolunteerWork ("busy volunteer");

        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.createNewResume (generateRandomTitle ()));

        // Test: insert all info fields and save
        AdditionalInformation info = new AdditionalInformation ();
        assertTrue (info.isEditViewPresent ());
        assertTrue (info.insertSection (ADDITIONAL_INFO));
        for (ResumeInfoList field : ResumeInfoList.values ()) {
            assertTrue (info.addInfo (field));
            assertTrue (info.isSectionPresent (field));
        }

        // Test: enter some info
        assertTrue (info.enterInfo (infoTest));
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));

        // Test: delete last entered info
        assertTrue (info.deleteInfo (AWARDS, 2));
        assertTrue (info.deleteInfo (CERTIFICATIONS, 2));
        assertTrue (info.deleteInfo (LANGUAGES, 2));
        assertTrue (info.deleteInfo (HOBBIES, 2));
        assertTrue (info.deleteInfo (VOLUNTEER, 2));
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));

        infoTest = additionalInfo ();
        String resumeId = info.getResumeId ();
        verifyAdditionalInfo (info.getInfo (), infoTest);

        // Test: delete info sections
        for (ResumeInfoList field : ResumeInfoList.values ()) {
            assertTrue (info.clickDelete (field));
            assertTrue (info.clickYesDelete ());
            assertTrue (info.isSectionDeleted (field));
        }
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));

        // Test: adding info sections back
        for (ResumeInfoList field : ResumeInfoList.values ()) {
            assertTrue (info.addInfo (field));
            assertTrue (info.isSectionPresent (field));
        }
        assertTrue (info.enterInfo (infoTest));
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));
        verifyAdditionalInfo (info.getInfo (), infoTest);

        // Test: delete entire Additional Information section
        assertTrue (info.clickDeleteInfo ());
        assertTrue (info.clickCancelDelete ());
        assertTrue (info.isAdditionalInfoPresent ());

        assertTrue (info.clickDeleteInfo ());
        assertTrue (info.clickYesDelete ());
        assertTrue (info.isInfoDeleted ());
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));

        // Test: add Additional Information section back
        assertTrue (info.insertSection (ADDITIONAL_INFO));
        assertTrue (info.isAdditionalInfoPresent ());
        for (ResumeInfoList field : ResumeInfoList.values ()) {
            assertTrue (info.addInfo (field));
            assertTrue (info.isSectionPresent (field));
        }
        assertTrue (info.enterInfo (infoTest));
        assertTrue (info.clickSave ());
        assertTrue (info.isSuccessPresent (success));
        verifyAdditionalInfo (info.getInfo (), resumeId);
    }
}
