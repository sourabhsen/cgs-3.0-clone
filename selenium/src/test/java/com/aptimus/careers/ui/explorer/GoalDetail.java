package com.aptimus.careers.ui.explorer;

import java.util.Arrays;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.explorer.Degree;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.dto.explorer.LaborData.Certification;
import com.aptimus.careers.dto.explorer.LaborData.EducationRequirement;
import com.aptimus.careers.dto.explorer.LaborData.ExperienceLevel;
import com.aptimus.careers.dto.explorer.Program;
import com.aptimus.careers.dto.explorer.Ronet;

public class GoalDetail extends MainExplorer {

    private final String detail  = "main.career-exploration-detail-container";
    private final String left    = detail + " div.primary";
    private final String right   = detail + " div.secondary";
    private final String legal   = left + " section.one-col div#legal p";
    private final String goalBtn = right + " my-goal-button";

    @Override
    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible (detail + " div.apt-busy");
        if (!cgBusy) {
            wait (1000);
            cgBusy = isElementVisible (detail + " div.apt-busy");
        }

        if (cgBusy) {
            waitForElementInvisible (detail + " div.apt-busy");
            waitForElementInvisible (detail + " div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public boolean isGoalDetailPresent () {
        boolean status = waitUntilVisible (detail);
        status &= waitUntilVisible (left);
        status &= waitUntilVisible (right);
        status &= waitUntilVisible (legal);
        return status;
    }

    public boolean areLeftModulesPresent () {
        boolean status = waitUntilVisible (left);
        status &= waitUntilVisible (left + " h2.details-overview + p.related-titles");
        status &= waitUntilVisible (left + " h4.details-skill-req + p + section ul.nav-tabs + div.tab-content");
        status &= waitUntilVisible (left + " h4.details-experience + p + section ul.list");
        status &= waitUntilVisible (left + " h4.details-education + p + section");
        status &= waitUntilVisible (legal);
        return status;
    }

    public boolean isGoalTitle (String title) {
        return isTextInElement (left + " h2.details-overview", title);
    }

    public String getSkillsHeader () {
        return getText (left + " h4.details-skill-req");
    }

    public String getSkillsText () {
        return getText (left + " h4.details-skill-req + p");
    }

    public String getExperienceHeader () {
        return getText (left + " h4.details-experience");
    }

    public String getExperienceText () {
        return getText (left + " h4.details-experience + p");
    }

    public String getEducationHeader () {
        return getText (left + " h4.details-education");
    }

    @Override
    public String getDisclaimerText () {
        return getText (legal);
    }

    public boolean areRightModulesPresent () {
        boolean status = waitUntilVisible (right + " div.goal-caption.salary-range");
        status &= waitUntilVisible (right + " div.demand-bar");
        status &= waitUntilVisible (right + " div.max-exp");
        status &= waitUntilVisible (right + " div#ng-circles-0.circles-chart");
        status &= waitUntilVisible (right + " div#ng-circles-1.circles-chart");
        return status;
    }

    public Ronet getGoalDetail () {
        Ronet ronet = new Ronet ();
        ronet.setLaborData (new LaborData ());
        ronet = getDescription (ronet);
        ronet = getSkills (ronet);
        ronet = getExperience (ronet);
        ronet = getEducation (ronet);
        ronet = getNumJobOpportunities (ronet);
        ronet = getTopEmployers (ronet);

        if (isElementPresent (right + " div.goal-caption.salary-range")) {
            String[] range = getText (right + " div.goal-caption.salary-range > p.xlarge-red")
                    .replaceAll ("(\\$|,)", "").split ("-");
            ronet.getLaborData ().setSalaryTrendMin (range[0].trim ());
            ronet.getLaborData ().setSalaryTrendMax (range[1].trim ());
        }
        return ronet;
    }

    private Ronet getDescription (Ronet ronet) {
        String rOnet = executeJavascript ("return document.URL;").split ("id=")[1];
        ronet.getLaborData ().setROnet (rOnet);
        ronet.getLaborData ().setName (getText (left + " h2.details-overview"));
        ronet.getLaborData ().setDescription (getText (left + " h2.details-overview + p.related-titles + p"));

        String titles = getText (left + " h2.details-overview + p.related-titles").replace ("Related Titles: ", "");
        ronet.setRelatedTitles (Arrays.asList (titles.split (", ")));
        return ronet;
    }

    private Ronet getSkills (Ronet ronet) {
        String skills = left + " div[ng-if='careerDetails.vm.goal.skills']";
        if (isElementPresent (skills) && scrollTo (waitForElementVisible (skills)).isDisplayed ()) {
            if (isElementPresent (skills + " div.tab-content > div.tab-pane:nth-child(1) li")) {
                for (WebElement el : waitForElements (skills + " div.tab-content > div.tab-pane:nth-child(1) li")) {
                    String skill = el.getAttribute ("textContent").trim ();
                    if (!skill.trim ().isEmpty ())
                        ronet.setSpecializedSkill (skill);
                }
            }

            if (isElementPresent (skills + " div.tab-content > div.tab-pane:nth-child(2) li")) {
                for (WebElement el : waitForElements (skills + " div.tab-content > div.tab-pane:nth-child(2) li")) {
                    String skill = el.getAttribute ("textContent").trim ();
                    if (!skill.trim ().isEmpty ())
                        ronet.setSoftwareSkill (skill);
                }
            }

            if (isElementPresent (skills + " div.tab-content > div.tab-pane:nth-child(3) li")) {
                for (WebElement el : waitForElements (skills + " div.tab-content > div.tab-pane:nth-child(3) li")) {
                    String skill = el.getAttribute ("textContent").trim ();
                    if (!skill.trim ().isEmpty ())
                        ronet.setFoundationSkill (skill);
                }
            }
        }
        return ronet;
    }

    private Ronet getExperience (Ronet ronet) {
        String expr = left + " h4.details-experience + p + section";
        scrollTo (waitForElementVisible (expr));
        for (String experience : getText (expr + " ul").split ("\\n")) {
            String[] tmp = experience.split ("%");
            if (tmp[1].trim ().startsWith ("Less than 2 years"))
                ronet.getLaborData ().setExperienceLevel (new ExperienceLevel (tmp[0], "LessThanTwoYears"));
            else if (tmp[1].trim ().startsWith ("2 - 5 years"))
                ronet.getLaborData ().setExperienceLevel (new ExperienceLevel (tmp[0], "TwoToFiveYears"));
            else if (tmp[1].trim ().startsWith ("5 - 8 years"))
                ronet.getLaborData ().setExperienceLevel (new ExperienceLevel (tmp[0], "FiveToEightYears"));
            else if (tmp[1].trim ().startsWith ("8+ years"))
                ronet.getLaborData ().setExperienceLevel (new ExperienceLevel (tmp[0], "EightPlusYears"));
        }

        return ronet;
    }

    private Ronet getEducation (Ronet ronet) {
        String edu = left + " div[ng-if='careerDetails.vm.goal.maxEducation.requirementPercentile']";
        String uop = edu + " div[ng-if='(careerDetails.vm.displayDegrees && careerDetails.vm.goal.programs.length)'] ul";
        if (isElementPresent (uop + " > li") && scrollTo (waitForElementVisible (uop)).isDisplayed ()) {
            for (String degree : getText (uop).split ("\\n")) {
                String[] tmp = degree.split (" - ", 2);
                Program program = new Program ();
                program.setProgramLevel (tmp[0]);
                program.setProgramName (tmp[1]);
                ronet.setPrograms (program);
            }
        }

        String gen = edu + " div[ng-if='careerDetails.vm.goal.degreeList.length'] ul";
        if (isElementPresent (gen + " > li") && scrollTo (waitForElementVisible (gen)).isDisplayed ()) {
            for (String degreeName : getText (gen).split ("\\n"))
                ronet.setDegreeList (new Degree (degreeName));
        }

        String minEdu = edu + " div[ng-if='careerDetails.vm.goal.laborData.educationRequirements.length'] ul";
        if (isElementPresent (minEdu + " > li") && scrollTo (waitForElementVisible (minEdu)).isDisplayed ()) {
            for (String level : getText (minEdu).split ("\\n")) {
                String[] tmp = level.split ("%");
                if (tmp[1].trim ().startsWith ("High"))
                    ronet.getLaborData ().setEducationRequirement
                            (new EducationRequirement (tmp[0], "HighSchoolTechnicalTraining"));
                else if (tmp[1].trim ().startsWith ("Associate"))
                    ronet.getLaborData ().setEducationRequirement
                            (new EducationRequirement (tmp[0], "AssociatesDegree"));
                else if (tmp[1].trim ().startsWith ("Bachelor"))
                    ronet.getLaborData ().setEducationRequirement
                            (new EducationRequirement (tmp[0], "BachelorsDegree"));
                else if (tmp[1].trim ().startsWith ("Master"))
                    ronet.getLaborData ().setEducationRequirement
                            (new EducationRequirement (tmp[0], "GraduateProfessionalDegree"));
            }
        }

        String cert = edu + " div[ng-if='careerDetails.vm.goal.laborData.certifications.length'] ul";
        if (isElementPresent (cert + " > li") && scrollTo (waitForElementVisible (cert)).isDisplayed ()) {
            for (String license : getText (cert).split ("\\n"))
                ronet.getLaborData ().setCertification (new Certification (license));
        }
        return ronet;
    }

    private Ronet getNumJobOpportunities (Ronet ronet) {
        scrollTo (waitForElementVisible (right));
        ronet.setNumJobOpportunities (getText (right + " section:nth-child(2) p.xlarge-red"));
        return ronet;
    }

    private Ronet getTopEmployers (Ronet ronet) {
        if (isElementPresent (right + " section ul.list-small > li")) {
            String[] employers = getText (right + " section ul.list-small").split ("\\n");
            for (String employer : employers)
                ronet.setTopEmployer (employer);
        }
        return ronet;
    }

    public boolean setGoal () {
        return click (goalBtn + setGoal) && waitUntilVisible (goalBtn + removeGoal);
    }

    public boolean removeGoal () {
        return click (goalBtn + removeGoal) && waitUntilVisible (goalBtn + setGoal);
    }

    public int getCurrentJobOpenings () {
        return Integer.parseInt (getText (right + " section:nth-child(2) p.xlarge-red"));
    }

    public boolean clickCurrentJobOpenings () {
        return click (By.linkText ("CURRENT JOB OPENINGS IN YOUR AREA"));
    }

    public String getTopEmployer (int idx) {
        String link = right + " section ul.list-small li:nth-child(" + idx + ")";
        return getText (link).split (" \\(")[0].trim ();
    }

    public int getTopEmployerJobCount (int idx) {
        String link = right + " section ul.list-small li:nth-child(" + idx + ")";
        return Integer.valueOf (getText (link).split (" \\(")[1].replace (")", ""));
    }

    public boolean clickTopEmployer (int idx) {
        String link = right + " section ul.list-small li:nth-child(" + idx + ") a";
        return click (link);
    }
}
