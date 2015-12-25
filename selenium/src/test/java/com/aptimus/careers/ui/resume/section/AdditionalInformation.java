package com.aptimus.careers.ui.resume.section;

import static com.aptimus.careers.util.PageHelper.ResumeInfoList.AWARDS;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.CERTIFICATIONS;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.HOBBIES;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.LANGUAGES;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.SKILLS;
import static com.aptimus.careers.util.PageHelper.ResumeInfoList.VOLUNTEER;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.resume.Resumes.AdditionalInfo;
import com.aptimus.careers.ui.resume.EditView;
import com.aptimus.careers.util.PageHelper.ResumeInfoList;
import com.aptimus.test.selenium.Logging;

public class AdditionalInformation extends EditView {

    private final String form       = container + " section.section-additional-info";
    private final String subSection = form + " div#%s";

    public boolean isAdditionalInfoPresent () {
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= waitUntilVisible (form + " header h2#additional-section-heading");
        status &= waitUntilVisible (form + " header div.section-ctrls");
        return status;
    }

    public boolean addInfo (ResumeInfoList listType) {
        return click (form + " header span.iconSvg svg-wrap.addItem") && click (By.linkText (listType.name ()));
    }

    public boolean clickDeleteInfo () {
        return click (form + " header span.delete.iconSvg");
    }

    public boolean isInfoDeleted () {
        return noSuchElementPresent (form);
    }

    public boolean clickDelete (ResumeInfoList listType) {
        return click (String.format (subSection, listType.id ()) + " div.sub-section-ctrls span.delete.iconSvg svg-wrap");
    }

    public boolean isSectionPresent (ResumeInfoList listType) {
        return isElementVisible (String.format (subSection, listType.id ()));
    }

    public boolean isSectionDeleted (ResumeInfoList listType) {
        return noSuchElementPresent (String.format (subSection, listType.id ()));
    }

    public boolean deleteInfo (ResumeInfoList listType, int idx) {
        String sub = String.format (subSection, listType.id ()) + " input[title='" + listType.title () + "'][id*='(ss.type | lowercase)-" + idx + "']";
        return click (sub + " + a span.delete.iconSvg svg-wrap");
    }

    public boolean enterInfo (AdditionalInfo info) {
        boolean status = true;
        if (info.getSkills () != null && !info.getSkills ().isEmpty ())
            status &= enterInfo (SKILLS, info.getSkills ());

        if (info.getAwards () != null && !info.getAwards ().isEmpty ())
            status &= enterInfo (AWARDS, Arrays.asList (info.getAwards ().split (",")));

        if (info.getCertifications () != null && !info.getCertifications ().isEmpty ())
            status &= enterInfo (CERTIFICATIONS, Arrays.asList (info.getCertifications ().split (",")));

        if (info.getLanguages () != null && !info.getLanguages ().isEmpty ())
            status &= enterInfo (LANGUAGES, Arrays.asList (info.getLanguages ().split (",")));

        if (info.getPersonalHobbies () != null && !info.getPersonalHobbies ().isEmpty ())
            status &= enterInfo (HOBBIES, Arrays.asList (info.getPersonalHobbies ().split (",")));

        if (info.getVolunteerWork () != null && !info.getVolunteerWork ().isEmpty ())
            status &= enterInfo (VOLUNTEER, Arrays.asList (info.getVolunteerWork ().split (",")));

        return status;
    }

    public boolean enterInfo (ResumeInfoList listType, List <String> infos) {
        String sub = String.format (subSection, listType.id ()) + " input[title='" + listType.title () + "'][ng-model='addInfoObj[ss.type]']";
        boolean status = true;
        for (String info : infos) {
            status &= setText (sub, info) && pressEnter ();
            if (!status)
                Logging.error ("can't enter info[" + listType + "]=" + info);
        }
        return status;
    }

    public AdditionalInfo getInfo () {
        AdditionalInfo info = new AdditionalInfo ();
        for (ResumeInfoList field : ResumeInfoList.values ()) {
            String sub = String.format (subSection, field.id ()) + " input[title='" + field.title () + "'][id*='(ss.type | lowercase)']";
            List <String> ss = new ArrayList <String> ();
            if (isElementPresent (sub)) {
                for (WebElement el : waitForElementsVisible (sub))
                    ss.add (scrollTo (el).getAttribute ("value"));
            }

            switch (field) {
            case SKILLS:
                info.setSkills (ss);
                break;
            case AWARDS:
                for (String s : ss)
                    info.setAwards (s);
                break;
            case CERTIFICATIONS:
                for (String s : ss)
                    info.setCertifications (s);
                break;
            case LANGUAGES:
                for (String s : ss)
                    info.setLanguages (s);
                break;
            case HOBBIES:
                for (String s : ss)
                    info.setPersonalHobbies (s);
                break;
            case VOLUNTEER:
                for (String s : ss)
                    info.setVolunteerWork (s);
                break;
            }
        }

        return info;
    }

    public String getAdditionalInfoTip () {
        String sub = form + " h2#additional-section-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getSkillsInfoTip () {
        String sub = form + " h5#additonal-info-skills_subsection-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getAwardsInfoTip () {
        String sub = form + " h5#additonal-info-awards-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getCertsInfoTip () {
        String sub = form + " h5#additonal-info-certifications-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getLanguagesInfoTip () {
        String sub = form + " h5#additonal-info-languages-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getHobbiesInfoTip () {
        String sub = form + " h5#additonal-info-hobbies-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }

    public String getVolunteersInfoTip () {
        String sub = form + " h5#additonal-info-volunteer-heading";
        hover (sub + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (sub + " div.resume-info-tips").getAttribute ("content");
    }
}
