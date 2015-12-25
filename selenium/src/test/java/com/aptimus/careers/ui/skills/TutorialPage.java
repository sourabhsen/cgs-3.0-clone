package com.aptimus.careers.ui.skills;

public class TutorialPage extends MainSkill {

    private final String page1 = "div#cm-0";
    private final String page2 = "div#cm-1";
    private final String page3 = "div#cm-2";

    public boolean clickUseThisTool () {
        return click (editCareerGoals + " a.edit-career-goal-link.pull-right");
    }

    public boolean isTutorialPageHidden () {
        waitForElement (container + " div.sb-coachmark");
        return noSuchElementPresent (container + " div.sb-coachmark " + page1);
    }

    public boolean isTutorialPagePresent () {
        boolean status = waitUntilVisible (container + " div.sb-coachmark " + page1);
        status &= waitUntilVisible (page1 + " h3.popover-title");
        status &= waitUntilVisible (page1 + " div.popover-content div#popover-text");
        status &= waitUntilVisible (page1 + " div.popover-content div.buttons");
        return status;
    }

    public boolean clickDonotShow () {
        return click ("input#skipBtn");
    }

    public boolean clickNext () {
        return click ("button#nextBtn");
    }

    public boolean clickBack () {
        return click ("a#prevBtn");
    }

    public boolean isPageOnePresent () {
        return scrollTo (waitForElementVisible (page1)).isDisplayed ();
    }

    public String getPageOneTitle () {
        return getText (page1 + " h3.popover-title");
    }

    public String getPageOneParagraphs () {
        return getText (page1 + " div#popover-text");
    }

    public boolean isPageTwoPresent () {
        return scrollTo (waitForElementVisible (page2)).isDisplayed ();
    }

    public String getPageTwoTitle () {
        return getText (page2 + " h3.popover-title");
    }

    public boolean isPageTwoImgPresent () {
        return waitUntilVisible (page2 + " div#popover-text") && isElementVisible (page2 + " div#popover-text img");
    }

    public boolean isPageThreePresent () {
        return scrollTo (waitForElementVisible (page3)).isDisplayed ();
    }

    public String getPageThreeTitle () {
        return getText (page3 + " h3.popover-title");
    }

    public String getPageThreeParagraphs () {
        return getText (page3 + " div#popover-text");
    }

    public boolean isPageThreeImgPresent () {
        return waitUntilVisible (page3 + " div#popover-text") && isElementVisible (page3 + " div#popover-text img");
    }
}
