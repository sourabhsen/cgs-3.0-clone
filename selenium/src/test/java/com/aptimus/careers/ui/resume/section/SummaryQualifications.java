package com.aptimus.careers.ui.resume.section;

import com.aptimus.careers.ui.resume.EditView;
import com.aptimus.test.selenium.Logging;

public class SummaryQualifications extends EditView {

    private final String form = container + " section.section-summary";

    public boolean isSummaryPresent () {
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= waitUntilVisible (form + " header");
        status &= waitUntilVisible (form + " header div.section-ctrls");
        status &= waitUntilVisible (form + " div.section-content div#summary");
        return status;
    }

    public boolean enterSummary (String sumaryText) {
        String field = form + " div.section-content div#summary div.ta-text.ta-editor div.ta-bind";
        boolean status = setText (field, sumaryText);
        if (!status) {
            Logging.error ("can't enter summary");
            executeJavascript ("$('" + field + "').text('" + sumaryText + "');");
            status = true;
        }
        return status;
    }

    public String getSummary () {
        return getText (form + " div.section-content div#summary div.ta-text.ta-editor div.ta-bind");
    }

    public String getSummaryInfoTip () {
        hover (form + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (form + " div.resume-info-tips").getAttribute ("content");
    }
}
