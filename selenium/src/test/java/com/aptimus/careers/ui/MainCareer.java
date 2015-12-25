package com.aptimus.careers.ui;

import static com.aptimus.careers.util.PageHelper.Tool.careerExploration;
import static com.aptimus.careers.util.PageHelper.Tool.interviewPreparation;
import static com.aptimus.careers.util.PageHelper.Tool.jobsearch;
import static com.aptimus.careers.util.PageHelper.Tool.resumeBuilder;
import static com.aptimus.careers.util.PageHelper.Tool.skillBuilder;
import org.openqa.selenium.Keys;
import com.aptimus.careers.dto.milestones.Milestone;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.explorer.Recommendation;
import com.aptimus.careers.ui.interview.Questions;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.plan.MainMilestones;
import com.aptimus.careers.ui.resume.MainResume;
import com.aptimus.careers.ui.skills.SkillListContainer;
import com.aptimus.test.selenium.Logging;

public class MainCareer extends CareerPage {

    private final String breadcrumb = "ol#breadcrumb-list";

    public String getBreadcrumb () {
        return getText (breadcrumb + " > li.ng-scope") + " " + getText (breadcrumb + " li.ng-scope.active");
    }

    public String getHeading () {
        return getText ("h1#main-content-heading");
    }

    public boolean clickClose () {
        return click ("div.tool-wrapper a.modal-close-link");
    }

    public boolean clickBackToPreviousPage () {
        return click ("div.tool-previous-page a");
    }

    public boolean pressEnter () {
        // sendKeysToActiveElement is part of the interactions API and is not implemented in Safari
        // https://code.google.com/p/selenium/issues/detail?id=4136
        if (CareerEnvironment.isMobile) {
            getDriver ().switchTo ().activeElement ().sendKeys ("\r");
            return true;
        } else if (CareerEnvironment.usingIE)
            return pressKey (Keys.ENTER);
        else
            return pressKey (Keys.RETURN);
    }

    public Recommendation gotoCareerExploration () {
        click ("a.tool-" + careerExploration);
        return new Recommendation ();
    }

    public Questions gotoInterviewPreparation () {
        click ("a.tool-" + interviewPreparation);
        return new Questions ();
    }

    public JobSearch gotoJobSearch () {
        click ("a.tool-" + jobsearch);
        waitForElement ("input#searchWords");
        return new JobSearch ();
    }

    public JobSearch gotoJobSearch (String paramString) {
        String url = CareerEnvironment.baseUrl + "/#/tools/jobsearch";
        if (paramString != null) {
            url += paramString;
        }
        navigateTo (url);
        return new JobSearch ();
    }

    public MainResume gotoResumeBuilder () {
        click ("a.tool-" + resumeBuilder);
        return new MainResume ();
    }

    public SkillListContainer gotoSkillBuilder () {
        click ("a.tool-" + skillBuilder);
        return new SkillListContainer ();
    }

    public MainMilestones gotoMilestone (Milestone milestone) {
        if (!click ("a." + milestone.css)) {
            checkLoadingIcon ();
            click ("a." + milestone.css);
        }

        return new MainMilestones ();
    }

    public void disableWelcome () {
        String info = executeJavascript ("sessionStorage.setItem('cgs.coachmark.skillBuilder.walkthrough', true)");
        Logging.info ("disableWelcome: " + info);
    }

    public void enableWelcome () {
        String info = executeJavascript ("sessionStorage.setItem('cgs.coachmark.skillBuilder.walkthrough', false)");
        Logging.info ("enableWelcome: " + info);
    }
}
