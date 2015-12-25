package com.aptimus.careers.test.skills;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.skills.SkillListContainer;
import com.aptimus.careers.ui.skills.TutorialPage;

@Test (groups = { "SkillBuilder" })
public class IntroScreenTestSuite extends SkillBuilderTestBase {

    private MainCareer main;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        main = new MainCareer ();
        main.enableWelcome ();
    }

    public void firstTimeUser () {
        SkillListContainer skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        // Test: first time user
        TutorialPage modal = new TutorialPage ();
        assertTrue (modal.areAllModulesPresent ());
        assertTrue (modal.isTutorialPagePresent ());
        assertTrue (modal.isPageOnePresent ());
        assertTrue (skills.clickClose ());

        // Test: we're getting intro page again
        skills = new MainCareer ().gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (modal.isTutorialPagePresent ());
        assertTrue (modal.isPageOnePresent ());

        // Test: try "Don't show again" feature
        assertTrue (modal.clickDonotShow ());
        assertTrue (modal.isTutorialPageHidden ());
        assertTrue (skills.clickClose ());

        // Test: we're NOT getting intro page again
        skills = new MainCareer ().gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());
        assertTrue (modal.isTutorialPageHidden ());

        // Test: clicking How do I use this tool?
        assertTrue (modal.clickUseThisTool ());
        assertTrue (modal.isTutorialPagePresent ());
        assertTrue (modal.isPageOnePresent ());
    }

    public void checkAllComponents () {
        SkillListContainer skills = new MainCareer ().gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        // Test: check all components are present on first page
        TutorialPage modal = new TutorialPage ();
        assertTrue (modal.areAllModulesPresent ());
        assertTrue (modal.isTutorialPagePresent ());
        assertTrue (modal.isPageOnePresent ());

        assertEquals (modal.getPageOneTitle (), "Introduction to the Skill Builder");
        assertTrue (modal.getPageOneParagraphs ().length () > 10, "We search thousands of ...");

        // Test: check all components are present on second page
        assertTrue (modal.clickNext ());
        assertTrue (modal.isPageTwoPresent ());
        assertEquals (modal.getPageTwoTitle (), "Explore resources and assessments based on your skill level");
        assertTrue (modal.isPageTwoImgPresent ());

        // Test: check all components are present on third page
        assertTrue (modal.clickNext ());
        assertTrue (modal.isPageThreePresent ());
        assertEquals (modal.getPageThreeTitle (), "Make a plan");
        assertTrue (modal.getPageThreeParagraphs ().length () > 10, "We recommend you create a schedule ...");
        assertTrue (modal.isPageThreeImgPresent ());

        // Test: try Back link
        assertTrue (modal.clickBack ());
        assertTrue (modal.isPageTwoPresent ());

        // Test: try Back link again
        assertTrue (modal.clickBack ());
        assertTrue (modal.isPageOnePresent ());

        // Test: try Next link
        assertTrue (modal.clickNext ());
        assertTrue (modal.isPageTwoPresent ());

        // Test: try Next link again
        assertTrue (modal.clickNext ());
        assertTrue (modal.isPageThreePresent ());

        // Test: at the last page, click on Next will close the page
        assertTrue (modal.clickNext ());
        assertTrue (modal.isTutorialPageHidden ());
        assertTrue (skills.isSkillBuilderPresent ());
        assertEquals (skills.getHeading (), "Skill Builder");
        assertTrue (skills.clickClose ());

        skills = new MainCareer ().gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (modal.isTutorialPageHidden ());
    }
}
