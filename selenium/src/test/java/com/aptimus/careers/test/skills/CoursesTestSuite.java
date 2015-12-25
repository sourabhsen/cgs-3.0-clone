package com.aptimus.careers.test.skills;

import static com.aptimus.careers.util.PageHelper.CourseType.Book;
import static com.aptimus.careers.util.PageHelper.CourseType.Bootcamp;
import static com.aptimus.careers.util.PageHelper.CourseType.Course;
import static com.aptimus.careers.util.PageHelper.CourseType.Miscellaneous;
import static com.aptimus.careers.util.PageHelper.CourseType.Talk;
import static com.aptimus.careers.util.PageHelper.CourseType.Webinar;
import static com.aptimus.careers.util.PageHelper.CourseType.allTypes;
import static com.aptimus.careers.util.PageHelper.PriceType.allPrices;
import static com.aptimus.careers.util.PageHelper.PriceType.fiftyToHun;
import static com.aptimus.careers.util.PageHelper.PriceType.fiveHunToFiveThou;
import static com.aptimus.careers.util.PageHelper.PriceType.fiveThouToTenThou;
import static com.aptimus.careers.util.PageHelper.PriceType.free;
import static com.aptimus.careers.util.PageHelper.PriceType.hunToTwoFifty;
import static com.aptimus.careers.util.PageHelper.PriceType.lessThanFifty;
import static com.aptimus.careers.util.PageHelper.PriceType.tenThouToTwentyThou;
import static com.aptimus.careers.util.PageHelper.PriceType.twoFiftyToFiveHun;
import static com.aptimus.careers.util.PageHelper.PriceType.unpriced;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import java.text.NumberFormat;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.JobSearchResult.Result;
import com.aptimus.careers.dto.skill.RSkill;
import com.aptimus.careers.dto.skill.SkilledUp;
import com.aptimus.careers.dto.skill.SkilledUp.Course;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.skills.SkillListContainer;
import com.aptimus.careers.ui.skills.courses.CourseList;

@Test (groups = { "SkillBuilder" })
public class CoursesTestSuite extends SkillBuilderTestBase {

    private Result     goal;
    private MainCareer main;

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod () {
        main = new MainCareer ();
        main.disableWelcome ();

        goal = new Result ();
        goal.setId ("17-2051.00");
        goal.setName ("Civil Engineer");
    }

    public void verifyAllModulesPresent () {
        String legal = "You will be taken an external site to access these courses";

        SkillListContainer skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());

        RSkill testSkill = skills.getSkill (1);
        assertTrue (skills.clickImproveThisSkill (testSkill));

        // Test: check all modules are present for Course results page
        CourseList list = new CourseList ();
        assertTrue (list.areAllModulesPresent ());
        assertTrue (list.clickFilterResults ());
        assertTrue (list.areFiltersPresent ());
        assertTrue (list.getSkilledUpDisclaimer ().contains (legal));

        SkilledUp skilledUp = getCourses (testSkill, allTypes, free);
        int count = skilledUp.getTotalNumberOfResults ();
        assertTrue (list.isResultsCount (count));
        String header = NumberFormat.getInstance ().format (count) + " courses for ";
        assertTrue (list.getCountHeader ().contains (header + testSkill.getSkill ().getDisplayName ()));
        assertTrue (list.closeFilterResults ());
    }

    public void filterByCourseType () {
        SkillListContainer skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());
        assertEquals (skills.getSelectedGoal (), goal.getName ());

        RSkill testSkill = getSkill (goal, "Civil Engineering");
        assertTrue (skills.clickImproveThisSkill (testSkill));

        SkilledUp skilledUp1 = getCourses (testSkill, allTypes, free);
        SkilledUp skilledUp2 = getCourses (testSkill, allTypes, allPrices);
        SkilledUp skilledUp3 = getCourses (testSkill, Course, allPrices);
        SkilledUp skilledUp4 = getCourses (testSkill, Book, allPrices);
        SkilledUp skilledUp5 = getCourses (testSkill, Webinar, allPrices);
        SkilledUp skilledUp6 = getCourses (testSkill, Bootcamp, allPrices);
        SkilledUp skilledUp7 = getCourses (testSkill, Talk, allPrices);
        SkilledUp skilledUp8 = getCourses (testSkill, Miscellaneous, allPrices);

        // Test: verify default is at Course Type - All Types
        CourseList list = new CourseList ();
        assertTrue (list.clickFilterResults ());
        assertTrue (list.isFilterSet (allTypes));
        assertTrue (list.isResultsCount (skilledUp1.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp1.getTerms ());
        verifyCourses (list.getCourses (), skilledUp1.getCourses ());

        // Test: set filter at Price - All Prices, so we can exercise other course type filters
        assertTrue (list.setFilter (allPrices));
        assertTrue (list.isFilterSet (allPrices));
        assertTrue (list.isResultsCount (skilledUp2.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp2.getTerms ());
        verifyCourses (list.getCourses (), skilledUp2.getCourses ());

        // Test: set filter at Course Type - Courses
        assertTrue (list.setFilter (Course));
        assertTrue (list.isFilterSet (Course));
        assertTrue (list.isResultsCount (skilledUp3.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp3.getTerms ());
        verifyCourses (list.getCourses (), skilledUp3.getCourses ());

        // Test: set filter at Course Type - Books & E-Books
        assertTrue (list.setFilter (Book));
        assertTrue (list.isFilterSet (Book));
        assertTrue (list.isResultsCount (skilledUp4.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp4.getTerms ());
        verifyCourses (list.getCourses (), skilledUp4.getCourses ());

        // Test: set filter at Course Type - Webinars
        assertTrue (list.setFilter (Webinar));
        assertTrue (list.isFilterSet (Webinar));
        assertTrue (list.isResultsCount (skilledUp5.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp5.getTerms ());
        verifyCourses (list.getCourses (), skilledUp5.getCourses ());

        // Test: set filter at Course Type - Bootcamps
        assertTrue (list.setFilter (Bootcamp));
        assertTrue (list.isFilterSet (Bootcamp));
        assertTrue (list.isResultsCount (skilledUp6.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp6.getTerms ());
        verifyCourses (list.getCourses (), skilledUp6.getCourses ());

        // Test: set filter at Course Type - Talks & Lectures
        assertTrue (list.setFilter (Talk));
        assertTrue (list.isFilterSet (Talk));
        assertTrue (list.isResultsCount (skilledUp7.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp7.getTerms ());
        verifyCourses (list.getCourses (), skilledUp7.getCourses ());

        // Test: set filter at Course Type - Miscellaneous
        assertTrue (list.setFilter (Miscellaneous));
        assertTrue (list.isFilterSet (Miscellaneous));
        assertTrue (list.isResultsCount (skilledUp8.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp8.getTerms ());
        verifyCourses (list.getCourses (), skilledUp8.getCourses ());

        // Test: check selected filter persistence when same Skill is build again
        assertTrue (list.closeFilterResults ());
        assertTrue (skills.isSkillBuilderPresent ());
        testSkill = getSkill (goal, "Civil Engineering");
        assertTrue (skills.clickImproveThisSkill (testSkill));

        assertTrue (list.isFilterSet (Miscellaneous));
        assertTrue (list.isFilterSet (allPrices));
        skilledUp8 = getCourses (testSkill, Miscellaneous, allPrices);

        // Test: should maintain persistency of selected filters on revisit - ANGCGS-502
        assertTrue (list.isResultsCount (skilledUp8.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp8.getTerms ());
        verifyCourses (list.getCourses (), skilledUp8.getCourses ());
    }

    public void filterByPrice () {
        SkillListContainer skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());
        assertEquals (skills.getSelectedGoal (), goal.getName ());

        RSkill testSkill = getSkill (goal, "Organizational Skills");
        assertTrue (skills.clickImproveThisSkill (testSkill));

        SkilledUp skilledUp1 = getCourses (testSkill, allTypes, free);
        SkilledUp skilledUp2 = getCourses (testSkill, allTypes, allPrices);
        SkilledUp skilledUp3 = getCourses (testSkill, allTypes, lessThanFifty);
        SkilledUp skilledUp4 = getCourses (testSkill, allTypes, fiftyToHun);
        SkilledUp skilledUp5 = getCourses (testSkill, allTypes, hunToTwoFifty);
        SkilledUp skilledUp6 = getCourses (testSkill, allTypes, twoFiftyToFiveHun);
        SkilledUp skilledUp7 = getCourses (testSkill, allTypes, fiveHunToFiveThou);
        SkilledUp skilledUp8 = getCourses (testSkill, allTypes, fiveThouToTenThou);
        SkilledUp skilledUp9 = getCourses (testSkill, allTypes, tenThouToTwentyThou);
        SkilledUp skilledUp10 = getCourses (testSkill, allTypes, unpriced);

        // Test: verify default is at Price - Free
        CourseList list = new CourseList ();
        assertTrue (list.clickFilterResults ());
        assertTrue (list.isFilterSet (free));
        assertTrue (list.isResultsCount (skilledUp1.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp1.getRanges ());
        verifyCourses (list.getCourses (), skilledUp1.getCourses ());

        // Test: set filter at Price - All Prices
        assertTrue (list.setFilter (allPrices));
        assertTrue (list.isFilterSet (allPrices));
        assertTrue (list.isResultsCount (skilledUp2.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp2.getRanges ());
        verifyCourses (list.getCourses (), skilledUp2.getCourses ());

        // Test: set filter at Price - Less than $50
        assertTrue (list.setFilter (lessThanFifty));
        assertTrue (list.isFilterSet (lessThanFifty));
        assertTrue (list.isResultsCount (skilledUp3.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp3.getRanges ());
        verifyCourses (list.getCourses (), skilledUp3.getCourses ());

        // Test: set filter at Price - $50 - $100
        assertTrue (list.setFilter (fiftyToHun));
        assertTrue (list.isFilterSet (fiftyToHun));
        assertTrue (list.isResultsCount (skilledUp4.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp4.getRanges ());
        verifyCourses (list.getCourses (), skilledUp4.getCourses ());

        // Test: set filter at Price - $100 - $250
        assertTrue (list.setFilter (hunToTwoFifty));
        assertTrue (list.isFilterSet (hunToTwoFifty));
        assertTrue (list.isResultsCount (skilledUp5.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp5.getRanges ());
        verifyCourses (list.getCourses (), skilledUp5.getCourses ());

        // Test: set filter at Price - $250 - $500
        assertTrue (list.setFilter (twoFiftyToFiveHun));
        assertTrue (list.isFilterSet (twoFiftyToFiveHun));
        assertTrue (list.isResultsCount (skilledUp6.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp6.getRanges ());
        verifyCourses (list.getCourses (), skilledUp6.getCourses ());

        // Test: set filter at Price - $500 - $5,000
        assertTrue (list.setFilter (fiveHunToFiveThou));
        assertTrue (list.isFilterSet (fiveHunToFiveThou));
        assertTrue (list.isResultsCount (skilledUp7.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp7.getRanges ());
        verifyCourses (list.getCourses (), skilledUp7.getCourses ());

        // Test: set filter at Price - $5,000 - $10,000
        assertTrue (list.setFilter (fiveThouToTenThou));
        assertTrue (list.isFilterSet (fiveThouToTenThou));
        assertTrue (list.isResultsCount (skilledUp8.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp8.getRanges ());
        verifyCourses (list.getCourses (), skilledUp8.getCourses ());

        // Test: set filter at Price - $10,000 - $20,000
        assertTrue (list.setFilter (tenThouToTwentyThou));
        assertTrue (list.isFilterSet (tenThouToTwentyThou));
        assertTrue (list.isResultsCount (skilledUp9.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp9.getRanges ());
        verifyCourses (list.getCourses (), skilledUp9.getCourses ());

        // Test: set filter at No Price Found
        assertTrue (list.setFilter (unpriced));
        assertTrue (list.isFilterSet (unpriced));
        assertTrue (list.isResultsCount (skilledUp10.getTotalNumberOfResults ()));
        verifyPriceCount (list.getPriceCount (), skilledUp10.getRanges ());
        verifyCourses (list.getCourses (), skilledUp10.getCourses ());

        // Test: should maintain persistency of selected filters on revisit - ANGCGS-502
        assertTrue (list.isResultsCount (skilledUp10.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp10.getTerms ());
        verifyCourses (list.getCourses (), skilledUp10.getCourses ());
    }

    public void tryingTakeCourse () {
        goal = setMyGoals ("29-1122.00"); // Occupational Therapist
        SkillListContainer skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());
        assertEquals (skills.getSelectedGoal (), goal.getName ());

        // Test: build Occupational Therapy skill
        RSkill testSkill = getSkill (goal, "Orthotics");
        assertTrue (skills.toggleListWindow (testSkill));
        assertTrue (skills.clickImproveThisSkill (testSkill));

        // Test: we don't have any courses available
        CourseList list = new CourseList ();
        assertTrue (list.getCountHeader ().contains ("0 courses for " + testSkill.getSkill ().getDisplayName ()));
        assertTrue (list.closeFilterResults ());

        // Test: click Back to previous page and select Treatment Planning
        testSkill = getSkill (goal, "Treatment Planning");
        assertTrue (skills.clickSkillName (testSkill));
        assertTrue (skills.clickImproveThisSkill (testSkill));

        Course testCourse = list.getCourse (1);
        assertTrue (list.clickTakeCourse (testCourse));
        deleteMyGoals ();
    }

    public void courseResultsPagination () {
        SkillListContainer skills = main.gotoSkillBuilder ();
        assertTrue (skills.isSkillBuilderPresent ());
        assertTrue (skills.checkLoadingIcon ());
        assertEquals (skills.getSelectedGoal (), goal.getName ());

        RSkill testSkill = getSkill (goal, "Civil Engineering");
        assertTrue (skills.clickImproveThisSkill (testSkill));

        // Test: verify default is at Course Type - All Types
        CourseList list = new CourseList ();
        assertTrue (list.clickFilterResults ());
        assertTrue (list.isFilterSet (allTypes));

        int page = 1;
        int currPage = list.getPageNumber ();
        assertEquals (currPage, page);
        assertFalse (list.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (list.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        SkilledUp skilledUp = getCourses (testSkill, allTypes, free);
        assertTrue (list.isResultsCount (skilledUp.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp.getTerms ());
        verifyCourses (list.getCourses (), skilledUp.getCourses ());

        // Test: click Next page and verify the status of pager buttons
        page = 2;
        assertTrue (list.clickNextPage ());
        assertEquals (list.getPageNumber (), page, "Not on second page of results after navigating there");
        assertTrue (list.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertTrue (list.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        skilledUp = getCourses (testSkill, allTypes, free, page - 1);
        assertTrue (list.isResultsCount (skilledUp.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp.getTerms ());
        verifyCourses (list.getCourses (), skilledUp.getCourses ());

        // Test: click page no. 3
        page = 3;
        assertTrue (list.clickPage (page));
        assertEquals (list.getPageNumber (), page, "Not on third page of results after navigating there");
        assertTrue (list.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertTrue (list.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        skilledUp = getCourses (testSkill, allTypes, free, page - 1);
        assertTrue (list.isResultsCount (skilledUp.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp.getTerms ());
        verifyCourses (list.getCourses (), skilledUp.getCourses ());

        // Test: click previous page and verify the status of pager buttons
        page = 2;
        assertTrue (list.clickPreviousPage ());
        assertEquals (list.getPageNumber (), page, "Not on previous page of results after navigating there");
        assertTrue (list.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (list.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        skilledUp = getCourses (testSkill, allTypes, free, page - 1);
        assertTrue (list.isResultsCount (skilledUp.getTotalNumberOfResults ()));
        verifyCourseTypeCount (list.getCourseTypeCount (), skilledUp.getTerms ());
        verifyCourses (list.getCourses (), skilledUp.getCourses ());
    }
}
