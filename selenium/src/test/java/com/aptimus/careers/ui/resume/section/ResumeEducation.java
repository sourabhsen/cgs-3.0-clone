package com.aptimus.careers.ui.resume.section;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import com.aptimus.careers.dto.resume.Contact.PostalAddress;
import com.aptimus.careers.dto.resume.Education.Gpa;
import com.aptimus.careers.dto.resume.Education.School;
import com.aptimus.careers.ui.resume.EditView;
import com.aptimus.test.selenium.Logging;

public class ResumeEducation extends EditView {

    private final String form       = container + " section#education-section";
    private final String subSection = form + " div.school-section-%s";

    public boolean isEducationPresent () {
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= waitUntilVisible (form + " header h2#education-section-heading");
        status &= waitUntilVisible (form + " header div.section-ctrls");
        status &= waitUntilVisible (form + " div.section-content");
        return status;
    }

    public boolean clickDeleteEducation () {
        return click (form + " header span.delete.iconSvg");
    }

    public boolean isEducationDeleted () {
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

    public boolean enterEducationDetails (int idx, School school) {
        boolean status = waitUntilVisible (String.format (subSection, idx));
        if (school.getInstitution () != null)
            status &= enterSchoolName (idx, school.getInstitution ());

        if (school.getAddress () != null) {
            if (school.getAddress ().getCity () != null)
                status &= enterSchoolCity (idx, school.getAddress ().getCity ());

            if (school.getAddress ().getState () != null)
                status &= enterSchoolState (idx, school.getAddress ().getState ());
        }

        if (school.getDegreeLevel () != null)
            status &= enterDegreeLevel (idx, school.getDegreeLevel ());

        if (school.getDegreeType () != null)
            status &= enterDegreeType (idx, school.getDegreeType ());

        if (school.getMajor () != null)
            status &= enterMajor (idx, school.getMajor ());

        if (school.getGpa () != null && school.getGpa ().getValue () != null)
            status &= enterGPA (idx, school.getGpa ().getValue ());

        status &= enterStartDate (idx, school.getStartDate ());
        status &= enterEndDate (idx, school.getCompletionDate ());

        if (school.getDetails () != null)
            status &= enterDetails (idx, school.getDetails ());

        return status;
    }

    public boolean enterSchoolName (int idx, String school) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='education_input_" + idx + "_1']");
        status &= setText (sub + " input#education_input_" + idx + "_1", school);
        if (!status)
            Logging.error ("can't enter school name");
        return status;
    }

    public boolean enterSchoolCity (int idx, String city) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='education_input_" + idx + "_2']");
        status &= setText (sub + " input#education_input_" + idx + "_2", city);
        if (!status)
            Logging.error ("can't enter school city");
        return status;
    }

    public boolean enterSchoolState (int idx, String state) {
        String sub = String.format (subSection, idx);
        boolean status = clickAndSelectValue (sub + " select[name='education." + idx + ".state']", "string:" + state);
        if (!status)
            Logging.error ("can't enter school state");
        return status;
    }

    public boolean enterDegreeLevel (int idx, String degreeLevel) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='education_input_" + idx + "_4']");
        status &= setText (sub + " input#education_input_" + idx + "_4", degreeLevel);
        if (!status)
            Logging.error ("can't enter edu degree level");
        return status;
    }

    public boolean enterDegreeType (int idx, String degreeType) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='education_input_" + idx + "_5']");
        status &= setText (sub + " input#education_input_" + idx + "_5", degreeType);
        if (!status)
            Logging.error ("can't enter edu degree type");
        return status;
    }

    public boolean enterMajor (int idx, String major) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='education_input_" + idx + "_6']");
        status &= setText (sub + " input#education_input_" + idx + "_6", major);
        if (!status)
            Logging.error ("can't enter school major");
        return status;
    }

    public boolean enterGPA (int idx, String gpa) {
        String sub = String.format (subSection, idx);
        boolean status = click (sub + " label[for='education_input_" + idx + "_7']");
        status &= setText (sub + " input#education_input_" + idx + "_7", gpa);
        if (!status)
            Logging.error ("can't enter school GPA");
        return status;
    }

    public boolean enterStartDate (int idx, Date start) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " input#education_input_" + idx + "_8", fmt.format (start));
        if (!status)
            Logging.error ("can't enter attending date");
        return status;
    }

    public boolean enterBadStartDate (int idx, String start) {
        return setText (String.format (subSection, idx) + " input#education_input_" + idx + "_8", start) && pressKey (Keys.TAB);
    }

    public String getBadStartDateWarning (int idx) {
        return getText (String.format (subSection, idx) + " small.text-warning[aria-hidden='false']");
    }

    public boolean enterEndDate (int idx, Date end) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " input#education_input_" + idx + "_9", fmt.format (end));
        if (!status)
            Logging.error ("can't enter graduation date");
        return status;
    }

    public boolean enterBadEndDate (int idx, String end) {
        return setText (String.format (subSection, idx) + " input#education_input_" + idx + "_9", end) && pressKey (Keys.TAB);
    }

    public String getBadEndDateWarning (int idx) {
        return getText (String.format (subSection, idx) + " small.text-warning[aria-hidden='false']");
    }

    public boolean setCurrent (int idx) {
        return click (String.format (subSection, idx) + " div.checkbox label");
    }

    public String getEndDate (int idx) {
        String sub = String.format (subSection, idx);
        return getAttribute (sub + " input#education_input_" + idx + "_9", "value");
    }

    public boolean enterDetails (int idx, String details) {
        String sub = String.format (subSection, idx);
        boolean status = setText (sub + " div.ta-text.ta-editor div.ta-bind", details);
        if (!status) {
            Logging.error ("can't enter edu details");
            executeJavascript ("$('" + sub + " div.ta-text.ta-editor div.ta-bind').text ('" + details + "');");
            status = true;
        }
        return status;
    }

    public School getEducation (int idx) {
        return parseEducationEl (scrollTo (waitForElementVisible (String.format (subSection, idx))));
    }

    public List <School> getEducations () {
        List <School> schools = new ArrayList <School> ();
        for (WebElement el : waitForElementsVisible (form + " div[class*='school-section-']")) {
            schools.add (parseEducationEl (scrollTo (el)));
        }
        return schools;
    }

    private School parseEducationEl (WebElement el) {
        School school = new School ();

        try {
            school.setInstitution (getAttribute (el, "input[title='School name']", "value"));
            PostalAddress address = new PostalAddress ();
            address.setCity (getAttribute (el, "input[title='City']", "value"));

            WebElement select = el.findElement (By.cssSelector ("select[title='State']"));
            address.setState (new Select (select).getFirstSelectedOption ().getText ());
            school.setAddress (address);
            school.setDegreeLevel (getAttribute (el, "input[title='Degree level']", "value"));
            school.setDegreeType (getAttribute (el, "input[title='Degree type']", "value"));
            school.setMajor (getAttribute (el, "input[title='Major']", "value"));
            school.setGpa (new Gpa (getAttribute (el, "input[title='GPA']", "value")));

            String date = getAttribute (el, "input[ng-model='school.startDate']", "value");
            school.setStartDate (fmt.parse (date));
            if (isElementPresent (el, "div.checkbox input[ng-model='school.isAttending'][aria-checked='true']"))
                school.presentlyEnrolled (true);
            else {
                date = getAttribute (el, "input[ng-model='school.completionDate']", "value");
                school.setCompletionDate (fmt.parse (date));
                school.presentlyEnrolled (false);
            }

            school.setDetails (getText (el, "div.ta-text.ta-editor div.ta-bind"));
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }

        return school;
    }

    public String getDegreeTypeInfoTip (int idx) {
        String sub = String.format (subSection, idx) + " label[for='education_input_" + idx + "_5']";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getMajorInfoTip (int idx) {
        String sub = String.format (subSection, idx) + " label[for='education_input_" + idx + "_6']";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getGpaInfoTip (int idx) {
        String sub = String.format (subSection, idx) + " label[for='education_input_" + idx + "_7']";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getDetailsInfoTip (int idx) {
        String sub = String.format (subSection, idx);
        sub += " div[ng-class=\"{'has-warning has-feedback': eduDirty && !school.details}\"]";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }
}
