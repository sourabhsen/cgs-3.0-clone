package com.aptimus.careers.ui.dashboard.modules;

import com.aptimus.careers.dto.milestones.Milestone;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.plan.MainMilestones;

public class Milestones extends MainCareer {

    public boolean isMilestonesPresent () {
        boolean status = scrollTo (waitForElementVisible ("section.milestone-list")).isDisplayed ();
        status &= waitUntilVisible ("div.status-header");
        status &= waitUntilVisible ("div.status-bar");
        return status;
    }

    public String getHeader () {
        return getText ("div.status-header > div.col");
    }

    public MainMilestones clickMilestone (Milestone milestone) {
        return gotoMilestone (milestone);
    }
}
