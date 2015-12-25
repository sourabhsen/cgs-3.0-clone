package com.aptimus.careers.ui.skills;

import com.aptimus.careers.ui.MainCareer;

public class MainSkill extends MainCareer {

    protected final String container       = "main#main-content-container ";
    protected final String sbListContainer = "div#sb-skillListContainer";
    protected final String editCareerGoals = "div.sb-edit-goals";
    private final String   intro           = "div.skill-builder-intro-container";

    public boolean areAllModulesPresent () {
        boolean status = waitUntilVisible (container + " div#page-header");
        status &= waitUntilVisible (container + editCareerGoals);
        status &= waitUntilVisible (container + sbListContainer);
        status &= waitUntilVisible (editCareerGoals + " a.edit-career-goal-link");
        status &= waitUntilVisible (sbListContainer + " div.grey-bar div.results-count");
        status &= waitForElementInvisible (intro + " div.skill-nogoals-desc");
        status &= waitForElementInvisible (intro + " a.sb-button");
        status &= waitForElementInvisible (intro + " div.sb-image");
        return status;
    }

    public String getHeadingText () {
        return getText (container + " main p.ng-scope");
    }

    public String getCountHeader () {
        return getText (sbListContainer + " div.grey-bar h5.result-label");
    }

    public boolean isEditCareerGoalsPresent () {
        return isElementPresent (editCareerGoals + " a.edit-career-goal-link");
    }

    public boolean isHelperLinkPresent () {
        return waitUntilVisible (editCareerGoals + " a.edit-career-goal-link.pull-right");
    }

    public String getNoGoalsDescription () {
        return getText (intro + " div.sb-no-goals div.skill-nogoals-desc");
    }

    public boolean isSetCareerGoalsPresent () {
        return waitUntilVisible (intro + " div.sb-no-goals a.sb-button");
    }
}
