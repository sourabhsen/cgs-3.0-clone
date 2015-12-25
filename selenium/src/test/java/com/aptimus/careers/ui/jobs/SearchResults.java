package com.aptimus.careers.ui.jobs;

import org.openqa.selenium.By;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.util.PageHelper.SortBy;

public class SearchResults extends MainJob {

    private final String container    = "div.resultsContent";
    private final String resultHeader = container + " div.resultsHeader";
    private final String btnFirstPage = "div.resultsContainer ul.pagination li.pagination-first";
    private final String btnPrevPage  = "div.resultsContainer ul.pagination li.pagination-prev";
    private final String btnNextPage  = "div.resultsContainer ul.pagination li.pagination-next";
    private final String btnLastPage  = "div.resultsContainer ul.pagination li.pagination-last";

    public SearchResults () {
        aJob = "div.resultsContainer div.job[id='%s']";
        jobs = "div.resultsContainer div.job[id]";
    }

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible ("div.searchResults div.apt-busy-fixed-center");
        if (!cgBusy) {
            wait (1000);
            cgBusy = isElementVisible ("div.searchResults div.apt-busy-fixed-center");
        }

        if (cgBusy) {
            waitForElementInvisible ("div.searchResults div.apt-busy-fixed-center");
            waitForElementInvisible ("div.searchResults div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean areAllModulesPresent () {
        boolean status = waitUntilVisible (container);
        status &= waitUntilVisible (resultHeader);
        status &= waitUntilVisible (resultHeader + " div.sort-by");
        String job = container + " > div.resultsContainer";
        status &= waitUntilVisible (job);
        status &= waitUntilVisible (job + " div.jobInfo + div.jobIcons");
        status &= waitUntilVisible (job + " div.jobInfo > div.title + div.jobsearch-company + div.location + small.postedDate");
        status &= waitUntilVisible (job + " div.jobIcons div.save-job");
        status &= waitUntilVisible (job + " ul.pagination");
        status &= areSearchFieldsPresent ();
        return status;
    }

    public boolean isSearchResultsPresent () {
        boolean status = waitUntilVisible (container + " > div.resultsContainer");
        status &= waitUntilVisible (resultHeader);
        status &= waitUntilVisible (resultHeader + " div.sort-by");
        status &= areSearchFieldsPresent ();
        return status;
    }

    @Override
    public boolean doSearch (String keywords, String location) {
        boolean status = super.doSearch (keywords, location);
        status &= checkLoadingIcon ();
        return status;
    }

    public int getResultsCount () {
        String count = getText (resultHeader + " > ng-pluralize[count='jobsModel.model.totalNumberOfResults']");
        if (count.contains ("No results"))
            return 0;
        else {
            return Integer.parseInt (count.replaceAll (" result(s)?", "").replaceAll ("\\,", ""));
        }
    }

    public boolean noResultsFound () {
        boolean status = noSuchElementPresent (container + " > div.resultsContainer > div.job");
        return status;
    }

    public String getSearchResultsHeader () {
        String text = getText (resultHeader + " ng-pluralize");
        if (isElementVisible (resultHeader + " ng-pluralize + span[aria-hidden='false']"))
            text += " " + getText (resultHeader + " ng-pluralize + span[aria-hidden='false']");

        if (isElementVisible (resultHeader + " span.title-case[aria-hidden='false']"))
            text += " " + getText (resultHeader + " span.title-case[aria-hidden='false']");

        return text;
    }

    public boolean isSearchResultsHeaderContains (String text) {
        return isTextInElement (resultHeader, text);
    }

    public boolean setSortBy (SortBy sortBy) {
        String dropDown = resultHeader + " div.sort-by span.ui-select-match-text span";
        return click (dropDown) && click (By.linkText (sortBy.css ())) && checkLoadingIcon ();
    }

    public boolean isViewMyApplicationStatusLinkPresent (Job job) {
        return isElementVisible (String.format (aJob, job.getJobId ()) + " a.applied-link");
    }

    public boolean clickViewMyApplicationStatus (Job job) {
        return click (String.format (aJob, job.getJobId ()) + " a.applied-link");
    }

    public int getPageNumber () {
        return Integer.valueOf (getText ("div.resultsContainer ul.pagination li.active"));
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

    public boolean clickPage (int pageNumber) {
        return click (By.linkText (String.valueOf (pageNumber))) && checkLoadingIcon ();
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
}
