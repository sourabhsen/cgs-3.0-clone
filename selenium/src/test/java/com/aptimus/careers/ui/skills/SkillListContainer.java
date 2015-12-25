package com.aptimus.careers.ui.skills;

import static com.aptimus.careers.util.PageHelper.Rating.Beginner;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.explorer.Skill;
import com.aptimus.careers.dto.skill.RSkill;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.PageHelper.Answer;
import com.aptimus.test.selenium.Logging;

public class SkillListContainer extends MainSkill {

    private final String list         = sbListContainer + " div.skillbuilder-results[data-skill-id='%s']";
    private final String results      = sbListContainer + " div.skillbuilder-results";
    private final String legal        = "div.smarterer-ua-modal";
    private final String build        = " ap-career-skills-modal-link span";
    private final String assess       = " ap-skills-assessment-modal-link span.assessmentText";
    private final String goalDropdown = sbListContainer + " span.ui-select-match-text";
    private final String modalWiki    = "div.modal div.invalid-desc";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (sbListContainer + " div.apt-busy-fixed-center");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (sbListContainer + " div.apt-busy-fixed-center");
        }

        if (cgBusy) {
            waitForElementInvisible (sbListContainer + " div.apt-busy-fixed-center");
            waitForElementInvisible (sbListContainer + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean isSkillBuilderPresent () {
        return waitUntilVisible (container + sbListContainer);
    }

    public RSkill getSkill (int idx) {
        return parseSkillEl (scrollTo (waitForElementVisible (results + ":nth-child(" + idx + ")")));
    }

    public List <RSkill> getSkills () {
        List <RSkill> skills = new ArrayList <RSkill> ();
        try {
            for (WebElement el : waitForElementsVisible (results))
                skills.add (parseSkillEl (scrollTo (el)));
        } catch (StaleElementReferenceException s) {
            Logging.error ("getSkills: " + s.getMessage ());
            skills = new ArrayList <RSkill> ();
            for (WebElement el : waitForElementsVisible (results))
                skills.add (parseSkillEl (scrollTo (el)));
        }
        return skills;
    }

    private RSkill parseSkillEl (WebElement aSkill) {
        RSkill rSkill = new RSkill ();
        Skill skill = new Skill ();
        skill.setSkillId (Integer.valueOf (aSkill.getAttribute ("data-skill-id")));
        skill.setDisplayName (getAttribute (aSkill, "h4.sb-toggle-desc", "textContent"));

        String desc = "div.sb-skilldesc-wrapper";
        String regex = "(This description doesn't look right|more information on this skill|Unfortunately we are experiencing a server problem, please try again later.)";
        String txt = getAttribute (aSkill, desc + " p.skillparagraph", "textContent").replaceAll (regex, "");
        skill.setDescription (txt.replace ("…", "").trim ());

        // CAR-5289
        if (isElementPresent (aSkill, desc + " p.skillparagraph a[ng-if='skill.wikipediaUrl']")) {
            String wiki = getAttribute (aSkill, desc + " p.skillparagraph a[ng-if='skill.wikipediaUrl']", "href");
            rSkill.setWikipediaUrl (wiki.isEmpty () ? null : wiki);
        }

        rSkill.setSkill (skill);
        if (isElementPresent (aSkill, "div.skillLevelSelection input[aria-checked='true']")) {
            String rate = getAttribute (aSkill, "div.skillLevelSelection input[aria-checked='true']", "value");
            rSkill.setUserDeclaredLevel (rate);
        }

        int count = 0;
        Map <String, String> goals = new HashMap <String, String> ();
        if (isElementPresent (aSkill, desc + " div.skill-relation-goal"))
            for (WebElement el : aSkill.findElements (By.cssSelector (desc + " div.goal-items a.ng-binding"))) {
                goals.put (String.valueOf (++count), el.getAttribute ("textContent"));
            }

        if (goals.size () > 0)
            rSkill.setUserJobCodesThisSkillAppearsIn (goals);

        return rSkill;
    }

    public boolean getNoSkills () {
        return noSuchElementPresent (results);
    }

    public String getNoSkillsMessage () {
        return getText (sbListContainer + " div.skillbuilder-nodata-results");
    }

    public String getSelectedGoal () {
        scrollTo (waitForElementVisible (goalDropdown));
        return getText (goalDropdown);
    }

    public boolean clickGoalsDropdown () {
        return click (goalDropdown);
    }

    public boolean setGoal (String goal) {
        return click (By.linkText (goal)) && checkLoadingIcon ();
    }

    public boolean toggleListWindow (RSkill skill) {
        String base = String.format (list, skill.getSkill ().getSkillId ());
        boolean status = click (base + " a.sb-toggle-link h4.sb-toggle-desc svg-wrap.chevronCircle.skills-collapse");
        status &= waitUntilVisible (base + " a.sb-toggle-link h4.sb-toggle-desc svg-wrap.chevronCircle.skills-expanded");
        status &= waitUntilVisible (base + " div.sb-skilldesc-wrapper > p.skillparagraph");
        return status;
    }

    public boolean clickSkillName (RSkill skill) {
        return click (String.format (list, skill.getSkill ().getSkillId ()) + " a.sb-toggle-link > h4.sb-toggle-desc");
    }

    public String getSkillDescription (RSkill skill) {
        String base = String.format (list, skill.getSkill ().getSkillId ());
        return getText (base + " div.sb-skillbuilderDesc");
    }

    public boolean clickAnotherGoal (RSkill skill, String target) {
        WebElement el = scrollTo (waitForElementVisible (String.format (list, skill.getSkill ().getSkillId ())));
        el.findElement (By.xpath ("//a[text()='" + target + "']")).click ();
        return true;
    }

    public boolean clickAssessLink (RSkill skill) {
        return click (String.format (list, skill.getSkill ().getSkillId ()) + assess);
    }

    public boolean clickImproveThisSkill (RSkill skill) {
        return click (String.format (list, skill.getSkill ().getSkillId ()) + build);
    }

    public boolean setRating (RSkill skill) {
        String rate = skill.getUserDeclaredLevel ().equals (Beginner.name ()) ? "Basic" : skill.getUserDeclaredLevel ();
        rate += skill.getSkill ().getSkillId ();
        String base = String.format (list, skill.getSkill ().getSkillId ()) + " div.skillLevelSelection";
        boolean status = click (base + " label[for='radioSelect" + rate + "']");
        String checked = getAttribute (base + " input[value='" + skill.getUserDeclaredLevel () + "']", "aria-checked");
        return status && Boolean.valueOf (checked);
    }

    public boolean clickMoreFromWiki (RSkill skill) {
        String base = String.format (list, skill.getSkill ().getSkillId ());
        String originalHandle = getDriver ().getWindowHandle ();
        boolean status = click (base + " p.skillparagraph > a");

        for (String handle : getDriver ().getWindowHandles ()) {
            if (!handle.equals (originalHandle))
                getDriver ().switchTo ().window (handle).close ();
        }
        getDriver ().switchTo ().window (originalHandle);

        return status;
    }

    public boolean clickWikiFlag (RSkill skill) {
        String base = String.format (list, skill.getSkill ().getSkillId ());
        boolean status = click (base + " a.incorrect-desc em");
        status &= waitUntilVisible (modalWiki + " p#dialog1Title" + skill.getSkill ().getSkillId ());
        return status;
    }

    public boolean closeWikiFlagWindow () {
        return click (modalWiki + " a.modal-close-link span") && noSuchElementPresent (modalWiki);
    }

    public boolean clickWikiFlagIndicator (RSkill skill, Answer answer) {
        boolean status = waitUntilVisible (modalWiki + " p#dialog1Title" + skill.getSkill ().getSkillId ());
        switch (answer) {
        case no:
            return status && click (modalWiki + " button.pull-left") && noSuchElementPresent (modalWiki);
        case yes:
            return status && click (modalWiki + " button.pull-right") && noSuchElementPresent (modalWiki);
        default:
            return true;
        }
    }

    public boolean isSuggestionShortPresent (RSkill skill, String text) {
        if (CareerEnvironment.usingSafari)
            return true;

        String base = String.format (list, skill.getSkill ().getSkillId ());
        hover (base + assess);
        wait (1000);
        boolean status = isTextInElement (base + " ap-skills-assessment-modal-link div.popover.in", text);
        hover (base);
        return status && noSuchElementPresent (base + " ap-skills-assessment-modal-link div.popover.in");
    }

    public boolean isSuggestionFullPresent (RSkill skill, String text) {
        String base = String.format (list, skill.getSkill ().getSkillId ());
        return isTextInElement (base + " div.sb-skilldesc-wrapper div.skill-assess-info", text);
    }

    public boolean updateSkillLevel (RSkill skill) {
        String base = String.format (list, skill.getSkill ().getSkillId ());
        boolean status = click (base + " div.sb-skilldesc-wrapper div.skill-assess-info a.setSkillLevel");
        base += " div.skillLevelSelection";
        String checked = getAttribute (base + " input[value='" + skill.getUserDeclaredLevel () + "']", "aria-checked");
        return status && Boolean.valueOf (checked);
    }

    public boolean isSmartererLegalPresent () {
        boolean status = waitUntilVisible (legal);
        status &= waitUntilVisible (legal + " div.smartererUAContent");
        status &= waitUntilVisible (legal + " button.smarterer_agree");
        status &= waitUntilVisible (legal + " button.smarterer_cancel");
        return status;
    }

    public boolean isSmartererLegalHidden () {
        return noSuchElementPresent (legal);
    }

    public boolean clickSmartererLegalAgree () {
        return click ("button.smarterer_agree");
    }

    public boolean clickSmartererLegalCancel () {
        return click ("button.smarterer_cancel");
    }

    public boolean closeSmartererWindow () {
        return click ("div.smarterer-iframe-modal a.modal-close-link > span.icon");
    }
}
