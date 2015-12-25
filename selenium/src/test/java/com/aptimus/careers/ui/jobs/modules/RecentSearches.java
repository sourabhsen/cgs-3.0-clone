package com.aptimus.careers.ui.jobs.modules;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.jobs.JobSearchResult;
import com.aptimus.careers.ui.jobs.SearchResults;

public class RecentSearches extends SearchResults {

    private final String recentSearch = "div.jobSearchHisWidget";

    public boolean isRecentSearchesPresent () {
        return waitUntilVisible (recentSearch + " h4.recentseaches-title span.itemtitle");
    }

    public String getRecentSearchesHeader () {
        return getText (recentSearch + " h4.recentseaches-title");
    }

    public List <Map <String, String>> getRecentSearches () {
        List <Map <String, String>> searches = new ArrayList <Map <String, String>> ();
        for (WebElement el : waitForElementsVisible (recentSearch + " div.title a[aria-hidden='false']")) {
            String qry = el.getAttribute ("ng-click").replace ("SearchQuery.submitSearchForm", "");
            String[] searchComps = qry.replaceAll ("(\\(|\\))", "").split (",");
            String[] keywords = el.getText ().split (",");

            String keyword = "", location;
            if (searchComps.length == 1)
                location = searchComps[0].replace ("'", "").trim ();
            else {
                location = searchComps[0].replace ("'", "").trim ();
                keyword = searchComps[1].trim ();
            }

            Map <String, String> search = new HashMap <String, String> ();
            search.put ("location", location);

            if (!keyword.isEmpty ())
                if (keyword.contains ("keywords.company"))
                    search.put ("keywords.company", keywords[0].trim ());
                else if (keyword.contains ("keywords.title"))
                    search.put ("keywords.title", keywords[0].trim ());
                else
                    search.put ("keywords", keyword.replace ("'", "").trim ());

            searches.add (search);
        }
        return searches;
    }

    public boolean clickRecentSearch (JobSearchResult result) {
        return true; // click (recentContainer + " a[id='" + result.getId () + "']");
    }

    public boolean collapseWindow () {
        return click (recentSearch + " > h3 > span.saved-jobs_drop-icon");
    }
}
