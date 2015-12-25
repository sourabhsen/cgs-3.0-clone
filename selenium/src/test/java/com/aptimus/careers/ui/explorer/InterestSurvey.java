package com.aptimus.careers.ui.explorer;

import java.util.HashMap;
import java.util.Map;
import com.aptimus.careers.util.PageHelper.Trait;
import com.aptimus.test.selenium.Logging;

public class InterestSurvey extends MainExplorer {

    private final String surveyPage = "ap-interest-survey";

    public boolean isSurveyPresent () {
        boolean status = hasPageLoaded ();
        status &= waitUntilVisible ("div.interest-survey");
        status &= waitUntilVisible ("div.interest-survey " + surveyPage);
        status &= waitUntilVisible (surveyPage);
        status &= waitUntilVisible (surveyPage + " h4.page-title");
        return status;
    }

    @Override
    public String getHeading () {
        return getText ("div.interest-survey h1");
    }

    @Override
    public String getDescription () {
        return getText ("header p.header-desc");
    }

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible ("main div.apt-busy");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible ("main div.apt-busy");
        }

        if (cgBusy) {
            waitForElementInvisible ("main div.apt-busy");
            waitForElementInvisible ("main div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean isPagePresent (int pageIdx) {
        return isTextInElement (surveyPage + " h4.page-title", String.valueOf (pageIdx) + " of 10");
    }

    public String getSurveyQuestion (int idx) {
        String survey = surveyPage + " div.questions:nth-child(" + (idx + 2) + ") div.question-text";
        return getText (survey);
    }

    public boolean answerSurvey (int question, int answer) {
        String survey = surveyPage + " div.questions:nth-child(" + (question + 2) + ") rzslider";
        String pointer = getAttribute (survey + " span.rz-pointer", "aria-valuenow");
        if (Integer.valueOf (answer).equals (Integer.valueOf (pointer))) {
            return true;
        } else {
            boolean status = click (survey + " ul.rz-ticks li:nth-child(" + (answer + 1) + ")");
            status &= waitUntilVisible (survey + " span.rz-pointer[aria-valuenow='" + answer + "']");
            return status;
        }
    }

    public boolean clickNext () {
        boolean status = true;
        try {
            status = click ("button.survey-btn-next");
            status &= waitUntilVisible (surveyPage + " div.apt-busy-inline-small");
            status &= waitUntilVisible (surveyPage + " div.apt-busy-inline-small div.apt-busy-wrapper");
            status &= noSuchElementPresent (surveyPage + " div.apt-busy-inline-small");
        } catch (Exception e) {
            Logging.error ("Interest survey timedout waiting for loading icon:" + e.getMessage ());
        }
        return status;
    }

    public boolean clickPrevious () {
        return click ("button.survey-btn-prev");
    }

    public boolean isSurveyResultPresent () {
        boolean status = waitUntilVisible ("div[ng-controller='InterestSurveyResultsController as surveyResults']");
        status &= waitUntilVisible (".interest-descriptions");
        status &= waitUntilVisible (".interest-survey-disclaimer");
        return status;
    }

    public Map <Trait, String> getScales () {
        Map <Trait, String> scales = new HashMap <Trait, String> ();
        for (Trait trait : Trait.values ()) {
            String pct = getText ("div[data-cat='" + trait + "'] div.interest-chart h4.text-center");
            scales.put (trait, pct.replace ("%", ""));
        }
        return scales;
    }

    public String getInterestDesc (Trait trait) {
        click ("div.pointer[data-cat='" + trait + "'] div.interest-block");
        return getAttribute ("div.interest-descriptions p.ng-binding[aria-hidden='false']", "textContent");
    }

    public boolean clickRetakeAssessment () {
        return click ("div.interest-descriptions a") && noSuchElementPresent ("div.interest-chart");
    }
}
