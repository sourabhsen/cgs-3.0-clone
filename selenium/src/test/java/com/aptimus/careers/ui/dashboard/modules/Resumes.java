package com.aptimus.careers.ui.dashboard.modules;

import com.aptimus.careers.ui.dashboard.MainDashboard;

public class Resumes extends MainDashboard {

    private final String resume = resumes + " div.resume-item[data-resume-id='%s']";

    public boolean isResumesPresent () {
        boolean status = waitUntilVisible (resumes + " div.resume-list-top h3[role='heading']");
        status &= waitUntilVisible (resumes + " div.resume-list");
        status &= waitUntilVisible (resumes + " div.resume-list-bottom");
        return status;
    }

    public String getModuleHeader () {
        return getText (resumes + " h3[role='heading']");
    }

    public String getNoResumesText () {
        return getText (resumes + " div.resume-list p");
    }

    public boolean clickSeeAll () {
        return click (resumes + " a.pull-left[ng-show='DashCtrl.rlSize > 0']");
    }

    public boolean clickNewResume () {
        return click (resumes + " a[ng-show='DashCtrl.rlSize > 0']");
    }

    public boolean clickGetStartedNow () {
        return click (resumes + " a[ng-show='DashCtrl.rlSize === 0']");
    }

    public boolean clickResumeTitle (String resumeId) {
        return click (String.format (resume, resumeId) + " a[title='Edit']");
    }

    public boolean clickResumePreview (String resumeId) {
        return click (String.format (resume, resumeId) + " a[title='Preview']");
    }

    public boolean isResumePublic (String resumeId) {
        return waitUntilVisible (String.format (resume, resumeId) + " div.additional-info");
    }
}
