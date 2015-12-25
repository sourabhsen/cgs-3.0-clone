package com.aptimus.careers.ui.dashboard.modules;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.ui.dashboard.MainDashboard;

public class Search extends MainDashboard {

    public boolean isSearchJobsPresent () {
        boolean status = waitUntilVisible (searchJob + " h3[role='heading']");
        status &= waitUntilVisible (searchJob + " input#searchWords");
        status &= waitUntilVisible (searchJob + " input#searchLocation");
        status &= waitUntilVisible (searchJob + " button#mobile-submit");
        return status;
    }

    public String getModuleHeader () {
        return getText (searchJob + " h3[role='heading']");
    }

    public String getSearchLocation () {
        return getAttribute (searchJob + " input#searchLocation", "value").trim ();
    }

    public boolean enterSearchKeywords (String keywords) {
        return setText ("div#searchFieldDash input#searchWords", keywords) && pressKey (Keys.TAB);
    }

    public boolean clickSearch () {
        return click (searchJob + " button#mobile-submit");
    }

    public boolean doSearch (String keywords, String location) {
        boolean status = enterSearchKeywords (keywords);
        status &= setText ("div#searchFieldDash input#searchLocation", location);
        status &= pressKey (Keys.TAB);
        status &= clickSearch ();
        return status;
    }

    public boolean enterSearchLocationAutocomplete (String location) {
        String location1 = location.substring (0, 4), location2 = location.substring (4, location.length () - 4);
        WebElement el = scrollTo (waitForElementVisible ("div#searchFieldDash input#searchLocation"));
        el.click ();
        el.clear ();
        el.sendKeys (location1);

        if (!isElementPresent (By.linkText (location))) {
            el.sendKeys (location2);
            wait (1000);
        }

        return click (By.linkText (location));
    }
}
