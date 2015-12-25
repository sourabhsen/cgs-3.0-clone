package com.aptimus.careers.test.jobs;

import static com.aptimus.careers.util.PageHelper.SortBy.Relevancy;
import static com.aptimus.careers.util.PageHelper.ActivityType.Job_Viewed;
import static com.aptimus.careers.util.PageHelper.Filter.AcademicProgram;
import static com.aptimus.careers.util.PageHelper.Filter.CareerArea;
import static com.aptimus.careers.util.PageHelper.Filter.Company;
import static com.aptimus.careers.util.PageHelper.Filter.EducationLevel;
import static com.aptimus.careers.util.PageHelper.Filter.ExperienceLevel;
import static com.aptimus.careers.util.PageHelper.Filter.Location;
import static com.aptimus.careers.util.PageHelper.ListType.JOB;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertNull;
import static org.testng.Assert.assertTrue;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.http.cookie.Cookie;
import com.aptimus.careers.dto.jobs.Activity;
import com.aptimus.careers.dto.jobs.Alert;
import com.aptimus.careers.dto.jobs.Alert.Attributes;
import com.aptimus.careers.dto.jobs.History;
import com.aptimus.careers.dto.jobs.History.Searches;
import com.aptimus.careers.dto.jobs.Job;
import com.aptimus.careers.dto.jobs.Job.Location;
import com.aptimus.careers.dto.jobs.JobSearchRequest;
import com.aptimus.careers.dto.jobs.JobSearchResult;
import com.aptimus.careers.dto.jobs.JobSearchResult.FacetField;
import com.aptimus.careers.dto.jobs.JobSearchResult.FacetFieldValue;
import com.aptimus.careers.dto.jobs.JobSearchResult.FacetRange;
import com.aptimus.careers.dto.jobs.JobSearchResult.FacetRangeCount;
import com.aptimus.careers.dto.jobs.JobSearchResult.Jobs;
import com.aptimus.careers.dto.jobs.JobSearchResult.Result;
import com.aptimus.careers.dto.playlist.Queue.Item;
import com.aptimus.careers.dto.playlist.Queue.ListItem;
import com.aptimus.careers.test.CareerBaseBrowser;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.CareerHttpClient;
import com.aptimus.careers.util.PageHelper.ActivityType;
import com.aptimus.careers.util.TestHelper;
import com.aptimus.test.selenium.Logging;
import com.google.gson.Gson;

public class JobSearchTestBase extends CareerBaseBrowser {

    private String tenant = CareerEnvironment.tenant;

    protected JobSearchRequest defaultRequest (String keywords, String location) {
        JobSearchRequest request = new JobSearchRequest ();
        if (keywords != "")
            request.setKeywords (keywords);
        if (location != "")
            request.setLocation (location);
        request.setProfileId (TestHelper.getUserProfileId (getCookies ()));
        request.setRadius ("25");
        request.setTuitionReimbursement (false);
        request.setPreferredPartner (false);
        request.setGetLinkedInConnections (true);
        request.setPageNumber (0);
        request.setPageSize ("10");
        request.setSortBy (Relevancy.css ());
        return request;
    }

    protected JobSearchRequest defaultRequest (String keywords, String location, String pageSize) {
        JobSearchRequest request = defaultRequest (keywords, location);
        request.setPageSize (pageSize);
        return request;
    }

    protected JobSearchRequest defaultRequestByCompany (String keywords, String location) {
        JobSearchRequest request = defaultRequest ("", location);
        request.setKeywordCompany (keywords);
        return request;
    }

    protected Activity applyJob (Job job, ActivityType type) {
        return jobActivity (job, type, null, null, null);
    }

    protected Activity viewJob (Job job, String service, String pageName, String pageDetail) {
        return jobActivity (job, Job_Viewed, service, pageName, pageDetail);
    }

    private Activity jobActivity (Job job, ActivityType type, String service, String pageName, String pageDetail) {
        Activity activity = new Activity ();
        activity.setJobId (job.getJobId ());
        activity.setUserIdentifier (TestHelper.getUserProfileId (getCookies ()));
        activity.setActivityName (type.name ());
        activity.setActivityValue ("valid");
        activity.setServiceName (service);
        activity.setPageName (pageName);
        activity.setPageNameDetail (pageDetail);
        activity.setCreateDate (new Date ());
        return activity;
    }

    protected List <Job> getJobsFromSolr (JobSearchRequest request) {
        return getJobsFromResults (TestHelper.searchSolr (request));
    }

    protected List <Job> getJobsFromResults (JobSearchResult result) {
        List <Job> jobs = new ArrayList <Job> ();
        for (Result r : result.getJobs ().getResults ()) {
            Job aJob = r.getJob ();
            String co = new String (aJob.getCompanyName ().getBytes (ISO88591), UTF8);
            String title = new String (aJob.getTitle ().getBytes (ISO88591), UTF8);
            aJob.setCompanyName (co);
            aJob.setTitle (title);
            jobs.add (aJob);
        }
        return jobs;
    }

    protected void verifyAppliedJobsUItoServiceMatch (List <Job> uiJobs, List <Job> serviceJobs) {
        assertEquals (uiJobs.size (), serviceJobs.size ());
        Map <String, Job> actual = hashJobList (uiJobs);
        Map <String, Job> expected = hashJobList (serviceJobs);
        for (String jobId : actual.keySet ()) {
            assertTrue (expected.containsKey (jobId), jobId + " is in UI but not solr");
            verifyModuleJobs (actual.get (jobId), expected.get (jobId));
        }
    }

    protected void verifyJobsUItoServiceMatch (List <Job> uiJobs, List <Job> serviceJobs) {
        assertEquals (uiJobs.size (), serviceJobs.size ());
        Map <String, Job> actual = hashJobList (uiJobs);
        Map <String, Job> expected = hashJobList (serviceJobs);
        for (String jobId : actual.keySet ()) {
            assertTrue (expected.containsKey (jobId), jobId + " is in UI but not solr");
            verifyJobs (actual.get (jobId), expected.get (jobId));
        }
    }

    private Map <String, Job> hashJobList (List <Job> jobs) {
        Map <String, Job> hashJobs = new HashMap <String, Job> ();
        for (Job job : jobs)
            hashJobs.put (job.getJobId (), job);
        return hashJobs;
    }

    protected void verifyJobs (Job actual, Job expected) {
        verifyModuleJobs (actual, expected);
        SimpleDateFormat fmt = new SimpleDateFormat ("MMM dd, yyyy");
        assertEquals (fmt.format (actual.getPostingDate ()), fmt.format (expected.getPostingDate ()));
    }

    protected void verifyModuleJobs (Job actual, Job expected) {
        assertEquals (actual.getJobId (), expected.getJobId ());
        assertEquals (actual.getTitle (), expected.getTitle ());
        assertEquals (actual.getCompanyName ().toLowerCase (), expected.getCompanyName ().toLowerCase ());
        assertEquals (actual.getLocation ().getCity ().toUpperCase (),
                      expected.getLocation ().getCity ().toUpperCase ());

        // CAR-4782, CAR-4903
        String stateUI = actual.getLocation ().getState ();
        String stateSvc = expected.getLocation ().getState ();
        if (stateUI.length () == stateSvc.length ())
            assertEquals (stateUI.toUpperCase (), stateSvc.toUpperCase ());
        else if (stateUI.length () < stateSvc.length ())
            assertEquals (TestHelper.getStateName (stateUI).toUpperCase (), stateSvc.toUpperCase ());
        else
            assertEquals (stateUI.toUpperCase (), TestHelper.getStateName (stateSvc).toUpperCase ());
    }

    protected void deleteAllAppliedJobs () {
        TestHelper.deleteAllAppliedJobs (getCookies ());
    }

    protected void applyJobs (JobSearchRequest jobSearchRequest) {
        jobSearchRequest.setSortBy ("Date");
        JobSearchResult result = TestHelper.searchSolr (jobSearchRequest);
        List <String> jobIds = new ArrayList <String> ();
        for (Result job : result.getJobs ().getResults ())
            jobIds.add (job.getJob ().getJobId ());
        applyJobs (jobIds);
    }

    protected void applyJobs (List <String> jobIds) {
        List <Cookie> cookies = getCookies ();
        for (int i = 0; i < jobIds.size (); ++i)
            TestHelper.applyJob (cookies, jobIds.get (i));
    }

    protected void deleteAllSavedJobs () {
        TestHelper.deleteAllSavedJobs (getCookies ());
    }

    protected ListItem saveJobs (JobSearchRequest jobSearchRequest) {
        jobSearchRequest.setSortBy ("Date");
        JobSearchResult result = TestHelper.searchSolr (jobSearchRequest);
        List <String> jobIds = new ArrayList <String> ();
        for (Result job : result.getJobs ().getResults ())
            jobIds.add (job.getJob ().getJobId ());
        return saveJobs (jobIds);
    }

    protected ListItem saveJobs (List <String> jobIds) {
        List <Cookie> cookies = getCookies ();
        String profile = TestHelper.getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + tenant + "/users/" + profile + "/lists";
        ListItem list;
        try {
            list = new Gson ().fromJson (CareerHttpClient.getUrl (url + "/type/" + JOB, cookies), ListItem.class);
        } catch (Exception e) {
            // getting 404 Not Found, user has no saved jobs
            Logging.info (e.getMessage ());
            list = new ListItem ();
            list.setDescription ("My Saved Jobs");
            list.setListType (JOB.name ());
            list.setName ("MyJobs");
            list.setOwnerType ("USER");
            list.setPrivacyType ("Private");
            list.setTenantName (CareerEnvironment.tenant);
            list.setUserIdentifier (profile);
        }

        for (int i = 0; i < jobIds.size (); ++i)
            list.setListItem (new Item (jobIds.get (i), "SAVED", JOB.name (), i, list.getListId ()));

        String response = CareerHttpClient.postUrl (url, new Gson ().toJson (list, ListItem.class), cookies);
        return new Gson ().fromJson (response, ListItem.class);
    }

    protected String getUserProgram () {
        return TestHelper.getMostRecentProgram (getCookies ());
    }

    protected Job getJobDetail (Job job) {
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/jobs/" + job.getJobId ();
        Job aJob = TestHelper.gsonBuilder ().fromJson (CareerHttpClient.getUrl (url), Job.class);
        String co = new String (aJob.getCompanyName ().getBytes (ISO88591), UTF8);
        String desc = new String (aJob.getDescription ().getBytes (ISO88591), UTF8);
        String title = new String (aJob.getTitle ().getBytes (ISO88591), UTF8);
        aJob.setCompanyName (co);
        aJob.setDescription (desc.replaceAll ("(<br(\\s|/)*>|<C>)", ""));
        aJob.setTitle (title);
        return aJob;
    }

    protected void verifyJobDetail (Job actual, Job expected) {
        String id = actual.getJobId ();
        Job fromApi = getJobDetail (expected);
        verifyJobs (actual, fromApi);

        if (actual.getDescription ().length () < 200)
            assertEquals (actual.getDescription (), fromApi.getDescription (), id);
        else
            assertEquals (actual.getDescription ().substring (0, 200),
                          fromApi.getDescription ().replaceAll ("\\<(.|\n)*?\\>", "").substring (0, 200), id);

        if (actual.getSalary () == null)
            assertNull (fromApi.getSalary (), id);
        else {
            assertEquals (actual.getSalary ().getMinimum (), fromApi.getSalary ().getMinimum (), id);
            assertEquals (actual.getSalary ().getMaximum (), fromApi.getSalary ().getMaximum (), id);
        }
    }

    protected void verifyRecentSearches (List <Map <String, String>> uiHistories, List <Map <String, String>> data) {
        History[] svcHistories = getSearchHistory ();
        for (int i = 0; i < data.size (); ++i) {
            assertEquals (uiHistories.get (i), data.get (i));

            Map <String, String> svcSearch =
                    new Gson ().fromJson (svcHistories[i].getSearchValue (), Searches.class).getSearches ().get (0);
            assertEquals (uiHistories.get (i), svcSearch);
        }

        // assertTrue (uiHistory.getId ().length () > 2, "make sure id exist: " + uiHistory.getId
        // ());
        // assertEquals (uiHistory.getDescription (), expected.getDescription ());
        // assertTrue (uiHistory.getLastRun ().matches ("(.*)( seconds ago| mins ago)"),
        // uiHistory.getLastRun ());
        // assertEquals (uiHistory.getSearches ().size (), 1);
        //
        // for (String key : expected.getSearch (0).keySet ()) {
        // assertEquals (uiHistory.getSearch (0).get (key), expected.getSearch (0).get (key),
        // "Values don't match for key: " + key);
        // }

    }

    private History[] getSearchHistory () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/session-service/2/" + tenant + "/jobs/history/users/";
        url += TestHelper.getUserProfileId (cookies) + "?noOfResults=3";
        return TestHelper.gsonBuilder ().fromJson (CareerHttpClient.getUrl (url, cookies), History[].class);
    }

    protected void verifyAllFacetFieldValueCount (Map <String, Integer> uiFilter, JobSearchResult solrResult) {
        Map <String, Integer> svcFilters = new HashMap <String, Integer> ();
        for (FacetField field : solrResult.getFacetFields ()) {
            if (field.getName ().equals (Location.solrFacet ()))
                for (FacetFieldValue facet : field.getValues ())
                    svcFilters.put (Location.id () + ":" + facet.getName (), facet.getCount ());
            if (field.getName ().equals (AcademicProgram.solrFacet ()))
                for (FacetFieldValue facet : field.getValues ())
                    svcFilters.put (AcademicProgram.id () + ":" + facet.getName (), facet.getCount ());
            if (field.getName ().equals (EducationLevel.solrFacet ()))
                for (FacetFieldValue facet : field.getValues ())
                    svcFilters.put (EducationLevel.id () + ":" + facet.getName (), facet.getCount ());
            if (field.getName ().equals (Company.solrFacet ()))
                for (FacetFieldValue facet : field.getValues ())
                    svcFilters.put (Company.id () + ":" + facet.getName (), facet.getCount ());
            if (field.getName ().equals (CareerArea.solrFacet ()))
                for (FacetFieldValue facet : field.getValues ())
                    svcFilters.put (CareerArea.id () + ":" + facet.getName (), facet.getCount ());
        }
        for (FacetRange field : solrResult.getFacetRanges ())
            if (field.getName ().equals (ExperienceLevel.solrFacet ()))
                for (FacetRangeCount value : field.getCounts ())
                    svcFilters.put (ExperienceLevel.id () + ":" + value.getValue (), value.getCount ());

        verifyFacetFieldValueCount (uiFilter, svcFilters);
    }

    private void verifyFacetFieldValueCount (Map <String, Integer> uiFilter, Map <String, Integer> solrFilters) {
        assertEquals (uiFilter.size (), solrFilters.size ());
        for (String facet : uiFilter.keySet ()) {
            assertNotNull (solrFilters.get (facet), facet);
            assertEquals (uiFilter.get (facet), solrFilters.get (facet), facet);
        }
    }

    protected List <Job> getJobsLikeThis (Job job) {
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + tenant + "/jobs/" + job.getJobId ();
        url += "/similarjobs?page.size=3";
        return getJobsFromResults (TestHelper.gsonBuilder ().fromJson (CareerHttpClient.getUrl (url, null),
                                                                       JobSearchResult.class));
    }

    protected void verifyJobActivity (List <Activity> expected) {
        ActivityType type = ActivityType.valueOf (expected.get (0).getActivityName ());
        String jobId = expected.get (0).getJobId ();

        Activity[] activities = TestHelper.getActivitiesByJobId (getCookies (), type, jobId);
        assertEquals (activities.length, expected.size ());
        Collections.sort (Arrays.asList (activities), new Comparator <Activity> () {

            public int compare (Activity act1, Activity act2) {
                return act1.getJobActivityId ().compareTo (act2.getJobActivityId ());
            }
        });
        for (int i = 0; i < expected.size (); ++i) {
            Logging.info ("testing jobActivityId=" + activities[i].getJobActivityId ());
            assertEquals (activities[i].getJobId (), expected.get (i).getJobId ());
            assertEquals (activities[i].getUserIdentifier (), expected.get (i).getUserIdentifier ());
            assertEquals (activities[i].getActivityName (), expected.get (i).getActivityName ());
            assertEquals (activities[i].getActivityValue (), expected.get (i).getActivityValue ());
            assertTrue (activities[i].getTenantName ().toLowerCase ().matches (tenant));
            assertEquals (activities[i].getPageName (), expected.get (i).getPageName ());
            assertEquals (activities[i].getPageNameDetail (), expected.get (i).getPageNameDetail ());
        }
    }

    protected void verifyNoJobActivity (String jobId, ActivityType type) {
        Activity[] activities = TestHelper.getActivitiesByJobId (getCookies (), type, jobId);
        assertEquals (activities.length, 0);
    }

    protected void deleteAllJobActivities (String jobId) {
        for (ActivityType type : ActivityType.values ())
            deleteJobActivities (jobId, type);
    }

    protected void deleteJobActivities (String jobId, ActivityType type) {
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + tenant + "/jobs/" + jobId + "/activity/";
        Activity[] activities = TestHelper.getActivitiesByJobId (getCookies (), type, jobId);
        if (activities != null)
            for (Activity activity : activities) {
                Logging.info ("deleting activityId: " + activity.getJobActivityId ());
                CareerHttpClient.deleteUrl (url + activity.getJobActivityId ());
            }
    }

    protected void deleteAllAlerts () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/notification-service/1/" + tenant + "/profiles/";
        url += TestHelper.getUserProfileId (cookies) + "/jobnotifications?status=Enabled&status=Paused";
        Alert[] alert = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Alert[].class);
        for (int i = 0; i < alert.length; ++i)
            deleteAlert (cookies, alert[i].getUserNotificationId ());
    }

    private void deleteAlert (List <Cookie> cookies, String userNotificationId) {
        String payload = "{\"userNotificationId\":" + userNotificationId + ",\"status\":\"Deleted\"}";
        String url = CareerEnvironment.baseUrl + "/api/notification-service/1/" + tenant + "/profiles/";
        url += TestHelper.getUserProfileId (cookies) + "/jobnotifications";
        String response = CareerHttpClient.putUrl (url, payload, cookies);
        Logging.info ("deleting notificationId: " + userNotificationId + ", response: " + response);
    }

    protected void saveAlert (String keywords, String location) {
        List <Cookie> cookies = getCookies ();
        String profile = TestHelper.getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/notification-service/1/" + tenant + "/profiles/";
        url += profile + "/jobnotifications";
        String response =
                CareerHttpClient.putUrl (url, new Gson ().toJson (alert (profile, keywords, location)), cookies);
        Logging.info (response);
    }

    private Alert alert (String profile, String keywords, String location) {
        String queryString = "{\"profileId\":\"" + profile + "\",\"location\":\"" + location + "\",";
        queryString += "\"preferredPartner\":false,\"pageNumber\":0,\"keywords\":\"" + keywords + "\"}";
        Alert alert = new Alert ();
        alert.setNotificationScheduleName ("user-job-search-notification-daily");
        alert.setUserNotificationTitle (keywords + " in " + location);
        alert.setQueryString (queryString);
        Attributes attributes = new Attributes ();
        attributes.setEmailAddressProfile (CareerEnvironment.testUser);
        attributes.setAlertUri (CareerEnvironment.baseUrl);
        alert.setAttributes (attributes);
        return alert;
    }

    protected void createAlerts () {
        saveAlert ("program manager", "Chicago, IL");
        saveAlert ("java developer", "San Francisco, CA");
        saveAlert ("nurse assistant", "Seattle, WA");
        saveAlert ("network consultant", "San Diego, CA");
        saveAlert ("database sql developer", "Portland, OR");
        saveAlert ("content writer", "Phoenix, AZ");
        saveAlert ("teacher assistant", "Sunnyvale, CA");
    }

    protected void verifyAlertsUItoServiceMatch (List <Alert> uiAlerts) {
        List <Alert> svcAlerts = getAlertsFromService ();
        assertEquals (uiAlerts.size (), svcAlerts.size ());
        for (int i = 0; i < uiAlerts.size (); ++i) {
            assertEquals (uiAlerts.get (i).getUserNotificationId (), svcAlerts.get (i).getUserNotificationId ());
            assertEquals (uiAlerts.get (i).getUserNotificationTitle (), svcAlerts.get (i).getUserNotificationTitle ());
            assertEquals (uiAlerts.get (i).getStatus (), svcAlerts.get (i).getStatus ());
        }
    }

    private List <Alert> getAlertsFromService () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/notification-service/1/" + tenant + "/profiles/";
        url += TestHelper.getUserProfileId (cookies) + "/jobnotifications?status=Enabled&status=Paused";
        return Arrays.asList (new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Alert[].class));
    }

    protected void verifyPreferredPartner (Job job) {
        if (CareerEnvironment.isUopx) {
            // assertTrue (job.isPreferredPartner ());
            // assertTrue (job.isTuitionReimbursed ());
        } else {
            assertFalse (job.isPreferredPartner ());
            assertFalse (job.isTuitionReimbursed ());
        }
    }

    protected List <Job> getRecommJobs () {
        List <Cookie> cookies = getCookies ();
        String profile = TestHelper.getUserProfileId (cookies);
        String program = TestHelper.getMostRecentProgramCode (cookies);
        Location loc = TestHelper.getUserLocation (cookies);
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + tenant + "/jobs/search/recommendedJobs?";
        url += "location=" + loc.getCity ().replace (" ", "+") + "," + loc.getState () + "&pageSize=30";
        url += "&profileId=" + profile + "&programCode=" + program + "&recommendationType=RONET&useRecommendation=true";

        return getJobsFromResults (TestHelper.gsonBuilder ().fromJson (CareerHttpClient.getUrl (url, cookies),
                                                                       JobSearchResult.class));
    }

    protected List <Job> getSavedJobs () {
        return getJobsFromResults (TestHelper.getSavedJobs (getCookies ()));
    }

    protected List <Job> getAppliedJobs () {
        Jobs appliedjobs = TestHelper.getAppliedJobs (getCookies ());
        List <Job> jobs = new ArrayList <Job> ();
        for (Result r : appliedjobs.getResults ()) {
            Job job = new Job ();
            job.setJobId (r.getJobId ());
            job.setTitle (new String (r.getJobTitle ().getBytes (ISO88591), UTF8));
            job.setCompanyName (new String (r.getCompany ().getBytes (ISO88591), UTF8));
            String[] loc = r.getLocation ().split (",");
            job.getLocation ().setCity (loc[0].trim ());
            job.getLocation ().setState (loc[1].trim ());
            jobs.add (job);
        }
        return jobs;
    }

    protected void setConfirmationMessage (boolean hideMessage) {
        TestHelper.setConfirmationMessage (getCookies (), hideMessage);
    }
}
