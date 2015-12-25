package com.aptimus.careers.ui.explorer;

import org.openqa.selenium.By;

public class Recommendation extends MainExplorer {

    public boolean areAllModulesPresent () {
        boolean status = super.areAllModulesPresent ();
        status &= waitUntilVisible (mainTab + " div.ng-scope + div.ng-scope");
        status &= waitUntilVisible (mainTab + " section.list-jobs-container");
        return status;
    }

    public boolean isRecommendationsPresent () {
        boolean status = waitUntilVisible ("ul.nav-tabs > li#careerExpRecommendations");
        waitForElement (mainTab + " input[placeholder='Enter program name...']");
        return status;
    }

    public boolean isInterestSurveyPresent () {
        return waitUntilVisible (mainTab + " div#preEducation a.assessmentButton");
    }

    public String getRecommendationsLabel () {
        return getText ("li#careerExpRecommendations");
    }

    public boolean clickRecommendations () {
        return click (By.linkText ("Our Recommendations"));
    }

    public String getProgramName () {
        return getAttribute (mainTab + " a.chosenDegree", "textContent").trim ();
    }

    public boolean enterKeywords (String term) {
        if (isElementHidden (mainTab + " div#postEducation a.chosenDegree"))
            return setText (mainTab + " div#preEducation input", term);
        else {
            boolean status = click (mainTab + " div#postEducation a.chosenDegree");
            status &= setText (mainTab + " div#postEducation input", term);
            return status;
        }
    }

    public String useProgramSearchAutocomplete (int idx) {
        isDropdownPresent ();
        String programAutocomplete = mainTab + " div.primary ul.dropdown-menu li.ng-scope:nth-child(" + idx + ")";
        String programName = getText (programAutocomplete);
        return click (programAutocomplete) && checkLoadingIcon () ? programName : null;
    }

    public boolean isDropdownPresent () {
        return waitUntilVisible (mainTab + " div.primary ul.dropdown-menu");
    }

    @Override
    public String getLocation () {
        return getText (mainTab + " div#postEducation a.location").replace (" .", "");
    }

    public boolean clickInterestAssessment () {
        return click (By.linkText ("Interest Assessment"));
    }

    @Override
    public boolean clickListView () {
        boolean status = click (mainTab + " div[aria-hidden='false'] div.toggle-buttons > button.list-icon");
        status &= waitUntilVisible (mainTab + " section.list-jobs-container career-exp-table");
        return status;
    }

    @Override
    public boolean isListViewPresent () {
        boolean status = waitUntilVisible (mainTab + " div[aria-hidden='false'] div.toggle-buttons > button.tile-icon[aria-disabled='false']");
        status &= waitUntilVisible (mainTab + " section.list-jobs-container career-exp-table");
        return status;
    }

    @Override
    public boolean clickTileView () {
        boolean status = click (mainTab + " div[aria-hidden='false'] div.toggle-buttons > button.tile-icon");
        status &= waitUntilVisible (mainTab + " section.list-jobs-container career-exp-tiles");
        return status;
    }

    @Override
    public boolean isTileViewPresent () {
        boolean status = waitUntilVisible (mainTab + " div[aria-hidden='false'] div.toggle-buttons > button.list-icon[aria-disabled='false']");
        status &= waitUntilVisible (mainTab + " section.list-jobs-container career-exp-tiles");
        return status;
    }
}
