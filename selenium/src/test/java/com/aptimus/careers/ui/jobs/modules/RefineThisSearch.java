package com.aptimus.careers.ui.jobs.modules;

import static com.aptimus.careers.util.PageHelper.Filter.AcademicProgram;
import static com.aptimus.careers.util.PageHelper.Filter.CareerArea;
import static com.aptimus.careers.util.PageHelper.Filter.Company;
import static com.aptimus.careers.util.PageHelper.Filter.EducationLevel;
import static com.aptimus.careers.util.PageHelper.Filter.ExperienceLevel;
import static com.aptimus.careers.util.PageHelper.Filter.Location;
import static com.aptimus.careers.util.PageHelper.Filter.radius;
import java.util.HashMap;
import java.util.Map;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.util.PageHelper.Filter;

public class RefineThisSearch extends SearchResults {

    private final String refine   = "div.refineSearch";
    private final String facet    = refine + " uib-accordion[id='%s']";
    private final String checkbox = facet + " input[name='%s']";

    public boolean isRefineSearchPresent () {
        return waitUntilVisible (refine + " div.facets h3#refine-title") && waitUntilVisible (refine + " h6 a.clear-filters");
    }

    public String getRefineSearchHeader () {
        return getText (refine + " h3#refine-title");
    }

    public String setDistance (String value) {
        expand (radius);
        click (String.format (facet, radius.id ()) + " div.ui-select-match span.btn.ui-select-toggle");

        String distance1 = value.substring (0, 4), distance2 = value.substring (4, value.length () - 4);
        WebElement el = scrollTo (waitForElementVisible (String.format (facet, radius.id ()) + " input.ui-select-search[ng-model='$select.search']"));
        el.click ();
        el.clear ();
        el.sendKeys (distance1);

        if (!isElementPresent (By.linkText (value))) {
            el.sendKeys (distance2);
            wait (1000);
        }

        click (By.linkText (value));
        checkLoadingIcon ();
        return value.replace (" miles", "");
    }

    public boolean isDistanceFilterHidden () {
        return Boolean.valueOf (getAttribute (String.format (facet, radius.id ()), "aria-hidden"));
    }

    public String setFilter (Filter filter, int num) {
        String aFilter = facet + " h6[for='%s']", id = filter.solrFacet () + --num;
        expand (filter);
        String name = getText (String.format (aFilter, filter.id (), id) + " span.name");
        boolean status = click (String.format (aFilter, filter.id (), id) + " input[id='" + id + "']");
        return status && checkLoadingIcon () ? name : null;
    }

    public boolean setFilter (Filter filter, String name) {
        expand (filter);
        return click (String.format (checkbox, filter.id (), name.replace ("'", "\\'"))) && checkLoadingIcon ();
    }

    public boolean isFilterChecked (Filter filter, String name) {
        expand (filter);
        return waitForElement (String.format (checkbox, filter.id (), name.replace ("'", "\\'"))).isSelected ();
    }

    public boolean clickClear () {
        return click (refine + " h6 a.clear-filters") && checkLoadingIcon ();
    }

    private void expand (Filter filter) {
        if (!isFilterExpanded (filter))
            click (String.format (facet, filter.id ()) + " a.accordion-toggle");
    }

    public boolean isFilterExpanded (Filter filter) {
        return isElementPresent (String.format (facet, filter.id ()) + " h4.panel-title span.expandicon.open");
    }

    public Map <String, Integer> getAllFacetCounts () {
        Map <String, Integer> uiFilters = getFacetCount (Company);
        uiFilters.putAll (getFacetCount (Location));
        uiFilters.putAll (getFacetCount (CareerArea));
        uiFilters.putAll (getFacetCount (EducationLevel));
        uiFilters.putAll (getFacetCount (ExperienceLevel));

        if (CareerEnvironment.isUopx)
            uiFilters.putAll (getFacetCount (AcademicProgram));

        return uiFilters;
    }

    private Map <String, Integer> getFacetCount (Filter filter) {
        Map <String, Integer> facets = new HashMap <String, Integer> ();
        for (WebElement e : waitForElements (String.format (facet, filter.id ()) + " h6.checkbox")) {
            String name = getAttribute (e, "span.name", "textContent");
            String count = getAttribute (e, "span.count", "textContent").replaceAll ("(\\(|\\))", "");
            facets.put (filter.id () + ":" + name, Integer.valueOf (count));
        }
        return facets;
    }
}
