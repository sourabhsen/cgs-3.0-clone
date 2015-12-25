package com.aptimus.careers.test.skills;

import static com.aptimus.careers.util.PageHelper.Rating.Advanced;
import static com.aptimus.careers.util.PageHelper.Rating.Beginner;
import static com.aptimus.careers.util.PageHelper.Rating.Intermediate;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.SkipException;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.JobSearchResult.Result;
import com.aptimus.careers.dto.skill.RSkill;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.skills.SkillListContainer;
import com.aptimus.careers.util.PageHelper;

@Test (groups = { "SkillBuilder" })
public class SmartererTestSuite extends SkillBuilderTestBase {

    private RSkill             testSkill;
    private Result             goal;
    private SkillListContainer skills;
    private MainCareer         main;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        deleteMySkills ();

        main = new MainCareer ();
        main.disableWelcome ();

        goal = new Result ();
        goal.setId ("17-2051.00");
        goal.setName ("Civil Engineer");
    }

    public void verifySmartererDisclamer () {
        if (CareerEnvironment.isAnonymous)
            throw new SkipException ("These tests are not for ANONYMOUS user");

        skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        // Test: click on Assess This Skill
        testSkill = getSkill (goal, "Project Management");
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.setRating (testSkill));
        assertTrue (skills.clickAssessLink (testSkill));

        // Test: we're getting Legal notice and click Cancel
        assertTrue (skills.isSmartererLegalPresent ());
        assertTrue (skills.clickSmartererLegalCancel ());
        assertTrue (skills.isSmartererLegalHidden ());

        // Test: click Agree
        assertTrue (skills.clickAssessLink (testSkill));
        assertTrue (skills.isSmartererLegalPresent ());
        assertTrue (skills.clickSmartererLegalAgree ());
        assertTrue (skills.isSmartererLegalHidden ());
        assertTrue (skills.closeSmartererWindow ());

        // Test: check to see if Legal notice appear again
        testSkill = getSkill (goal, "AutoCAD");
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.setRating (testSkill));
        assertTrue (skills.clickAssessLink (testSkill));
        assertTrue (skills.isSmartererLegalHidden ());
    }

    public void forcedLoginOnAssess () {
        if (CareerEnvironment.isLoggedin)
            throw new SkipException ("These tests are for ANONYMOUS or KNOWN user");

        skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        // Test: click on Assess This Skill
        testSkill = getSkill (goal, "Project Management");
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.setRating (testSkill));
        assertTrue (skills.clickAssessLink (testSkill));

        // Test: user will get a login prompt
        assertTrue (PageHelper.getLogin ().doLogin ());
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        // Test: we're getting Legal notice and click Cancel
        assertTrue (skills.isSmartererLegalPresent ());
        assertTrue (skills.clickSmartererLegalCancel ());
        assertTrue (skills.isSmartererLegalHidden ());

        // Test: click on Assess This Skill one more time
        assertTrue (skills.clickAssessLink (testSkill));
        assertTrue (skills.isSmartererLegalPresent ());
        assertTrue (skills.clickSmartererLegalAgree ());
        assertTrue (skills.isSmartererLegalHidden ());
        assertTrue (skills.closeSmartererWindow ());
    }

    public void suggestionsDynamicTextForAdvanced () {
        if (CareerEnvironment.isAnonymous)
            throw new SkipException ("These tests are not for ANONYMOUS user");

        skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        testSkill = getSkill (goal, "Microsoft Excel");
        assertEquals (skills.getSelectedGoal (), goal.getName ());

        // Test: user set skill rating to Basic, but Smarterer assessment score is Advanced
        testSkill.setUserDeclaredLevel (Beginner.name ());
        assertTrue (skills.setRating (testSkill));
        assertTrue (skills.toggleListWindow (testSkill));

        String score = "According to the results of this assessment, your skill level is Advanced.";
        String AdvancedBasic = "According to this Smarterer assessment, your skill level is Advanced, that’s great! We suggest that you update this skill level to Advanced and focus on building other skills.";
        assertTrue (skills.isSuggestionShortPresent (testSkill, score));
        assertTrue (skills.isSuggestionFullPresent (testSkill, AdvancedBasic));

        // Test: user click on "update this skill level to Advanced"
        String AdvancedAdvanced = "According to this Smarterer assessment, your skill level is Advanced, great work! We suggest that you focus on building other skills.";
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.updateSkillLevel (testSkill));
        assertTrue (skills.isSuggestionFullPresent (testSkill, AdvancedAdvanced));

        // Test: user set skill rating to Intermediate, but Smarterer assessment score is Advanced
        testSkill.setUserDeclaredLevel (Intermediate.name ());
        assertTrue (skills.setRating (testSkill));

        String AdvancedIntermediate = "According to this Smarterer assessment, your skill level is Advanced, that’s great! We suggest that you update this skill level to Advanced and focus on building other skills.";
        assertTrue (skills.isSuggestionShortPresent (testSkill, score));
        assertTrue (skills.isSuggestionFullPresent (testSkill, AdvancedIntermediate));

        // Test: user click on "update this skill level to Advanced"
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.updateSkillLevel (testSkill));
        assertTrue (skills.isSuggestionFullPresent (testSkill, AdvancedAdvanced));
    }

    public void suggestionsDynamicTextForIntermediate () {
        if (CareerEnvironment.isAnonymous)
            throw new SkipException ("These tests are not for ANONYMOUS user");

        skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        testSkill = getSkill (goal, "Project Management");
        assertEquals (skills.getSelectedGoal (), goal.getName ());

        // Test: user set skill rating to Basic, but Smarterer assessment score is Intermediate
        testSkill.setUserDeclaredLevel (Beginner.name ());
        assertTrue (skills.setRating (testSkill));
        assertTrue (skills.toggleListWindow (testSkill));

        String score = "According to the results of this assessment, your skill level is Intermediate.";
        String IntermediateBasic = "According to this Smarterer assessment, your skill level is Intermediate. Good work, we suggest that you update this skill level to Intermediate and continue to Improve This Skill. As you further develop this skill, you can answer more questions to reassess your skill level.";
        assertTrue (skills.isSuggestionShortPresent (testSkill, score));
        assertTrue (skills.isSuggestionFullPresent (testSkill, IntermediateBasic));

        // Test: user click on "update this skill level to Intermediate"
        String IntermediateIntermediate = "According to this Smarterer assessment, your skill level is Intermediate. Good work, we suggest that you continue to Improve This Skill. As you further develop this skill, you can answer more questions to reassess your skill level.";
        testSkill.setUserDeclaredLevel (Intermediate.name ());
        assertTrue (skills.updateSkillLevel (testSkill));
        assertTrue (skills.isSuggestionFullPresent (testSkill, IntermediateIntermediate));

        // Test: user set skill rating to Advanced, but Smarterer assessment score is Intermediate
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.setRating (testSkill));

        String IntermediateAdvanced = "According to this Smarterer assessment, your skill level is Intermediate. Good work, we suggest that you change this skill level to Intermediate and continue to Improve This Skill. As you further develop this skill, you can answer more questions to reassess your skill level.";
        assertTrue (skills.isSuggestionShortPresent (testSkill, score));
        assertTrue (skills.isSuggestionFullPresent (testSkill, IntermediateAdvanced));

        // Test: user click on "change this skill level to Intermediate"
        testSkill.setUserDeclaredLevel (Intermediate.name ());
        assertTrue (skills.updateSkillLevel (testSkill));
        assertTrue (skills.isSuggestionFullPresent (testSkill, IntermediateIntermediate));
    }

    public void suggestionsDynamicTextForBasic () {
        if (CareerEnvironment.isAnonymous)
            throw new SkipException ("These tests are not for ANONYMOUS user");

        skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        testSkill = getSkill (goal, "AutoCAD");
        assertEquals (skills.getSelectedGoal (), goal.getName ());

        // Test: user set skill rating to Advanced and Smarterer assessment score is Basic
        testSkill.setUserDeclaredLevel (Advanced.name ());
        assertTrue (skills.setRating (testSkill));
        assertTrue (skills.toggleListWindow (testSkill));

        String score = "According to the results of this assessment, your skill level is Basic.";
        String BasicAdvanced = "According to this Smarterer assessment, your skill level is Basic. We suggest that you change your skill level to Basic and then work to Improve This Skill. As you further develop this skill, you can answer more questions to reassess your skill level.";
        assertTrue (skills.isSuggestionShortPresent (testSkill, score));
        assertTrue (skills.isSuggestionFullPresent (testSkill, BasicAdvanced));

        // Test: user click on "change this skill level to Basic"
        String BasicBasic = "According to this Smarterer assessment, your skill level is Basic. We suggest that you work to Improve This Skill. As you further develop this skill, you can answer more questions to reassess your skill level.";
        testSkill.setUserDeclaredLevel (Beginner.name ());
        assertTrue (skills.updateSkillLevel (testSkill));
        assertTrue (skills.isSuggestionFullPresent (testSkill, BasicBasic));

        // Test: user set skill rating to Intermediate, but Smarterer assessment score is Basic
        testSkill.setUserDeclaredLevel (Intermediate.name ());
        assertTrue (skills.setRating (testSkill));

        String BasicIntermediate = "According to this Smarterer assessment, your skill level is basic. We suggest that you change your skill level to Basic and then work to Improve This Skill. As you further develop this skill, you can answer more questions to reassess your skill level.";
        assertTrue (skills.isSuggestionShortPresent (testSkill, score));
        assertTrue (skills.isSuggestionFullPresent (testSkill, BasicIntermediate));

        // Test: user click on "change this skill level to Basic"
        testSkill.setUserDeclaredLevel (Beginner.name ());
        assertTrue (skills.updateSkillLevel (testSkill));
        assertTrue (skills.isSuggestionFullPresent (testSkill, BasicBasic));
    }
}
