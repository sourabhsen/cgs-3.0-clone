package com.aptimus.careers.ui.dashboard.modules;

import com.aptimus.careers.ui.dashboard.MainDashboard;
import com.aptimus.careers.ui.explorer.Recommendation;
import com.aptimus.careers.ui.interview.Questions;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.skills.SkillListContainer;

public class Tools extends MainDashboard {

    private final String container = "div.career-tools";

    public boolean isToolsPresent () {
        return scrollTo (waitForElementVisible (container)).isDisplayed ();
    }

    public String getToolsHeader () {
        return getText (container + " h2[role='heading']");
    }

    public Recommendation clickCareerExploration () {
        click (container + " a[href*='career-exploration']");
        return new Recommendation ();
    }

    public SkillListContainer clickSkillBuilder () {
        click (container + " a[href*='skill-builder']");
        return new SkillListContainer ();
    }

    public MainResume clickResumeBuilder () {
        click (container + " a[href*='resume-builder']");
        return new MainResume ();
    }

    public JobSearch clickJobSearch () {
        click (container + " a[href*='job-search']");
        waitForElement ("input#job-title");
        return new JobSearch ();
    }

    public Questions clickInterviewPreparation () {
        click (container + " a[href*='interview-preparation']");
        waitForElement ("div#interviewprep-container");
        return new Questions ();
    }
}
