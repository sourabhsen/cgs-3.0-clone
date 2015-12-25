package com.aptimus.careers.ui.resume.section;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import com.aptimus.careers.dto.resume.Contact.PostalAddress;
import com.aptimus.careers.dto.resume.Experience.Employer;
import com.aptimus.careers.ui.resume.EditView;
import com.aptimus.test.selenium.Logging;

public class JobExperience extends EditView {

    private final String form       = container + " section.section-experience";
    private final String subSection = form + " div.job-section-%s";

    public boolean isExperiencePresent () {
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= waitUntilVisible (form + " header h2#experience-section-heading");
        status &= waitUntilVisible (form + " header div.section-ctrls");
        status &= waitUntilVisible (form + " div.section-content");
        return status;
    }

    public boolean clickDeleteExperience () {
        return click (form + " header span.delete.iconSvg");
    }

    public boolean isExperienceDeleted () {
        return noSuchElementPresent (form);
    }

    public boolean clickAdd () {
        return click (form + " header span.iconSvg svg-wrap.addItem");
    }

    public boolean clickDelete (int idx) {
        return click (String.format (subSection, idx) + " + div.sub-section-ctrls span.delete.iconSvg svg-wrap");
    }

    public boolean isSectionPresent (int idx) {
        return isElementVisible (String.format (subSection, idx));
    }

    public boolean isSectionDeleted (int idx) {
        return noSuchElementPresent (String.format (subSection, idx));
    }

    public boolean enterJobDetails (int idx, Employer aJob) {
        boolean status = waitUntilVisible (String.format (subSection, idx) + " + div.sub-section-ctrls");
        if (aJob.getEmployer () != null)
            status &= enterEmployer (idx, aJob.getEmployer ());

        if (aJob.getJobTitle () != null)
            status &= enterJobTitle (idx, aJob.getJobTitle ());

        if (aJob.getAddress () != null) {
            if (aJob.getAddress ().getCity () != null)
                status &= enterEmployerCity (idx, aJob.getAddress ().getCity ());

            if (aJob.getAddress ().getState () != null)
                status &= enterEmployerState (idx, aJob.getAddress ().getState ());
        }

        status &= enterStartDate (idx, aJob.getStartDate ());
        status &= enterEndDate (idx, aJob.getEndDate ());

        if (aJob.isPresentJob ())
            status &= setCurrent (idx);

        if (aJob.getDescription () != null)
            status &= enterJobDescription (idx, aJob.getDescription ());

        return status;
    }

    public boolean enterEmployer (int idx, String employer) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='experience_input_" + idx + "_1']");
        status &= setText (sub + " input#experience_input_" + idx + "_1", employer);
        if (!status)
            Logging.error ("can't enter employer name");
        return status;
    }

    public boolean enterJobTitle (int idx, String title) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='experience_input_" + idx + "_2']");
        status &= setText (sub + " input#experience_input_" + idx + "_2", title);
        if (!status)
            Logging.error ("can't enter job title");
        return status;
    }

    public boolean enterEmployerCity (int idx, String city) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='experience_input_" + idx + "_3']");
        status &= setText (sub + " input#experience_input_" + idx + "_3", city);
        if (!status)
            Logging.error ("can't enter employer city");
        return status;
    }

    public boolean enterEmployerState (int idx, String state) {
        String sub = String.format (subSection, idx);
        boolean status = clickAndSelectValue (sub + " select[name='experience." + idx + ".state']", "string:" + state);
        if (!status)
            Logging.error ("can't enter employer state");
        return status;
    }

    public boolean enterStartDate (int idx, Date start) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " input#experience_input_" + idx + "_5", fmt.format (start));
        if (!status)
            Logging.error ("can't enter employer start date");
        return status;
    }

    public String enterBadStartDate (int idx, String start) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " input#experience_input_" + idx + "_5", start) && pressKey (Keys.TAB);
        return status ? getText (sub + " small.text-danger[aria-hidden='false']") : "";
    }

    public boolean enterEndDate (int idx, Date end) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " input#experience_input_" + idx + "_6", fmt.format (end));
        if (!status)
            Logging.error ("can't enter employer end date");
        return status;
    }

    public String enterBadEndDate (int idx, String end) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " input#experience_input_" + idx + "_6", end) && pressKey (Keys.TAB);
        return status ? getText (sub + " small.text-danger[aria-hidden='false']") : "";
    }

    public boolean setCurrent (int idx) {
        return click (String.format (subSection, idx) + " div.checkbox label");
    }

    public String getEndDate (int idx) {
        String sub = String.format (subSection, idx);
        return getAttribute (sub + " input#experience_input_" + idx + "_6", "value");
    }

    public boolean enterJobDescription (int idx, String desc) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " div.ta-text.ta-editor div.ta-bind", desc);
        if (!status) {
            Logging.error ("can't enter job title");
            executeJavascript ("$('" + sub + " div.ta-text.ta-editor div.ta-bind').text ('" + desc + "');");
            status = true;
        }
        return status;
    }

    public Employer getExperience (int idx) {
        return parseExperienceEl (scrollTo (waitForElementVisible (String.format (subSection, idx))));
    }

    public List <Employer> getExperiences () {
        List <Employer> employers = new ArrayList <Employer> ();
        for (WebElement el : waitForElementsVisible (form + " div[class*='job-section-']")) {
            employers.add (parseExperienceEl (scrollTo (el)));
        }
        return employers;
    }

    private Employer parseExperienceEl (WebElement el) {
        Employer job = new Employer ();

        try {
            job.setEmployer (getAttribute (el, "input[title='Employer']", "value"));
            PostalAddress address = new PostalAddress ();
            address.setCity (getAttribute (el, "input[title='City']", "value"));

            WebElement select = el.findElement (By.cssSelector ("select[title='State']"));
            address.setState (new Select (select).getFirstSelectedOption ().getText ());
            job.setAddress (address);
            job.setJobTitle (getAttribute (el, "input[title='Job Title']", "value"));
            job.setDescription (getText (el, "div.ta-text.ta-editor div.ta-bind"));

            String date = getAttribute (el, "input[ng-model='job.startDate']", "value");
            job.setStartDate (fmt.parse (date));
            if (isElementPresent (el, "div.checkbox input[ng-model='job.isCurrent'][aria-checked='true']"))
                job.presentJob (true);
            else {
                date = getAttribute (el, "input[ng-model='job.endDate']", "value");
                job.setEndDate (fmt.parse (date));
                job.presentJob (false);
            }

        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }

        return job;
    }

    public String getExperienceInfoTip () {
        String sub = form + " h2#experience-section-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getJobTitleInfoTip (int idx) {
        String sub = String.format (subSection, idx) + " label[for='experience_input_" + idx + "_2']";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getJobDescInfoTip (int idx) {
        String sub = String.format (subSection, idx);
        sub += " div[ng-class=\"{'has-warning has-feedback': expDesDirty && !job.description}\"]";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }
}
