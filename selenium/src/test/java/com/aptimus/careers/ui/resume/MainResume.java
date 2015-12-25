package com.aptimus.careers.ui.resume;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.resume.Resumes.Resume;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.ui.MainCareer;

public class MainResume extends MainCareer {

    protected final String modal      = "body.modal-open > div.modal";
    private final String   container  = "div#resume-builder-container";
    private final String   resumeItem = container + " [data-resume-id='%s']";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (container + " div.apt-busy-fixed-center");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (container + " div.apt-busy-fixed-center");
        }

        if (cgBusy) {
            waitForElementInvisible (container + " div.apt-busy-fixed-center");
            waitForElementInvisible (container + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean areAllModulesPresent () {
        boolean status = waitUntilVisible (container);
        status &= waitUntilVisible (container + " dl.cta dt#new-resume-label");
        status &= waitUntilVisible (container + " dl.cta dt#upload-resume-label");
        return status;
    }

    public boolean isCreateNewPresent () {
        boolean status = waitUntilVisible (container + " dt#new-resume-label");
        status &= waitUntilVisible (container + " dd#new-resume-desc");
        return status;
    }

    public boolean isImportResumePresent () {
        boolean status = waitUntilVisible (container + " dt#upload-resume-label");
        status &= waitUntilVisible (container + " dd#upload-resume-desc");
        return status;
    }

    public boolean clickCreateNewResume () {
        boolean status = click (container + " dl.cta dt#new-resume-label button");
        status &= waitUntilVisible (modal + " input.form-control");
        return status;
    }

    public boolean clickCreate () {
        return click (modal + " button[ng-click*='submit']");
    }

    public boolean clickCancel () {
        boolean status = click (modal + " a[ng-click='$close();']");
        status &= waitForElementInvisible (modal + " input.form-control");
        return status;
    }

    public String getResumeTitleError () {
        return getText (modal + " small.alert");
    }

    public boolean createNewResume (String title) {
        boolean status = clickCreateNewResume ();
        status &= enterNewResumeTitle (title);
        status &= clickCreate ();
        return status;
    }

    public boolean enterNewResumeTitle (String title) {
        return click (modal + " input.form-control") && setText (modal + " input.form-control", title);
    }

    public boolean startNewResume (String title) {
        boolean status = click (container + " div.resume-list button[aria-label='Start a new resume from scratch']");
        status &= click (By.linkText ("Create new resume"));
        status &= enterNewResumeTitle (title);
        status &= clickCreate ();
        return status;
    }

    public boolean isResumePresent () {
        return waitUntilVisible (container);
    }

    public boolean isResumeListPresent () {
        boolean status = waitUntilVisible (container + " div.resume-list");
        status &= waitUntilVisible (container + " div.resume-list button.dropdown-toggle");
        status &= waitUntilVisible (container + " div.resume-list p.home-desc");

        while (!noSuchElementPresent ("div.modal-backdrop"))
            wait (200);

        return status;
    }

    public UserResume getResume (int idx) {
        return parseResumeEl (scrollTo (waitForElementVisible (container + " div.resume-list div.resume-item:nth-child(" + idx + ")")));
    }

    private UserResume parseResumeEl (WebElement aResume) {
        UserResume resume = new UserResume ();
        resume.setName (getText (aResume, "a.resume-title"));
        resume.setResumeId (aResume.getAttribute ("data-resume-id"));
        resume.setStatus ("COMPLETE");
        resume.setPrimaryInd ("Y");

        Resume res = new Resume ();
        res.setId (resume.getResumeId ());
        res.setPrivacySetting (getText (aResume, "div.rb-resume-icons div[ng-click='lrCtrl.publish(metaInfo)']"));
        resume.setResume (res);
        return resume;
    }

    public String getPrivacySetting (String resumeId) {
        return getText (String.format (resumeItem, resumeId) + " div.rb-resume-icons div[ng-click='lrCtrl.publish(metaInfo)']");
    }

    public boolean setPublic (String resumeId) {
        String item = String.format (resumeItem, resumeId) + " div.rb-resume-icons i.fa-lock";
        return click (item) && checkLoadingIcon ();
    }

    public boolean clickEdit (String resumeId) {
        String item = String.format (resumeItem, resumeId) + " div.rb-resume-icons span.edit.iconSvg svg-wrap";
        return click (item);
    }

    public boolean clickDuplicate (String resumeId) {
        String item = String.format (resumeItem, resumeId) + " div.rb-resume-icons span.duplicate.iconSvg";
        return click (item);
    }

    public boolean clickDelete (String resumeId) {
        String item = String.format (resumeItem, resumeId) + " div.rb-resume-icons span.delete.iconSvg";
        return click (item);
    }

    public boolean clickYesDelete () {
        boolean status = click (modal + " div.resume-builder-modal button[ng-click='$close(true);']");
        status &= waitForElementInvisible (modal + " div.resume-builder-modal");
        return status;
    }

    public boolean clickCancelDelete () {
        boolean status = click (modal + " div.resume-builder-modal a[ng-click='$close(false);']");
        status &= waitForElementInvisible (modal + " div.resume-builder-modal");
        return status;
    }

    public boolean getResumeLimitMessage (String text) {
        return isTextInElement (modal + " small.alert", text);
    }
}
