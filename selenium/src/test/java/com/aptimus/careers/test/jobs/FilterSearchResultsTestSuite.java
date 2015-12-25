package com.aptimus.careers.test.jobs;

import static com.aptimus.careers.util.PageHelper.Filter.AcademicProgram;
import static com.aptimus.careers.util.PageHelper.Filter.CareerArea;
import static com.aptimus.careers.util.PageHelper.Filter.Company;
import static com.aptimus.careers.util.PageHelper.Filter.EducationLevel;
import static com.aptimus.careers.util.PageHelper.Filter.ExperienceLevel;
import static com.aptimus.careers.util.PageHelper.Filter.Location;
import static com.aptimus.careers.util.PageHelper.SortBy.Date;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.dto.jobs.JobSearchRequest;
import com.aptimus.careers.dto.jobs.JobSearchResult;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.dashboard.modules.Search;
import com.aptimus.careers.ui.jobs.JobDetail;
import com.aptimus.careers.ui.jobs.SearchResults;
import com.aptimus.careers.ui.jobs.modules.RefineThisSearch;
import com.aptimus.careers.util.TestHelper;

@Test (groups = { "JobSearch" })
public class FilterSearchResultsTestSuite extends JobSearchTestBase {

    public void filterByAllAddRemove () {
        String location = "San Francisco, CA";
        JobSearchRequest searchRequest = defaultRequest ("", location);
        Search searchJobs = new Search ();
        assertTrue (searchJobs.isSearchJobsPresent ());
        assertTrue (searchJobs.doSearch ("", location));

        SearchResults uiResults = new SearchResults ();
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.areAllModulesPresent ());

        // Test: set distance to 100 miles
        String distance, company, loc, degree, career, eduLvl, expLvl;
        RefineThisSearch uiFilters = new RefineThisSearch ();
        distance = uiFilters.setDistance ("100 miles");
        searchRequest.setRadius (distance);
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: pick the 3rd Experience Level on the list
        expLvl = uiFilters.setFilter (ExperienceLevel, 1);
        searchRequest.setExperienceLevel (expLvl);
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: pick the 1st Company on the list
        company = uiFilters.setFilter (Company, 1);
        searchRequest.setCompany (company);
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: pick the 1st Location on the list
        loc = uiFilters.setFilter (Location, 1);
        searchRequest.setLocationFilter (loc);
        assertTrue (uiResults.checkLoadingIcon ());

        if (CareerEnvironment.isUopx) {
            // Test: pick the 1st Academic Program on the list (not user's program)
            degree = uiFilters.setFilter (AcademicProgram, 1);
            searchRequest.setProgram (degree);
            assertTrue (uiResults.checkLoadingIcon ());
        } else
            degree = "";

        // Test: pick the 1st Career Area on the list
        career = uiFilters.setFilter (CareerArea, 1);
        searchRequest.setIndustry (career);
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: pick the 1st Education Level on the list
        eduLvl = uiFilters.setFilter (EducationLevel, 1);
        searchRequest.setEduLevelFilter (eduLvl);
        assertTrue (uiResults.checkLoadingIcon ());

        JobSearchResult searchResult = TestHelper.searchSolr (searchRequest);
        assertEquals (uiResults.getResultsCount (), searchResult.getJobs ().getTotalNumberOfResults ());
        verifyJobsUItoServiceMatch (uiResults.getJobs (), getJobsFromResults (searchResult));

        // Test: de-select all one by one
        assertTrue (uiFilters.setFilter (EducationLevel, eduLvl));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (searchRequest.delEduLevelFilter (eduLvl));

        assertTrue (uiFilters.setFilter (CareerArea, career));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (searchRequest.delIndustry (career));

        if (CareerEnvironment.isUopx) {
            assertTrue (uiFilters.setFilter (AcademicProgram, degree));
            assertTrue (uiResults.checkLoadingIcon ());
            assertTrue (searchRequest.delProgram (degree));
        }

        assertTrue (uiFilters.setFilter (Location, loc));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (searchRequest.delLocationFilter (loc));

        assertTrue (uiFilters.setFilter (Company, company));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (searchRequest.delCompany (company));

        assertTrue (uiFilters.setFilter (ExperienceLevel, expLvl));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (searchRequest.delExperienceLevel (expLvl));

        searchResult = TestHelper.searchSolr (searchRequest);
        assertEquals (uiResults.getResultsCount (), searchResult.getJobs ().getTotalNumberOfResults ());
        verifyJobsUItoServiceMatch (uiResults.getJobs (), getJobsFromResults (searchResult));
    }

    public void checkCookiePersistence () {
        String keywords = "web java";
        String location = "San Francisco, CA";

        JobSearchRequest searchRequest = defaultRequest (keywords, location);
        Search searchJobs = new Search ();
        assertTrue (searchJobs.isSearchJobsPresent ());
        assertTrue (searchJobs.doSearch (keywords, location));

        SearchResults uiResults = new SearchResults ();
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.areAllModulesPresent ());

        // Test: verify the filters count match with solr's facets count
        JobSearchResult searchResult = TestHelper.searchSolr (searchRequest);
        RefineThisSearch uiFilters = new RefineThisSearch ();
        verifyAllFacetFieldValueCount (uiFilters.getAllFacetCounts (), searchResult);

        // Test: apply filters, the values are stored in "search-filters" cookie
        searchRequest.setRadius (uiFilters.setDistance ("100 miles"));
        assertTrue (uiResults.checkLoadingIcon ());
        searchRequest.setExperienceLevel (uiFilters.setFilter (ExperienceLevel, 1));
        assertTrue (uiResults.checkLoadingIcon ());
        searchRequest.setEduLevelFilter (uiFilters.setFilter (EducationLevel, 1));
        assertTrue (uiResults.checkLoadingIcon ());
        searchRequest.setEduLevelFilter (uiFilters.setFilter (EducationLevel, 2));
        assertTrue (uiResults.checkLoadingIcon ());

        if (CareerEnvironment.isUopx) {
            searchRequest.setProgram (uiFilters.setFilter (AcademicProgram, 2));
            assertTrue (uiResults.checkLoadingIcon ());
            searchRequest.setProgram (uiFilters.setFilter (AcademicProgram, 4));
            assertTrue (uiResults.checkLoadingIcon ());
        }

        searchRequest.setLocationFilter (uiFilters.setFilter (Location, 1));
        assertTrue (uiResults.checkLoadingIcon ());
        searchRequest.setLocationFilter (uiFilters.setFilter (Location, 2));
        assertTrue (uiResults.checkLoadingIcon ());
        searchRequest.setCompany (uiFilters.setFilter (Company, 1));
        assertTrue (uiResults.checkLoadingIcon ());
        searchRequest.setIndustry (uiFilters.setFilter (CareerArea, 1));
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.setSortBy (Date));
        searchRequest.setSortBy (Date.name ());
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: verify what's displayed in UI matches with service (solr)
        int resultsCount = uiResults.getResultsCount ();
        searchResult = TestHelper.searchSolr (searchRequest);
        assertEquals (resultsCount, searchResult.getJobs ().getTotalNumberOfResults ());
        verifyJobsUItoServiceMatch (uiResults.getJobs (), getJobsFromResults (searchResult));
        verifyAllFacetFieldValueCount (uiFilters.getAllFacetCounts (), searchResult);

        // Test: go to job detail page and go back
        assertTrue (uiResults.clickJobTitle (uiResults.getJob (1)));
        JobDetail detail = new JobDetail ();
        assertTrue (detail.isJobDetailPresent ());
        assertTrue (detail.clickBackToPreviousPage ());

        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.isSearchResultsPresent ());
        assertEquals (uiResults.getResultsCount (), resultsCount);
        verifyJobsUItoServiceMatch (uiResults.getJobs (), getJobsFromResults (searchResult));
    }

    public void filterByDistance () {
        String keywords = "Amazon";
        String location = "98101";

        // Test: search jobs without specifying location
        Search searchJobs = new Search ();
        assertTrue (searchJobs.isSearchJobsPresent ());
        assertTrue (searchJobs.doSearch (keywords, ""));

        SearchResults uiResults = new SearchResults ();
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.isSearchResultsPresent ());
        assertTrue (uiResults.isSearchResultsHeaderContains ("results for " + keywords));

        // Test: distance filter is hidden
        RefineThisSearch uiFilters = new RefineThisSearch ();
        assertTrue (uiFilters.isRefineSearchPresent ());
        assertTrue (uiFilters.isDistanceFilterHidden ());
        uiFilters.setFilter (Location, 2);
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiFilters.isDistanceFilterHidden ());
        assertTrue (uiFilters.clickClear ());
        assertTrue (uiResults.checkLoadingIcon ());

        // Test: search jobs with location
        assertTrue (uiResults.enterLocation (location));
        assertTrue (uiResults.clickFindJobs ());
        assertTrue (uiResults.checkLoadingIcon ());
        assertTrue (uiResults.isSearchResultsPresent ());
        assertTrue (uiResults.isSearchResultsHeaderContains ("results for " + keywords + " In " + location));

        // Test: distance filter is present
        assertFalse (uiFilters.isDistanceFilterHidden ());
        uiFilters.setFilter (Location, 1);
        assertTrue (uiResults.checkLoadingIcon ());
        assertFalse (uiFilters.isDistanceFilterHidden ());
    }
}
