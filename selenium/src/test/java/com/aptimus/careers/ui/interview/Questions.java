package com.aptimus.careers.ui.interview;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.interview.Question;
import com.aptimus.careers.ui.MainCareer;

public class Questions extends MainCareer {

    private final String container         = "main#main-content-container";
    private final String coachTipContainer = "div.carousel-inner div.item.active training-video div.coaches-tip";
    private final String playlistContainer = "div.questions-list div.timeline div.question.active";
    private final String btnFirstPage      = "div.search-pagination ul.pagination li.pagination-first";
    private final String btnPrevPage       = "div.search-pagination ul.pagination li.pagination-prev";
    private final String btnNextPage       = "div.search-pagination ul.pagination li.pagination-next";
    private final String btnLastPage       = "div.search-pagination ul.pagination li.pagination-last";

    public boolean areAllModulesPresent () {
        boolean status = waitUntilVisible (container);
        status &= waitUntilVisible (container + " section.section-main");
        status &= waitUntilVisible (coachTipContainer);
        status &= waitUntilVisible (playlistContainer);
        status &= waitUntilVisible (container + " input#interview-search");
        return status;
    }

    public boolean isInterviewPresent () {
        boolean status = waitUntilVisible ("section.interview-prep section.section-main");
        status &= waitUntilVisible ("section.interview-prep section.section-main div.carousel");
        status &= waitUntilVisible ("section.interview-prep div.questions-list");
        return status;
    }

    public Question goToQuestion (int qNum) {
        int currQ = getQuestionNumber ();
        if (currQ < qNum)
            for (int i = 1; i <= (qNum - currQ); ++i)
                clickNext (currQ + i);
        else if (currQ > qNum)
            for (int i = 1; i <= (currQ - qNum); ++i)
                clickPrevious (currQ - i);

        Question question = new Question ();
        question.setNumber (getQuestionNumber ());
        question.setTitle (getText (container + " div.carousel-inner div.item.active section.question p"));
        return question;
    }

    private int getQuestionNumber () {
        String q = getText (container + " div.indicators.mini-header");
        return Integer.valueOf (q.replace ("of 24", "").trim ());
    }

    private boolean clickNext (int idx) {
        boolean status = click (By.partialLinkText ("NEXT QUESTION"));
        status &= isTextInElement (playlistContainer + " p.question-meta-info", idx < 10 ? "0" + idx : "" + idx);
        status &= isTextInElement (container + " div.indicators.mini-header", idx + " of 24");
        return status;
    }

    private boolean clickPrevious (int idx) {
        boolean status = click (By.partialLinkText ("PREVIOUS QUESTION"));
        status &= isTextInElement (playlistContainer + " p.question-meta-info", idx < 10 ? "0" + idx : "" + idx);
        status &= isTextInElement (container + " div.indicators.mini-header", idx + " of 24");
        return status;
    }

    public boolean isTranscriptHidden () {
        boolean status = scrollTo (waitForElementVisible (coachTipContainer)).isDisplayed ();
        status &= isElementHidden (coachTipContainer + " div.collapse p");
        return status;
    }

    public boolean clickCoachTip () {
        return click (coachTipContainer + " a.coaches-link");
    }

    public String getCoachTip () {
        return getText (coachTipContainer + " div.in p");
    }

    public Question getSelectedQuestion () {
        WebElement el = scrollTo (waitForElementVisible (playlistContainer));
        Question question = new Question ();
        question.setTitle (getText (el, "p.question-text"));
        question.setNumber (Integer.valueOf (getText (el, "p.question-meta-info")));
        return question;
    }

    public boolean searchQuestion (String keyword) {
        return setText ("input#interview-search", keyword) && click ("button#desktop-submit");
    }

    public boolean isSearchResultPresent () {
        boolean status = waitUntilVisible ("header.section-description");
        status &= waitUntilVisible ("div.section-main");
        status &= waitUntilVisible ("div.section-main div.search-results accordion");
        status &= waitUntilVisible ("div.section-main div.search-pagination");
        return status;
    }

    public boolean clickSearchResultQuestion (int linkNumber) {
        String q = "accordion div.panel:nth-child(" + linkNumber + ")";
        return click (q + " h4.panel-title li.fa span");
    }

    public boolean isVideosPresent (int linkNumber) {
        String q = "accordion div.panel:nth-child(" + linkNumber + ") div.panel-collapse.in";
        boolean status = waitUntilVisible (q);
        status &= isElementVisible (q + " div.panel-body iframe.video-frame");
        status &= isElementVisible (q + " div.panel-body a.coaches-link");
        return status;
    }

    public boolean clickBackToPreparingForInterview () {
        return click (container + " div.tool-previous-page a");
    }

    public boolean isSearchResultsHeaderContains (String text) {
        return isTextInElement ("header.section-description h4", text);
    }

    public boolean isPagerPresent () {
        return scrollTo (waitForElementVisible ("div.search-pagination ul.pagination")).isDisplayed ();
    }

    public boolean isFirstPageButtonEnabled () {
        return !waitForElementVisible (btnFirstPage).getAttribute ("class").contains ("disabled");
    }

    public boolean isPreviousPageButtonEnabled () {
        return !waitForElementVisible (btnPrevPage).getAttribute ("class").contains ("disabled");
    }

    public boolean isNextPageButtonEnabled () {
        return !waitForElementVisible (btnNextPage).getAttribute ("class").contains ("disabled");
    }

    public boolean isLastPageButtonEnabled () {
        return !waitForElementVisible (btnLastPage).getAttribute ("class").contains ("disabled");
    }

    public boolean clickPage (int pageNumber) {
        return click (By.linkText (String.valueOf (pageNumber))) && checkLoadingIcon ();
    }

    public int getPageNumber () {
        return Integer.valueOf (getText ("div.search-pagination ul.pagination li.active"));
    }

    public boolean clickFirstPage () {
        return click (btnFirstPage + " a") && checkLoadingIcon ();
    }

    public boolean clickPreviousPage () {
        return click (btnPrevPage + " a") && checkLoadingIcon ();
    }

    public boolean clickNextPage () {
        return click (btnNextPage + " a") && checkLoadingIcon ();
    }

    public boolean clickLastPage () {
        return click (btnLastPage + " a") && checkLoadingIcon ();
    }
}
