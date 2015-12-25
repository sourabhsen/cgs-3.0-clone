package com.aptimus.careers.ui.dashboard.modules;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.ui.dashboard.MainDashboard;

public class Goals extends MainDashboard {

    private final String goal = myGoals + " div.mygoal[data-ronet='%s']";

    public boolean isGoalsPresent () {
        boolean status = waitUntilVisible (myGoals + " h3[role='heading']");
        status &= waitUntilVisible (myGoals + " div.mygoalslist-inner-container[aria-hidden='false']");
        return status;
    }

    public String getModuleHeader () {
        return getText (myGoals + " h3[role='heading']");
    }

    public String getNoGoalsText () {
        return getText (myGoals + " div.mygoalslist-inner-container[aria-hidden='false'] > p");
    }

    public boolean clickGetStartedNow () {
        return click (myGoals + " a.get-started-link");
    }

    public String getGoalTitle (LaborData data) {
        return getText (String.format (goal, data.getROnet ()) + " div.name > a");
    }

    public boolean clickBuildSkill (LaborData data) {
        return click (String.format (goal, data.getROnet ()) + " div.build-skill a");
    }

    public boolean clickNewGoal () {
        return click (By.linkText ("New Goal"));
    }

    public boolean clickSeeAll () {
        return click (myGoals + " a.go-to-savedgoals");
    }

    public LaborData getMyGoal () {
        return parseGoalEl (scrollTo (waitForElementVisible (myGoals + " div.mygoal")));
    }

    private LaborData parseGoalEl (WebElement aGoal) {
        LaborData data = new LaborData ();
        data.setName (getText (aGoal, "div.name > a"));
        data.setROnet (aGoal.getAttribute ("data-ronet"));
        return data;
    }

    public boolean isGoalPrimary () {
        return isElementVisible (myGoals + " .goal-classification");
    }
}
