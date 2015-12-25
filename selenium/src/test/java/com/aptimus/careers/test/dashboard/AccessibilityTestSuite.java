package com.aptimus.careers.test.dashboard;

import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.ui.dashboard.MainDashboard;

@Test (groups = { "Accessibility" })
public class AccessibilityTestSuite extends DashboardTestBase {

    public void dashboard () {
        deleteAllSavedResumes ();
        setResumePublic (createResumes (3).get (0).getResumeId ());
        
        MainDashboard dashboard = new MainDashboard ();
        dashboard.navigateRefresh ();
        assertTrue (dashboard.checkLoadingIcon ());
        assertTrue (dashboard.isDashboardPresent ());
        assertTrue (dashboard.accessibilityTest ());
    }
}
