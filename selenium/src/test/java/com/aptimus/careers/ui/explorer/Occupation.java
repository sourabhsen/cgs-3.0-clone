package com.aptimus.careers.ui.explorer;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class Occupation extends MainExplorer {

    private final String jobTitle = "input[placeholder='Enter occupation title...']";

    public boolean areAllModulesPresent () {
        boolean status = super.areAllModulesPresent ();
        status &= waitUntilVisible (mainTab + " div.primary label");
        status &= waitUntilVisible (mainTab + " div.primary " + jobTitle);
        return status;
    }

    public boolean isOccupationTitlePresent () {
        return waitUntilVisible (mainTab + " " + jobTitle);
    }

    public String getOccupationTitleLabel () {
        return getText ("li#careerExpOccupations");
    }

    public boolean clickOccupationTitle () {
        return click (By.linkText ("Specific Occupations"));
    }

    public String getTabDescripton () {
        return getText (mainTab + " div.primary label");
    }

    public boolean enterJobTitle (String title) {
        boolean status = setText ("div.tab-content input[ng-model='careerExpCtrl.vm.selectedOccupation']", title);
        status &= pressEnter ();
        return status;
    }

    // sometimes the dropdown failed to show, breaking "text" into 2 strings
    public boolean enterJobTitleAutocomplete (String title) {
        String title1 = title.substring (0, 4), title2 = title.substring (4, title.length () - 4);
        WebElement el = scrollTo (waitForElementVisible ("div.tab-content input[ng-model='careerExpCtrl.vm.selectedOccupation']"));
        el.click ();
        el.clear ();
        el.sendKeys (title1);

        if (!isElementPresent (By.linkText (title))) {
            el.sendKeys (title2);
            wait (1000);
        }

        return click (By.linkText (title));
    }

    public String getJobTitle () {
        return getAttribute (jobTitle, "value");
    }

    public String getNoJobTitleErrorMessage () {
        String error = mainTab + " section p.error";
        waitUntilVisible (error);
        return getText (error);
    }
}
