package com.aptimus.careers.test.resume;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.resume.section.SummaryQualifications;
import com.thedeanda.lorem.LoremIpsum;

@Test (groups = { "ResumeBuilder" })
public class SummaryTestSuite extends ResumeTestBase {

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteAllSavedResumes ();
    }

    public void checkSummaryOfQualifications () {
        String success = "Resume saved at";
        String infotip = "This section is your chance to quickly tell the hiring manager why YOU are the right person for the job";
        String summaryInfo = LoremIpsum.getInstance ().getWords (30);

        MainResume resume = new MainCareer ().gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.createNewResume (generateRandomTitle ()));

        // Test: save summary minus contact info
        SummaryQualifications summary = new SummaryQualifications ();
        assertTrue (summary.isEditViewPresent ());
        assertTrue (summary.isSummaryPresent (), "is Summary of Qualifications there?");
        assertTrue (summary.enterSummary ("some summary"));
        assertTrue (summary.clickSave ());
        assertTrue (summary.isSuccessPresent (success));

        String resumeId = summary.getResumeId ();
        assertEquals (summary.getSummary (), getResume (resumeId).getResume ().getSummary ().getUserSummary ());

        // Test: try infotip
        assertTrue (summary.getSummaryInfoTip ().contains (infotip));

        // Test: update summary
        assertTrue (summary.enterSummary (summaryInfo));
        assertTrue (summary.clickSave ());
        assertTrue (summary.isSuccessPresent (success));

        // Test: go back to list view, click edit
        assertTrue (summary.clickBackToListView ());
        assertTrue (resume.isResumeListPresent ());
        assertTrue (resume.clickEdit (resumeId));
        assertTrue (summary.isEditViewPresent ());
        assertEquals (summary.getSummary (), summaryInfo);
    }

    public void checkSummaryUploadFile () {
        String sum = "I am really good at stuff *I have done this before *I have made the company a lot of money, extensive volunteer work at American Heart Association";
        uploadResumeDoc ();

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        MainResume resume = dashboard.gotoResumeBuilder ();
        assertTrue (resume.checkLoadingIcon ());
        assertTrue (resume.isResumeListPresent ());

        UserResume testResume = resume.getResume (1);
        assertTrue (resume.clickEdit (testResume.getResumeId ()));

        // Test: verified summary
        SummaryQualifications summary = new SummaryQualifications ();
        assertTrue (summary.isEditViewPresent ());
        assertTrue (summary.isSummaryPresent ());
        assertEquals (summary.getSummary (), sum);
    }
}
