package com.aptimus.careers.dto.milestones;

import java.util.Arrays;
import java.util.List;

// cd src/assets/json/tenant/uopx
// grep identifier config.json |grep 'strategies-' |awk -F: '{print $2}'
public class Milestone {

    public String           css, number, href;
    public List <String>    stages;
    public static Milestone SetYourGoals          = SetYourGoals ();
    public static Milestone SharpenYourSkills     = SharpenYourSkills ();
    public static Milestone BuildYourResume       = BuildYourResume ();
    public static Milestone CraftYourImage        = CraftYourImage ();
    public static Milestone NetworkLikePro        = NetworkLikePro ();
    public static Milestone WriteGreatCoverletter = WriteGreatCoverletter ();
    public static Milestone AceYourInterview      = AceYourInterview ();
    public static Milestone DevelopYourGamePlan   = DevelopYourGamePlan ();
    public static Milestone SearchAndApply        = SearchAndApply ();
    public static Milestone AdvanceYourCareer     = AdvanceYourCareer ();

    public Milestone (String css, String number, String href, String... stageIds) {
        this.css = css;
        this.number = number;
        this.href = "#/milestones" + href;
        this.stages = Arrays.asList (stageIds);
    }

    private static Milestone SetYourGoals () {
        return new Milestone ("ms-goals", "Milestone 1", "/milestone-1",
                              "goals-chart", "goals-set");
    }

    private static Milestone SharpenYourSkills () {
        return new Milestone ("ms-skills", "Milestone 2", "/milestone-2",
                              "skills-basics", "skills-experience", "skills-develop");
    }

    private static Milestone BuildYourResume () {
        return new Milestone ("ms-resume", "Milestone 3", "/milestone-3",
                              "resume-discover", "resume-create", "resume-build");
    }

    private static Milestone CraftYourImage () {
        return new Milestone ("ms-image", "Milestone 4", "/milestone-4",
                              "image-brand", "image-pitch", "image-online", "image-linkedin", "image-dress");
    }

    private static Milestone NetworkLikePro () {
        return new Milestone ("ms-network", "Milestone 5", "/milestone-5",
                              "network-basics", "network-linkedin", "network-organizations", "network-yourself",
                              "network-plan");
    }

    private static Milestone WriteGreatCoverletter () {
        return new Milestone ("ms-letter", "Milestone 6", "/milestone-6",
                              "letter-employers", "letter-story", "letter-polish");
    }

    private static Milestone AceYourInterview () {
        return new Milestone ("ms-interview", "Milestone 7", "/milestone-7",
                              "interview-employers", "interview-storyteller", "interview-research", "interview-prep",
                              "interview-history", "interview-questions", "interview-practice",
                              "interview-informational");
    }

    private static Milestone DevelopYourGamePlan () {
        return new Milestone ("ms-strategies", "Milestone 8", "/milestone-8",
                              "strategies-managers", "strategies-prioritize", "strategies-insider");
    }

    private static Milestone SearchAndApply () {
        return new Milestone ("ms-apply", "Milestone 9", "/milestone-9",
                              "apply-customize", "apply-search", "apply-track", "apply-prepare", "apply-followup",
                              "apply-negotiations");
    }

    private static Milestone AdvanceYourCareer () {
        return new Milestone ("ms-career-management", "Milestone 10", "/milestone-10",
                              "career-management-growth", "career-management-relationships",
                              "career-management-promoted");
    }
}
