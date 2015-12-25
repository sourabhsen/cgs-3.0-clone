package com.aptimus.careers.ui.dashboard;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.ui.MainCareer;

public class MainDashboard extends MainCareer {

    private final String   container = "section#Dashboard-Container";
    protected final String myJobs    = "section.my-jobs-container";
    protected final String searchJob = "section.search-form-container";
    protected final String myGoals   = "section.my-goal-list-container";
    protected final String resumes   = "section.resume-list-container";

    public boolean isDashboardPresent () {
        boolean status = waitUntilVisible ("header#site-banner");
        status &= waitUntilVisible (container);
        status &= waitUntilVisible ("div.dashboard-intro-container");
        status &= waitUntilVisible ("section.milestone-list");
        status &= waitUntilVisible ("div.career-tools");
        status &= waitUntilVisible (myJobs);
        status &= waitUntilVisible (searchJob);
        status &= waitUntilVisible (myGoals);
        status &= waitUntilVisible (resumes);
        return status;
    }

    public boolean isLocation (String loc) {
        return isTextInElement (container + " a.location", loc);
    }

    public String getLocation () {
        return getText (container + " a.location");
    }

    public boolean enterLocation (String location) {
        boolean status = click (By.linkText (getText (container + " a.location")));
        status &= setText (container + " form.editable-text input.editable-input", location) && pressEnter ();
        return status;
    }

    public boolean enterLocationAutocomplete (String location) {
        String location1 = location.substring (0, 4), location2 = location.substring (4, location.length () - 4);
        boolean status = click (container + " a.location");
        WebElement el = scrollTo (waitForElementVisible (container + " form.editable-text input.editable-input"));
        el.click ();
        el.clear ();
        el.sendKeys (location1);

        boolean found = false;
        for (WebElement li : waitForElementsVisible ("form ul li a")) {
            if (li.getText ().equalsIgnoreCase (location)) {
                found = true;
                li.click ();
                break;
            }
        }

        if (!found) {
            el.sendKeys (location2);
            wait (1000);
            for (WebElement li : waitForElementsVisible ("form ul li a")) {
                if (li.getText ().equalsIgnoreCase (location)) {
                    found = true;
                    li.click ();
                    break;
                }
            }
        }
        status &= pressEnter ();
        return status;
    }

    public boolean isCareersStatusPresent (String text) {
        return isTextInElement ("div.dashBoardCareerStatus-container div.dbs-custom > p", text);
    }

    public boolean clickStatusPopupYes () {
        return click ("div.queryAnswer > a[href*='settings']");
    }

    public boolean clickStatusPopupNo () {
        return click ("div.queryAnswer > a#dbs-closePopUp");
    }
}
