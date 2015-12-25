package com.aptimus.careers.ui.explorer;

import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.explorer.LaborData;

public class MyGoals extends MainExplorer {

    private final String myGoals   = "section.my-goal-list-container";
    private final String goalsList = myGoals + " div.goal-item";
    private final String aGoal     = goalsList + "[data-ronet='%s']";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (myGoals + " div.apt-busy-fixed-center");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible (myGoals + " div.apt-busy-fixed-center");
        }

        if (cgBusy) {
            waitForElementInvisible (myGoals + " div.apt-busy-fixed-center");
            waitForElementInvisible (myGoals + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean areAllModulesPresent () {
        boolean status = waitUntilVisible (myGoals + " div[ui-tree='myGoals.treeOptions']");
        status &= waitUntilVisible (myGoals + " div.my-goal-title span.title");
        status &= waitUntilVisible (myGoals + " section.angular-ui-tree-nodes div.goal-item[data-ronet]");
        return status;
    }

    public boolean isGoalsListPresent () {
        return waitUntilVisible (myGoals);
    }

    @Override
    public boolean removeGoal (LaborData data) {
        boolean status = click (String.format (aGoal, data.getROnet ()) + " a.icon-delete");
        status &= waitUntilVisible ("body.modal-open > div.modal-backdrop");
        status &= waitUntilVisible ("body.modal-open > div.modal > div.modal-dialog");
        status &= click ("div.modal-content button[cg-busy]");

        while (!noSuchElementPresent ("div.modal-backdrop"))
            wait (200);

        status &= checkLoadingIcon ();
        status &= noSuchElementPresent (String.format (aGoal, data.getROnet ()));
        return status;
    }

    public String getMyGoalsText () {
        return getText (myGoals + " section h4");
    }

    public String getPrimaryGoalTitle () {
        return getText (myGoals + " div.my-goal-title span.title");
    }

    public List <LaborData> getMyGoals () {
        List <LaborData> goals = new ArrayList <LaborData> ();
        for (WebElement el : waitForElementsVisible (goalsList)) {
            if (isElementPresent (el, "div.goal-desc"))
                goals.add (parseGoalEl (scrollTo (el)));
        }
        return goals;
    }

    public LaborData getMyGoal (int idx) {
        return parseGoalEl (scrollTo (waitForElementVisible (goalsList + ":nth-child(" + idx + ")")));
    }

    private LaborData parseGoalEl (WebElement aGoal) {
        LaborData data = new LaborData ();
        data.setName (getAttribute (aGoal, " h4.goal-title", "textContent"));
        data.setDescription (getText (aGoal, " div.col.primary > p"));
        data.setROnet (aGoal.getAttribute ("data-ronet"));

        if (!isElementPresent (aGoal, " div.salary-range-short.ng-hide > span")) {
            String[] range = getText (aGoal, "div.salary-range-short > span").replaceAll ("(\\$|,)", "").split ("-");
            data.setSalaryTrendMin (range[0].trim ());
            data.setSalaryTrendMax (range[1].trim ());
        }
        return data;
    }

    @Override
    public boolean clickJobTitle (LaborData data) {
        return click (String.format (aGoal, data.getROnet ()) + " h4.goal-title > a");
    }

    public boolean clickUpdateMyGoals () {
        return click (myGoals + " div.text-right button");
    }

    public boolean isNoGoalsTextPresent (String text) {
        return isTextInElement (myGoals + " div.text-right > p", text);
    }

    public String getJobTitle (LaborData data) {
        return getText (String.format (aGoal, data.getROnet ()) + " h4.goal-title > a");
    }
}
