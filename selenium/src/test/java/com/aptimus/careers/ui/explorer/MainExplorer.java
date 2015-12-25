package com.aptimus.careers.ui.explorer;

import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.test.selenium.Logging;

public class MainExplorer extends MainCareer {

    private final String   container      = "section#career-exploration-container";
    protected final String mainTab        = container + " section.tab-main-container div.tab-pane.active";
    private final String   goalsContainer = "div.tab-pane.active div.job-container [data-goal-id]";
    private final String   goalItem       = "div.tab-pane.active div.job-container [data-goal-id='%s']";
    protected final String setGoal        = " button.my-goal-btn.add";
    protected final String removeGoal     = " button.my-goal-btn.remove";
    private final String   myGoals        = "my-goal-count-button";
    private final String   disclaimer     = "h6#disclaimer";
    private final String   disabled       = " button.my-goal-btn[disabled='disabled']";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (mainTab + " div.apt-busy-inline");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (mainTab + " div.apt-busy-inline");
        }

        if (cgBusy) {
            waitForElementInvisible (mainTab + " div.apt-busy-inline");
            waitForElementInvisible (mainTab + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean areAllModulesPresent () {
        String headerTab = container + " section.header-content";
        boolean status = waitUntilVisible (container + " section.tab-main-container");
        status &= waitUntilVisible (container + " section.tab-main-container ul.nav-tabs");
        status &= waitUntilVisible (headerTab);
        status &= waitUntilVisible (headerTab + " > div.career-exploration-desc > div.primary + div.secondary");
        status &= waitUntilVisible (disclaimer);
        return status;
    }

    public boolean isMyGoalsPresent () {
        return waitUntilVisible (myGoals);
    }

    public boolean isMyGoalsDisabled () {
        return !waitForElementVisible (myGoals + " button").isEnabled ();
    }

    public String getMyGoalsLabel () {
        return getText (myGoals);
    }

    public boolean isMyGoalsCount (int count) {
        return isTextInElement (myGoals + " span.saved-count", "(" + count + ")");
    }

    public boolean clickMyGoals () {
        return click (myGoals + " button");
    }

    public boolean isFlyoverMyGoalsCount (int count) {
        // no need to use scrollTo, flyover will always appear on top
        executeJavascript ("window.scrollTo (0, window.scrollMaxY)");
        String flyover = myGoals + ".active span.saved-count";
        boolean status = waitUntilVisible (flyover);
        status &= isTextInElement (getDriver ().findElement (By.cssSelector (flyover)), String.valueOf (count));
        return status;
    }

    public boolean clickFlyoverMyGoals () {
        // no need to use scrollTo, flyover will always appear on top
        executeJavascript ("window.scrollTo (0, window.scrollMaxY)");
        waitForElementVisible (myGoals + ".active button").click ();
        return true;
    }

    public String getDescription () {
        return getText (container + " div.primary");
    }

    public String getDisclaimerText () {
        return getText (disclaimer);
    }

    public String getLocation () {
        return getText (mainTab + " a.location");
    }

    public boolean enterLocation (String location) {
        boolean status = click (By.linkText (getText (mainTab + " a.location")));
        status &= setText (mainTab + " form.editable-text input.editable-input", location);
        status &= pressEnter ();
        return status;
    }

    public boolean enterLocationAutocomplete (String location) {
        String location1 = location.substring (0, 4), location2 = location.substring (4, location.length () - 4);
        boolean status = click (mainTab + " a.location");
        WebElement el = scrollTo (waitForElementVisible (mainTab + " form.editable-text input.editable-input"));
        el.click ();
        el.clear ();
        el.sendKeys (location1);

        boolean found = false;
        for (WebElement li : waitForElementsVisible (mainTab + " form ul li a")) {
            if (li.getText ().equalsIgnoreCase (location)) {
                found = true;
                li.click ();
                break;
            }
        }

        if (!found) {
            el.sendKeys (location2);
            wait (1000);
            for (WebElement li : waitForElementsVisible (mainTab + " form ul li a")) {
                if (li.getText ().equalsIgnoreCase (location)) {
                    li.click ();
                    break;
                }
            }
        }
        status &= pressEnter ();
        return status;
    }

    public boolean scrollDown () {
        hover (disclaimer);
        return checkLoadingIcon ();
    }

    public LaborData getJobGoal (int idx) {
        return parseGoalEl (scrollTo (waitForElementVisible (goalsContainer + ":nth-child(" + idx + ")")));
    }

    public List <LaborData> getJobGoals () {
        List <LaborData> goals = new ArrayList <LaborData> ();
        try {
            scrollDown ();
            for (WebElement el : waitForElementsVisible (goalsContainer))
                goals.add (parseGoalEl (scrollTo (el)));
        } catch (StaleElementReferenceException s) {
            Logging.error ("getJobGoals: " + s.getMessage ());
            goals = new ArrayList <LaborData> ();
            scrollDown ();
            for (WebElement el : waitForElementsVisible (goalsContainer))
                goals.add (parseGoalEl (scrollTo (el)));
        }
        return goals;
    }

    private LaborData parseGoalEl (WebElement aGoal) {
        LaborData data = new LaborData ();
        if (isElementPresent (aGoal, "h4.goal-title"))
            data.setName (getText (aGoal, "h4.goal-title"));
        else
            data.setName (getText (aGoal, "div.goal-title"));

        if (isElementPresent (aGoal, "p.goal-details"))
            data.setDescription (getText (aGoal, " p.goal-details"));

        if (isElementPresent (aGoal, "div.goal-caption > span.salary-range-long")) {
            String salary = getAttribute (aGoal, "div.goal-caption > span.salary-range-long", "textContent");
            String[] range = salary.replaceAll ("(\\$|,)", "").split ("-");
            data.setSalaryTrendMin (range[0].trim ());
            data.setSalaryTrendMax (range[1].trim ());
        } else {
            String salary = getAttribute (aGoal, "div.goal-caption > span.salary-range-short", "textContent");
            String[] range = salary.replaceAll ("(\\$)", "").split ("-");
            data.setSalaryTrendMin (range[0].trim ());
            data.setSalaryTrendMax (range[1].trim ());
        }
        data.setROnet (aGoal.getAttribute ("data-goal-id"));
        return data;
    }

    public boolean clickJobTitle (LaborData data) {
        String goalTitle = goalsContainer + " .goal-title a[href $= '%s']";
        return click (String.format (goalTitle, data.getROnet ()));
    }

    public boolean clickMoreDetails (LaborData data) {
        String goalDetail = goalsContainer + " p.more-info a[href $= '%s']";
        return click (String.format (goalDetail, data.getROnet ()));
    }

    public boolean clickAddToMyGoal (LaborData data) {
        return click (String.format (goalItem, data.getROnet ()) + " button.my-goal-btn span.iconSvg");
    }

    public boolean setGoal (LaborData data) {
        String btn = String.format (goalItem, data.getROnet ());
        return click (btn + setGoal) && noSuchElementPresent (btn + disabled) && waitUntilVisible (btn + removeGoal);
    }

    public boolean removeGoal (LaborData data) {
        String btn = String.format (goalItem, data.getROnet ());
        return click (btn + removeGoal) && noSuchElementPresent (btn + disabled) && waitUntilVisible (btn + setGoal);
    }

    public String getNoGoalsMessage () {
        return getText ("div.tab-pane.active section.error");
    }

    public String getMaxTooltipMessage (LaborData data) {
        String btn = String.format (goalItem, data.getROnet ());
        hover (btn + setGoal);
        return getText (btn + " div.popover");
    }

    public boolean checkAddToMyGoalDisable (LaborData data) {
        return isElementPresent (String.format (goalItem, data.getROnet ()) + disabled);
    }

    public boolean clickListView () {
        boolean status = click (mainTab + " button.list-icon");
        status &= waitUntilVisible (mainTab + " div.list-jobs-container career-exp-table");
        return status;
    }

    public boolean isListViewPresent () {
        boolean status = waitUntilVisible (mainTab + " button.tile-icon[aria-disabled='false']");
        status &= waitUntilVisible (mainTab + " div.list-jobs-container career-exp-table");
        return status;
    }

    public boolean clickTileView () {
        boolean status = click (mainTab + " button.tile-icon");
        status &= waitUntilVisible (mainTab + " div.list-jobs-container career-exp-tiles");
        return status;
    }

    public boolean isTileViewPresent () {
        boolean status = waitUntilVisible (mainTab + " button.list-icon[aria-disabled='false']");
        status &= waitUntilVisible (mainTab + " div.list-jobs-container career-exp-tiles");
        return status;
    }

    public boolean setResultView (String view) {
        String response = checkSessionStorage ("return sessionStorage.resultView='" + view + "';");
        return response.equals (view);
    }
}
