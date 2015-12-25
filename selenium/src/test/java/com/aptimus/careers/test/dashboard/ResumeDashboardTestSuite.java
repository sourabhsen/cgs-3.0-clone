package com.aptimus.careers.test.dashboard;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.dashboard.modules.Resumes;
import com.aptimus.careers.ui.resume.EditView;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.resume.PublishPreview;

@Test (groups = { "Dashboard" })
public class ResumeDashboardTestSuite extends DashboardTestBase {

    @AfterMethod (alwaysRun = true)
    public void afterMethod () {
        deleteAllSavedResumes ();
    }

    public void checkWidgetWithNoResumes () {
        deleteAllSavedResumes ();

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        // Test: check no resumes in widget, click get started
        Resumes resumes = new Resumes ();
        assertTrue (resumes.isResumesPresent ());
        assertEquals (resumes.getNoResumesText (), "You have no saved resumes.");

        // Test: click Resumes widget header
        assertTrue (resumes.clickGetStartedNow ());
        MainResume resumebuilder = new MainResume ();
        assertTrue (resumebuilder.checkLoadingIcon ());
        assertTrue (resumebuilder.isCreateNewPresent ());
    }

    public void checkWidgetWithResumes () {
        String resumeId = createResumes (3).get (0).getResumeId ();
        setResumePublic (resumeId);

        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.isDashboardPresent ());

        // Test: click Resume Title, check for Resume Edit page
        Resumes resumes = new Resumes ();
        assertTrue (resumes.isResumesPresent ());
        assertTrue (resumes.isResumePublic (resumeId));
        assertTrue (resumes.clickResumeTitle (resumeId));

        EditView editview = new EditView ();
        assertTrue (editview.isEditViewPresent ());
        assertTrue (editview.clickClose ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: click preview Link, check for Resume Preview page
        assertTrue (resumes.clickResumePreview (resumeId));
        PublishPreview preview = new PublishPreview ();
        assertTrue (preview.isPublishPreviewPresent ());
        assertTrue (preview.closePreview ());

        MainResume resumebuilder = new MainResume ();
        assertTrue (resumebuilder.checkLoadingIcon ());
        assertTrue (resumebuilder.isResumeListPresent ());
        assertTrue (resumebuilder.clickClose ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: click on See All link
        assertTrue (resumes.clickSeeAll ());
        assertTrue (resumebuilder.checkLoadingIcon ());
        assertTrue (resumebuilder.isResumeListPresent ());
        assertTrue (resumebuilder.clickClose ());
        assertTrue (dashboard.isDashboardPresent ());

        // Test: click on New Resume link
        // assertTrue (resumes.clickNewResume ());
        // not ready yet ... CGS-556
    }
}
