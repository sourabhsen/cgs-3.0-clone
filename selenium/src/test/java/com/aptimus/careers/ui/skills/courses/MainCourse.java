package com.aptimus.careers.ui.skills.courses;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import org.openqa.selenium.By;
import com.aptimus.careers.dto.skill.SkilledUp.Range;
import com.aptimus.careers.dto.skill.SkilledUp.Term;
import com.aptimus.careers.ui.skills.MainSkill;
import com.aptimus.careers.util.PageHelper.CourseType;
import com.aptimus.careers.util.PageHelper.PriceType;

public class MainCourse extends MainSkill {

    private final String courses     = "div#skills-courses-top";
    private final String btnPrevPage = "div.pagination-container ul.pagination li[ng-class='{disabled: noPrevious()||ngDisabled}'][ng-if='::directionLinks']";
    private final String btnNextPage = "div.pagination-container ul.pagination li[ng-class='{disabled: noNext()||ngDisabled}'][ng-if='::directionLinks']";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (courses + " div.apt-busy-fixed-center");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (courses + " div.apt-busy-fixed-center");
        }

        if (cgBusy) {
            waitForElementInvisible (courses + " div.apt-busy-fixed-center");
            waitForElementInvisible (courses + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    @Override
    public boolean areAllModulesPresent () {
        boolean status = waitUntilVisible (courses);
        status &= waitUntilVisible (courses + " div.skill-courses-close-row a.modal-close-link");
        status &= waitUntilVisible (courses + " h1.skill-course-count-header");
        status &= waitUntilVisible (courses + " a.course-filters i.icon-expand-tip");
        status &= waitUntilVisible (courses + " section.skill-course-listing");
        return status;
    }

    @Override
    public String getHeadingText () {
        return getText (courses + " div.course-results-headertext");
    }

    public boolean isResultsCount (int count) {
        String courseCount = NumberFormat.getNumberInstance (Locale.US).format (count) + " course";
        return isTextInElement (courses + " h1.skill-course-count-header", courseCount);
    }

    public String getCountHeader () {
        return getText (courses + " h1.skill-course-count-header");
    }

    public String getSkilledUpDisclaimer () {
        return getText (courses + " section.skill-course-listing + section > div:nth-child(2)");
    }

    public boolean clickFilterResults () {
        return click (courses + " a.course-filters");
    }

    public boolean closeFilterResults () {
        return click (courses + " a.modal-close-link > span.icon");
    }

    public boolean areFiltersPresent () {
        return waitUntilVisible (courses + " form.course-filters");
    }

    public boolean setFilter (CourseType type) {
        return click ("input[ng-model='csm.filter.type'][name='" + type + "']") && checkLoadingIcon ();
    }

    public boolean isFilterSet (CourseType type) {
        String form = courses + " form.course-filters";
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= Boolean.valueOf (getAttribute (form + " input[name='" + type + "']", "aria-checked"));
        return status;
    }

    public boolean setFilter (PriceType type) {
        return click ("input[ng-model='csm.filter.price'][name='" + type.css () + "']") && checkLoadingIcon ();
    }

    public boolean isFilterSet (PriceType type) {
        String form = courses + " form.course-filters";
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= Boolean.valueOf (getAttribute (form + " input[name='" + type.css () + "']", "aria-checked"));
        return status;
    }

    public boolean isFilterDisabled (PriceType type) {
        String form = courses + " form.course-filters";
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= Boolean.valueOf (getAttribute (form + " input[name='" + type.css () + "']", "aria-disabled"));
        return status;
    }

    public List <Term> getCourseTypeCount () {
        String form = courses + " form.course-filters div.type-filter";
        scrollTo (waitForElementVisible (form));
        List <Term> counts = new ArrayList <Term> ();
        for (CourseType type : CourseType.values ()) {
            Term count = new Term ();
            String span = getText (form + " input[name='" + type + "'] + span");
            count.setTerm (type.name ());
            count.setCount (Integer.valueOf (span.replaceAll ("(\\(|\\)|,)", "").trim ()));
            counts.add (count);
        }
        return counts;
    }

    public List <Range> getPriceCount () {
        String form = courses + " form.course-filters div.price-filter";
        scrollTo (waitForElementVisible (form));
        List <Range> counts = new ArrayList <Range> ();
        for (PriceType type : PriceType.values ()) {
            if (!type.equals (PriceType.allPrices)) {
                Range count = new Range ();
                String span = getText (form + " input[name='" + type.css () + "'] + span");
                count.setFrom (type.from ());
                count.setTo (type.to ());
                count.setCount (Integer.valueOf (span.replaceAll ("(\\(|\\)|,)", "").trim ()));
                counts.add (count);
            }
        }
        return counts;
    }

    public boolean isPreviousPageButtonEnabled () {
        return !waitForElementVisible (btnPrevPage).getAttribute ("class").contains ("disabled");
    }

    public boolean isNextPageButtonEnabled () {
        return !waitForElementVisible (btnNextPage).getAttribute ("class").contains ("disabled");
    }

    public int getPageNumber () {
        return Integer.valueOf (getText ("div.pagination-container ul.pagination li.active"));
    }

    public boolean clickPreviousPage () {
        return click (btnPrevPage + " a") && checkLoadingIcon ();
    }

    public boolean clickNextPage () {
        return click (btnNextPage + " a") && checkLoadingIcon ();
    }

    public boolean clickPage (int pageNumber) {
        return click (By.linkText (String.valueOf (pageNumber))) && checkLoadingIcon ();
    }
}
