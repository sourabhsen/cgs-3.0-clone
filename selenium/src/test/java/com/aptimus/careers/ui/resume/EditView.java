package com.aptimus.careers.ui.resume;

import java.text.SimpleDateFormat;
import org.openqa.selenium.By;
import com.aptimus.careers.util.PageHelper.ResumeSamples;
import com.aptimus.careers.util.PageHelper.ResumeSection;

public class EditView extends MainResume {

    protected final SimpleDateFormat fmt       = new SimpleDateFormat ("MM/yyyy");
    protected final String           container = "section#resume-builder-container";
    private final String             title     = container + " section.resume-title";
    private final String             mainTab   = container + " div.tab-pane.active";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (container + " div.rb-busy-inline");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (container + " div.rb-busy-inline");
        }

        if (cgBusy) {
            waitForElementInvisible (container + " div.rb-busy-inline");
            waitForElementInvisible (container + " div.apt-busy-wrapper");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean isEditViewPresent () {
        boolean status = waitUntilVisible (container + " ul.nav-tabs li[heading='Editor']");
        status &= waitUntilVisible (container + " ul.nav-tabs li[heading='Samples']");
        status &= waitUntilVisible (container + " ul.nav-tabs li.list-view");
        status &= waitUntilVisible (container + " div#builder-resume-edit");

        while (!noSuchElementPresent ("div.modal-backdrop"))
            wait (200);

        status &= isTitlePresent ();
        return status;
    }

    public boolean clickSamples () {
        return click (By.linkText ("Samples"));
    }

    public String getSamplesDescription () {
        return getText (mainTab + " h2#sample-resume-heading");
    }

    public boolean clickResumeSample (ResumeSamples sample) {
        return click (mainTab + " div.button-col[button-text='" + sample.btn () + "'] a") && waitUntilVisible (modal);
    }

    public boolean closeSample () {
        return click (modal + " a.modal-close-link span") && noSuchElementPresent (modal);
    }

    private boolean isTitlePresent () {
        boolean status = waitUntilVisible (title);
        status &= waitUntilVisible (title + " input[title='Resume name']");
        status &= waitUntilVisible (title + " div.editor-controls");
        return status;
    }

    public boolean enterNewTitle (String name) {
        return setText (title + " input[title='Resume name']", name);
    }

    public String getResumeTitle () {
        return getAttribute (title + " input[title='Resume name']", "value");
    }

    public boolean clickBackToListView () {
        return click (container + " ul.nav-tabs li.list-view a");
    }

    public boolean insertSection (ResumeSection section) {
        return click (By.linkText ("Insert a section")) && click (By.linkText (section.name ().replace ("_", " ")));
    }

    public boolean clickSave () {
        boolean status = click (container + " div.resume-editor button[ng-click='saveWait = editorCtrl.saveResume()']");
        status &= checkLoadingIcon ();
        return status;
    }

    public boolean isErrorPresent (String error) {
        return isTextInElement (container + " div.resume-editor div.alert-danger[aria-hidden='false']", error);
    }

    public boolean isSuccessPresent (String success) {
        String upper = container + " div.resume-editor div.editor-controls small.save-status";
        String lower = container + " div.resume-editor div[role='log'] small.save-status";
        return isTextInElement (upper, success) && isTextInElement (lower, success);
    }

    public String getResumeId () {
        return getAttribute (container + " div#builder-resume-edit", "data-resume-id");
    }
}
