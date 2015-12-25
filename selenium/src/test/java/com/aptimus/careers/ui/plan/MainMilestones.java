package com.aptimus.careers.ui.plan;

import org.openqa.selenium.By;
import com.aptimus.careers.dto.milestones.Milestone;
import com.aptimus.careers.dto.milestones.Stage;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.util.PageHelper.Tool;

public class MainMilestones extends MainCareer {

    private final String container = "main#main-content-container";
    private final String toolBtn   = " div.milestone-content-details article a.button";
    private String       currStage = container + " section.milestone-activity div#%s";

    public boolean areAllModulesPresent () {
        String detail = container + " header";
        String status = container + " section.milestone-activity";
        waitForElement (detail + " ol.breadcrumb");
        waitForElement (detail + " h1.ng-binding + p[ng-bind='milestone.details.description']");
        waitForElement (container + " div.milestone-nav");
        waitForElement (status + " div.activity-checkbox");
        waitForElement (status + " div.milestone-activity-title > h2 + p");
        waitForElement (status + " div.milestone-info");
        return true;
    }

    public boolean isMilestonePresent (Milestone milestone) {
        boolean status = isTextInElement ("header li.ng-scope.active span.ng-binding", milestone.number);
        status &= waitUntilVisible (container + " section.milestone-activity");
        return status;
    }

    public String getHeaderTitle () {
        return getText (container + " header h1.ng-binding");
    }

    public String getDescription () {
        return getText (container + " header p[ng-bind='milestone.details.description']");
    }

    public Stage getStage (String id) {
        String item = String.format (currStage, id);
        scrollTo (waitForElementVisible (item));

        Stage stage = new Stage ();
        stage.setId (id);
        stage.markDone (isElementVisible (item + " div.activity-checkbox div.checkbox-on"));
        stage.setStageNumber (getText (item + " div.milestone-sequence"));
        stage.setTitle (getText (item + " div.milestone-activity-title > h2"));
        stage.setDescription (getText (item + " div.milestone-activity-title > p"));

        String tool = item + " div.milestone-info div[ng-if='activity.contentType'] span.icon-symbol-tool";
        stage.forTool (isElementPresent (tool));
        stage.setDuration (getAttribute (item + " div.milestone-info span[ng-bind='activity.time']", "textContent"));
        return stage;
    }

    public boolean isPrevEnabled () {
        return isElementPresent (container + " div.milestone-nav span.icon-previous");
    }

    public boolean isNextEnabled () {
        return isElementPresent (container + " div.milestone-nav span.icon-next");
    }

    public boolean isStageDone (Stage stage) {
        String curr = String.format (currStage, stage.getId ());
        scrollTo (waitForElementVisible (curr + " div.activity-checkbox"));
        return isElementPresent (curr + " div.activity-checkbox div.checkbox-on");
    }

    public boolean markStageDone (Stage stage) {
        String curr = String.format (currStage, stage.getId ()) + " div.activity-checkbox ";
        String off = curr + "div.checkbox-off", on = curr + "div.checkbox-on";
        boolean status = true;

        if (isElementPresent (off)) {
            status &= click (off);
            status &= waitUntilVisible (on);
        } else {
            status &= click (on);
            status &= waitUntilVisible (off);
        }
        return status;
    }

    public boolean markAsComplete (Stage stage) {
        String curr = String.format (currStage, stage.getId ());
        curr += " div.milestone-complete-footer div.activity-checkbox ";
        String off = curr + "div.checkbox-off", on = curr + "div.checkbox-on";
        boolean status = true;

        if (isElementPresent (off)) {
            status &= click (off);
            status &= waitUntilVisible (on);
        } else {
            status &= click (on);
            status &= waitUntilVisible (off);
        }
        return status;
    }

    public boolean clickStage (Stage stage) {
        String curr = String.format (currStage, stage.getId ());
        boolean status = click (curr + " div.milestone-activity-title h2");
        status &= waitUntilVisible (curr + " div.milestone-content-details article");
        return status;
    }

    public boolean isMilestoneDone (Stage stage) {
        boolean status = waitUntilVisible (container + " span.icon-check-lg");
        status &= waitUntilVisible (container + " div.milestone-status svg-wrap.congrats-ribbon");
        if (!stage.getStageNumber ().startsWith ("10"))
            status &= waitUntilVisible (container + " div.milestone-status a.button");
        return status;
    }

    public boolean clickPreviousMilestone () {
        return click (By.partialLinkText ("PREVIOUS MILESTONE"));
    }

    public boolean clickNextMilestone () {
        return click (By.partialLinkText ("NEXT MILESTONE"));
    }

    public boolean clickContinue () {
        return click (container + " div.milestone-status a.button");
    }

    public boolean clickHome () {
        hover ("nav#floating-nav div.nav-dashboard-icon");
        return click ("nav#floating-nav div.nav-dashboard-icon");
    }

    public boolean clickNavMilestone (Milestone milestone) {
        String nav = "nav#floating-nav a." + milestone.css.replace ("ms-", "") + " span.item-title";
        hoverNav ();
        return click (nav);
    }

    public boolean clickNavTool (Tool tool) {
        String nav = "nav#floating-nav a." + tool + " span.item-title";
        hoverNav ();
        return click (nav);
    }

    private void hoverNav () {
        String nav = "nav#floating-nav div.nav-wrapper";
        if (isElementPresent (nav)) {
            waitUntilVisible (nav);
            hover (nav);
        }
    }

    public boolean isToolPresent (Stage stage) {
        String curr = String.format (currStage, stage.getId ());
        scrollTo (waitForElementVisible (curr + " div.milestone-content-details"));
        return isElementVisible (curr + toolBtn);
    }

    public boolean clickToolButton (Stage stage) {
        return click (String.format (currStage, stage.getId ()) + toolBtn);
    }

    public String getMilestoneCompletionMessage () {
        String message = "section[ng-show='milestone.details.completed']";
        waitUntilVisible (message);
        return getText (message + " div.primary p");
    }

    public boolean isStageCollapsed (String stageId) {
        return isElementPresent ("div#" + stageId + " > div.primary > div.milestone-content-details.collapse");
    }

    public boolean isStageExpanded (String stageId) {
        return isElementPresent ("div#" + stageId + " > div.primary > div.milestone-content-details.in");
    }

    public boolean isMilestoneHighlighted (Milestone milestone) {
        String css = milestone.css.replace ("ms-", "");
        return isElementPresent ("nav#floating-nav div.navList.active." + css + " div." + css + "-icon");
    }
}
