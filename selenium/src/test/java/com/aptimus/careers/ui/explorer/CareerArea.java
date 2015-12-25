package com.aptimus.careers.ui.explorer;

import java.util.Map;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.google.gson.Gson;

public class CareerArea extends MainExplorer {

    private final String mainDropDown = mainTab + " div.primary";
    private final String subDropDown  = mainTab + " div.secondary";

    public boolean areAllModulesPresent () {
        boolean status = super.areAllModulesPresent ();
        status &= waitUntilVisible (mainTab + " div.career-area-dropdowns");
        status &= waitUntilVisible (mainTab + " label.career-area-desc");
        status &= waitUntilVisible (mainDropDown + " span.ui-select-toggle");
        waitForElement (subDropDown + " span.ui-select-toggle");
        return status;
    }

    public boolean isCareerAreaPresent () {
        boolean status = waitUntilVisible (mainDropDown + " span.ui-select-toggle");
        waitForElement (subDropDown + " span.ui-select-toggle");
        return status;
    }

    public String getCareerAreaLabel () {
        return getText ("li#careerExpCareerAreas");
    }

    public boolean clickCareerArea () {
        return click (By.linkText ("Career Areas"));
    }

    public String getTabDescripton () {
        return getText (mainTab + " label.career-area-desc");
    }

    public boolean clickMainDropdown () {
        return click (mainDropDown + " span.btn");
    }

    public String useMainDropdownMenu (int idx) {
        waitUntilVisible (mainDropDown + " div[aria-label='Select Career Area'] li.ui-select-choices-group");
        return click (mainDropDown + " div[id^='ui-select-choices-row'][id$='-" + --idx + "']") ? getMainDropdownText () : "";
    }

    public String selectFromMainDropdown (String text) {
        String dropdown = mainDropDown + " div[aria-label='Select Career Area'] li.ui-select-choices-group";
        waitUntilVisible (dropdown);
        for (WebElement li : waitForElementsVisible (dropdown + " > div[id]"))
            if (li.getText ().equals (text)) {
                li.click ();
                return getMainDropdownText ();
            }
        return "";
    }

    public String getMainDropdownText () {
        return getText (mainDropDown + " span.ui-select-match-text");
    }

    public String getMajorTitle () {
        String cache = checkSessionStorage ("return sessionStorage.getItem('cgs.careerExploration.selectedCareerArea');");
        Map <?, ?> m = new Gson ().fromJson (cache, Map.class);
        return String.valueOf (m.get ("name"));
    }

    public boolean clickSubDropdown () {
        return click (subDropDown + " span.btn");
    }

    public String useSubDropdownMenu (int idx) {
        waitUntilVisible (subDropDown + " div[aria-label='Select Specific Career'] li.ui-select-choices-group");
        String menu = "";
        if (click (subDropDown + " div[id^='ui-select-choices-row'][id$='-" + --idx + "']"))
            menu = getSubDropdownText ();
        return menu;
    }

    public String selectFromSubDropdown (String text) {
        waitUntilVisible (subDropDown + " div[aria-label='Select Specific Career'] li.ui-select-choices-group");
        String menu = "";
        if (click (By.linkText (text)))
            menu = getSubDropdownText ();
        return menu;
    }

    public String getSubDropdownText () {
        return getText (subDropDown + " span.ui-select-match-text");
    }

    public String getMinorFamily () {
        String cache = executeJavascript ("return sessionStorage.getItem('cgs.careerExploration.selectedCareer');");
        Map <?, ?> m = new Gson ().fromJson (cache, Map.class);
        return String.valueOf (m.get ("id"));
    }

    public String getMinorTitle () {
        String cache = executeJavascript ("return sessionStorage.getItem('cgs.careerExploration.selectedCareer');");
        Map <?, ?> m = new Gson ().fromJson (cache, Map.class);
        return String.valueOf (m.get ("name"));
    }
}
