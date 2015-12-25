package com.aptimus.careers.test.jobs;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import java.util.List;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.dto.jobs.JobSearchRequest;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.jobs.JobSearch;
import com.aptimus.careers.ui.jobs.SearchResults;

@Test (groups = { "JobSearch" })
public class PaginationTestSuite extends JobSearchTestBase {

    // CGS-734
    @Test (enabled = false)
    public void searchResultsPagination () {
        String keywords = "social worker";
        String location = "Seattle, WA";

        JobSearchRequest jobSearchRequest = defaultRequest (keywords, location);
        List <Job> serviceJobs = getJobsFromSolr (jobSearchRequest);

        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.doSearch (keywords, location));

        int page = 1;
        SearchResults results = new SearchResults ();
        List <Job> uiJobs = results.getJobs ();
        int currPage = results.getPageNumber ();
        assertEquals (currPage, page);
        assertFalse (results.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertFalse (results.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (results.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (results.isLastPageButtonEnabled (), "Pager's last page button should be enabled");
        verifyJobsUItoServiceMatch (uiJobs, serviceJobs);

        // Test: click Next page and verify the status of pager buttons
        page = 2;
        assertTrue (results.clickNextPage ());
        jobSearchRequest.setPageNumber (page - 1);
        uiJobs = results.getJobs ();
        assertEquals (results.getPageNumber (), page, "Not on second page of results after navigating there");
        assertTrue (results.isFirstPageButtonEnabled (), "Pager's first page button should be enabled");
        assertTrue (results.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertTrue (results.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (results.isLastPageButtonEnabled (), "Pager's last page button should be enabled");
        verifyJobsUItoServiceMatch (uiJobs, getJobsFromSolr (jobSearchRequest));

        // Test: click page no. 3
        page = 3;
        assertTrue (results.clickPage (page));
        jobSearchRequest.setPageNumber (page - 1);
        uiJobs = results.getJobs ();
        assertEquals (results.getPageNumber (), page, "Not on third page of results after navigating there");
        assertTrue (results.isFirstPageButtonEnabled (), "Pager's first page button should be enabled");
        assertTrue (results.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertTrue (results.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (results.isLastPageButtonEnabled (), "Pager's last page button should be enabled");
        verifyJobsUItoServiceMatch (uiJobs, getJobsFromSolr (jobSearchRequest));

        // Test: click previous page and verify the status of pager buttons
        page = 2;
        assertTrue (results.clickPreviousPage ());
        jobSearchRequest.setPageNumber (page - 1);
        uiJobs = results.getJobs ();
        assertEquals (results.getPageNumber (), page, "Not on previous page of results after navigating there");
        assertTrue (results.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertTrue (results.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (results.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (results.isLastPageButtonEnabled (), "Pager's last page button should be enabled");
        verifyJobsUItoServiceMatch (uiJobs, getJobsFromSolr (jobSearchRequest));

        // Test: click first page and verify the status of pager buttons
        page = 1;
        assertTrue (results.clickFirstPage ());
        jobSearchRequest.setPageNumber (page - 1);
        uiJobs = results.getJobs ();
        assertEquals (results.getPageNumber (), page, "Not on first page of results after searching");
        assertFalse (results.isFirstPageButtonEnabled (), "Pager's first page button should be disabled");
        assertFalse (results.isPreviousPageButtonEnabled (), "Pager's previous page button should be disabled");
        assertTrue (results.isNextPageButtonEnabled (), "Pager's next page button should be enabled");
        assertTrue (results.isLastPageButtonEnabled (), "Pager's last page button should be enabled");
        verifyJobsUItoServiceMatch (uiJobs, getJobsFromSolr (jobSearchRequest));

        // Test: click last page and verify the status of pager buttons
        assertTrue (results.clickLastPage ());
        page = results.getPageNumber ();
        jobSearchRequest.setPageNumber (page - 1);
        uiJobs = results.getJobs ();
        assertTrue (results.isFirstPageButtonEnabled (), "Pager's first page button should be enabled");
        assertTrue (results.isPreviousPageButtonEnabled (), "Pager's previous page button should be enabled");
        assertFalse (results.isNextPageButtonEnabled (), "Pager's next page button should be disabled");
        assertFalse (results.isLastPageButtonEnabled (), "Pager's last page button should be disabled");
        verifyJobsUItoServiceMatch (uiJobs, getJobsFromSolr (jobSearchRequest));
    }

    public void viewMoreJobs () {

        // Test: save and apply a few jobs
        deleteAllSavedJobs ();
        deleteAllAppliedJobs ();
        saveJobs (defaultRequest ("Developer Manager", "Portland, OR", "20"));
        applyJobs (defaultRequest ("nurse", "San Francisco, CA", "20"));

        // Test: navigate to job search page
        JobSearch search = new MainCareer ().gotoJobSearch ();
        assertTrue (search.checkLoadingIcon ());
        assertTrue (search.isRecommendedTabSelected ());

        // Test: click View More to see more recommended jobs
        if (!CareerEnvironment.isAnonymous) {
            List <Job> jobs = getRecommJobs ();
            for (int i = 0; i < jobs.size () / 5; ++i) {
                assertTrue (search.clickViewMore ());
                search.wait (500);
            }
            verifyJobsUItoServiceMatch (search.getJobs (), jobs);
        }

        // Test: click View More under saved jobs tab
        assertTrue (search.clickSavedTab ());
        assertTrue (search.isSavedTabSelected ());
        assertTrue (search.clickViewMore ());
        assertTrue (search.isViewMoreLinkHidden ());
        verifyJobsUItoServiceMatch (search.getJobs (), getSavedJobs ());

        // Test: click View More under applied jobs tab
        assertTrue (search.clickAppliedTab ());
        assertTrue (search.isAppliedTabSelected ());
        assertTrue (search.clickViewMore ());
        assertTrue (search.isViewMoreLinkHidden ());
        verifyAppliedJobsUItoServiceMatch (search.getJobs (), getAppliedJobs ());
    }
}
