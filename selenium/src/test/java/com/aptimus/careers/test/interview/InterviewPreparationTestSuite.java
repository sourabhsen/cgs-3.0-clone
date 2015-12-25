package com.aptimus.careers.test.interview;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.interview.Question;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.interview.Questions;

@Test (groups = { "Interview" })
public class InterviewPreparationTestSuite extends InterviewTestBase {

    private final String result = "results that contain the term '%s'";

    public void verifyQuestions () {
        Questions interview = new MainCareer ().gotoInterviewPreparation ();

        // Test: check All modules present and verify header
        assertTrue (interview.areAllModulesPresent ());
        assertEquals (interview.getHeading (), "Interview Prep");

        // Test: check coach's tip is hidden initially
        assertFalse (interview.isTranscriptHidden ());
        assertTrue (interview.clickCoachTip ());

        // Test: go to question no. 6, verify coach's tip is expanded
        Question testVideo = interview.goToQuestion (6), testQ;
        assertEquals (testVideo.getNumber (), 6);
        assertEquals (testVideo.getTitle (), "What most interests you about working for this company?");
        assertTrue (interview.isTranscriptHidden ());

        // Test: compare video against focused Most Common Interview Qs
        testQ = interview.getSelectedQuestion ();
        assertEquals (testVideo.getNumber (), testQ.getNumber ());
        assertEquals (testVideo.getTitle (), testQ.getTitle ());

        // Test: go to question no. 14
        testVideo = interview.goToQuestion (14);
        assertEquals (testVideo.getNumber (), 14);
        assertEquals (testVideo.getTitle (), "Nobody is perfect. What would you consider your weakness?");
        assertTrue (interview.isTranscriptHidden ());
        assertTrue (interview.clickCoachTip ());
        assertNotNull (interview.getCoachTip ());

        // Test: compare video against focused Most Common Interview Qs
        testQ = interview.getSelectedQuestion ();
        assertEquals (testVideo.getNumber (), testQ.getNumber ());
        assertEquals (testVideo.getTitle (), testQ.getTitle ());

        // Test: go to question no. 10
        testVideo = interview.goToQuestion (10);
        assertEquals (testVideo.getNumber (), 10);
        assertEquals (testVideo.getTitle (), "What skill would you most like to improve in the short term?");
        assertFalse (interview.isTranscriptHidden ());
        assertTrue (interview.clickCoachTip ());

        // Test: compare video against focused Most Common Interview Qs
        testQ = interview.getSelectedQuestion ();
        assertEquals (testVideo.getNumber (), testQ.getNumber ());
        assertEquals (testVideo.getTitle (), testQ.getTitle ());
    }

    public void searchQuestions () {
        Questions interview = new MainCareer ().gotoInterviewPreparation ();
        assertTrue (interview.isInterviewPresent ());
        Question testQ = interview.goToQuestion (1);
        assertEquals (interview.getSelectedQuestion ().getTitle (), testQ.getTitle ());

        // Test: search other question
        String keywords = "Development";
        assertTrue (interview.searchQuestion (keywords));
        assertTrue (interview.isSearchResultPresent ());
        assertTrue (interview.isSearchResultsHeaderContains (String.format (result, keywords)));
        assertTrue (interview.clickSearchResultQuestion (2));
        assertTrue (interview.isVideosPresent (2));

        // Test: search for an invalid keyword
        keywords = "invalid terms";
        assertTrue (interview.searchQuestion (keywords));
        assertTrue (interview.isSearchResultsHeaderContains ("We have found 0 " + String.format (result, keywords)));

        // Test: click "Back to Search Results". Search another keyword
        keywords = "Research";
        assertTrue (interview.searchQuestion (keywords));
        assertTrue (interview.isSearchResultsHeaderContains (String.format (result, keywords)));
        assertTrue (interview.clickSearchResultQuestion (10));
        assertTrue (interview.isVideosPresent (10));

        // Test: click "< Back to Preparing for Interview" and verify is on Question 1
        assertTrue (interview.clickBackToPreparingForInterview ());
        assertEquals (interview.getSelectedQuestion ().getTitle (), testQ.getTitle ());
    }

    public void verifyPagination () {
        String keywords = "computer";
        Questions interview = new MainCareer ().gotoInterviewPreparation ();

        // Test: search question
        assertTrue (interview.searchQuestion (keywords));
        assertTrue (interview.isSearchResultsHeaderContains (String.format (result, keywords)));
        assertTrue (interview.isPagerPresent ());

        int page = 1;
        int currPage = interview.getPageNumber ();
        assertEquals (currPage, page);
        assertFalse (interview.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertFalse (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");

        // Test: click Next page and verify the status of pager buttons
        page = 2;
        assertTrue (interview.clickNextPage ());
        assertEquals (interview.getPageNumber (), page, "Not on second page of results after navigating there");
        assertTrue (interview.isFirstPageButtonEnabled (), "Pager's first page button should be enabled");
        assertTrue (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");

        // Test: click page no. 3
        page = 3;
        assertTrue (interview.clickPage (page));
        assertEquals (interview.getPageNumber (), page, "Not on third page of results after navigating there");
        assertTrue (interview.isFirstPageButtonEnabled (), "Pager's first page button should be enabled");
        assertTrue (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");

        // Test: click previous page and verify the status of pager buttons
        page = 2;
        assertTrue (interview.clickPreviousPage ());
        assertEquals (interview.getPageNumber (), page, "Not on previous page of results after navigating there");
        assertTrue (interview.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertTrue (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");

        // Test: click first page and verify the status of pager buttons
        page = 1;
        assertTrue (interview.clickFirstPage ());
        assertEquals (interview.getPageNumber (), page, "Not on first page of results after searching");
        assertFalse (interview.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertFalse (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");

        // Test: click last page and verify the status of pager buttons
        assertTrue (interview.clickLastPage ());
        assertTrue (interview.isFirstPageButtonEnabled (), "Pager's first page button should be enabled");
        assertTrue (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertFalse (interview.isNextPageButtonEnabled (), "Pager's next page button should be disabled");
        assertFalse (interview.isLastPageButtonEnabled (), "Pager's last page button should be disabled");

        // Test: while on last page, try another search - CAR-5012
        keywords = "skill";
        assertTrue (interview.searchQuestion (keywords));
        assertTrue (interview.isSearchResultsHeaderContains (String.format (result, keywords)));
        assertTrue (interview.isPagerPresent ());

        page = 1;
        assertEquals (interview.getPageNumber (), page);
        assertFalse (interview.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertFalse (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");

        // Test: go to next page and try another search - CAR-5012
        page = 2;
        assertTrue (interview.clickNextPage ());
        assertEquals (interview.getPageNumber (), page, "Not on second page of results after navigating there");
        assertTrue (interview.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertTrue (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");

        keywords = "future";
        assertTrue (interview.searchQuestion (keywords));
        assertTrue (interview.isSearchResultsHeaderContains (String.format (result, keywords)));
        assertTrue (interview.isPagerPresent ());

        page = 1;
        assertEquals (interview.getPageNumber (), page);
        assertFalse (interview.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertFalse (interview.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (interview.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (interview.isLastPageButtonEnabled (), "Pager's last page button should be enabled");
    }
}
