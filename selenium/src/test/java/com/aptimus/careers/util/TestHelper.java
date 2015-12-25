package com.aptimus.careers.util;

import static com.aptimus.careers.util.PageHelper.ActivityType.applied;
import static com.aptimus.careers.util.PageHelper.Filter.Company;
import static com.aptimus.careers.util.PageHelper.ListType.RONET;
import static com.aptimus.test.selenium.HttpClientHelper.Auth.ASID;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.cookie.BasicClientCookie;
import com.aptimus.careers.dto.StudentProgram;
import com.aptimus.careers.dto.StudentProgram.AcademicProgram;
import com.aptimus.careers.dto.StudentProgram.StudentProgramMilestones;
import com.aptimus.careers.dto.UserProfile.User;
import com.aptimus.careers.dto.jobs.Activity;
import com.aptimus.careers.dto.jobs.Connection;
import com.aptimus.careers.dto.jobs.Job.Location;
import com.aptimus.careers.dto.jobs.JobSearchRequest;
import com.aptimus.careers.dto.jobs.JobSearchResult;
import com.aptimus.careers.dto.jobs.JobSearchResult.FacetField;
import com.aptimus.careers.dto.jobs.JobSearchResult.FacetFieldValue;
import com.aptimus.careers.dto.jobs.JobSearchResult.Jobs;
import com.aptimus.careers.dto.jobs.JobSearchResult.Result;
import com.aptimus.careers.dto.jobs.StateList;
import com.aptimus.careers.dto.playlist.Queue;
import com.aptimus.careers.dto.playlist.Queue.Item;
import com.aptimus.careers.dto.playlist.Queue.ListItem;
import com.aptimus.careers.dto.resume.Resumes;
import com.aptimus.careers.dto.resume.Resumes.Resume;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.dto.survey.Answers;
import com.aptimus.careers.dto.survey.Answers.Answer;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.PageHelper.ActivityType;
import com.aptimus.test.selenium.HttpClientHelper.Auth;
import com.aptimus.test.selenium.Logging;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class TestHelper {

    public final static String dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";

    /**
     * Create a string of <size> chars
     * 
     * @param size
     *            The number of characters in a string
     * @return The string of <size> chars
     */
    public synchronized static String dummyString (int size) {
        char[] chars = {
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        };
        return getRandomStringFromCharArray (size, chars);
    }

    private synchronized static String getRandomStringFromCharArray (int size, char[] chars) {
        return RandomStringUtils.random (size, chars);
    }

    public synchronized static Gson gsonBuilder () {
        return new GsonBuilder ().setDateFormat (dateFormat).create ();
    }

    private synchronized static org.openqa.selenium.Cookie setAuthCookie (Cookie cookie) {
        if (cookie == null) {
            Logging.error ("getting a null cookie");
            return null;
        } else {
            Logging.info ("name: " + cookie.getName ());
            Logging.info ("value: " + cookie.getValue ());
            Logging.info ("domain: " + cookie.getDomain ());
            Logging.info ("path: " + cookie.getPath ());
            Logging.info ("expire: " + cookie.getExpiryDate ());
            Logging.info ("secure: " + cookie.isSecure ());
            Logging.info ("httpOnly: " + cookie.isPersistent ());

            Calendar expire = Calendar.getInstance ();
            expire.set (Calendar.YEAR, Calendar.getInstance ().get (Calendar.YEAR) + 2);

            // this is for Safari, domain=null and IE, secure=false
            org.openqa.selenium.Cookie sso = new org.openqa.selenium.Cookie (cookie.getName (),
                                                                             cookie.getValue (),
                                                                             CareerEnvironment.domain,
                                                                             "/",
                                                                             expire.getTime (),
                                                                             false,
                                                                             false);
            return sso;
        }
    }

    public synchronized static List <org.openqa.selenium.Cookie> setAuthCookies (List <Cookie> cookies) {
        List <org.openqa.selenium.Cookie> sso = new ArrayList <org.openqa.selenium.Cookie> ();
        if (cookies.size () == 0) {
            Logging.error ("getting no cookies");
        } else {
            for (Cookie cookie : cookies)
                sso.add (setAuthCookie (cookie));

        }
        return sso;
    }

    public synchronized static String getUserProfileId (List <Cookie> cookies) {
        String url = CareerEnvironment.baseUrl + "/api/authentication-service/2/" + CareerEnvironment.tenant + "/user/info";
        Map <?, ?> p = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Map.class);
        return (String) p.get ("profileId");
    }

    public synchronized static User getUserProfile (List <Cookie> cookies) {
        String profile = CareerEnvironment.baseUrl + "/api/profile-service/1/" + CareerEnvironment.tenant + "/profiles/";
        profile += getUserProfileId (cookies) + "?includeStudentPrograms=true";
        return new Gson ().fromJson (CareerHttpClient.getUrl (profile, cookies), User.class);
    }

    public synchronized static String getStateAreaId (List <Cookie> cookies) {
        return getStateAreaId (getUserLocation (cookies));
    }

    public synchronized static String getStateAreaId (Location loc) {
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + CareerEnvironment.tenant + "/state/";
        url += loc.getState ();
        StateList states = new Gson ().fromJson (CareerHttpClient.getUrl (url), StateList.class);
        return states.getStateAreaId (loc.getCity ()).getStateAreaCode ().replace ("explorer/stateareas/", "");
    }

    public synchronized static String getStateName (String code) {
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + CareerEnvironment.tenant + "/state";
        StateList states = new Gson ().fromJson (CareerHttpClient.getUrl (url), StateList.class);
        return states.getStateByCode (code).getStateName ();
    }

    public synchronized static Location getUserLocation (List <Cookie> cookies) {
        if (CareerEnvironment.isProd)
            return new Location ("San Francisco", "CA");
        String url = CareerEnvironment.baseUrl + "/api/validation-service/1/" + CareerEnvironment.tenant + "/address/ipaddr";
        return new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Location.class);
    }

    public synchronized static String getMostRecentProgramCode (List <Cookie> cookies) {
        AcademicProgram ap = getMostRecent (cookies);
        return ap == null ? "" : ap.getAcademicProgramCode ();
    }

    public synchronized static String getMostRecentProgram (List <Cookie> cookies) {
        AcademicProgram ap = getMostRecent (cookies);
        return ap == null ? "" : ap.getName ();
    }

    // if there's no degree program, we return null
    // if there's only one degree program, we return it
    // if there're more than one degree programs, we return the most recent ActivityStartDate
    // milestone
    private synchronized static AcademicProgram getMostRecent (List <Cookie> cookies) {
        int index = 0;
        SimpleDateFormat format = new SimpleDateFormat ("yyyy-MM-dd");
        Date activityStartDate, currActivityStartDate = null;

        StudentProgram program = getUserProfile (cookies).getStudentPrograms ();
        if (program == null)
            return null;
        else {
            List <com.aptimus.careers.dto.StudentProgram.Item> items = program.getItems ();
            switch (items.size ()) {
            case 0:
                return null;
            case 1:
                return program.getItem (index).getAcademicProgramOffering ().getAcademicProgram ();
            default:
                try {
                    activityStartDate = format.parse ("1900-01-01");
                    for (com.aptimus.careers.dto.StudentProgram.Item item : items) {
                        currActivityStartDate = activityStartDate;

                        List <StudentProgramMilestones> studentProgramMilestones = item.getStudentProgramMilestones ();
                        if (studentProgramMilestones.size () == 1)
                            currActivityStartDate = format.parse (studentProgramMilestones.get (0).getMilestoneDate ());

                        else if (studentProgramMilestones.size () > 1)
                            for (StudentProgramMilestones milestone : studentProgramMilestones)
                                if (milestone.getMilestoneType ().equals ("ActivityStartDate"))
                                    currActivityStartDate = format.parse (milestone.getMilestoneDate ());

                        if (currActivityStartDate.after (activityStartDate))
                            index = items.indexOf (item);

                        activityStartDate = currActivityStartDate;
                    }
                } catch (ParseException e) {
                    Logging.info ("Date not parsed");
                }
                // should return specific most recent based on milestone
                return program.getItem (index).getAcademicProgramOffering ().getAcademicProgram ();
            }
        }
    }

    public synchronized static JobSearchResult searchSolr (JobSearchRequest request) {
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/jobs/search";
        String body = new Gson ().toJson (request)
                .replace ("keywordsCompany", "keywords.company")
                .replace ("keywordsTitle", "keywords.title");

        String json = CareerHttpClient.postUrl (url, body);
        return gsonBuilder ().fromJson (json, JobSearchResult.class);
    }

    public synchronized static List <FacetFieldValue> getCompanyFields (JobSearchRequest request) {
        JobSearchResult solrResult = searchSolr (request);
        List <FacetFieldValue> fields = new ArrayList <FacetFieldValue> ();
        for (FacetField field : solrResult.getFacetFields ())
            if (field.getName ().equals (Company.name ()))
                for (FacetFieldValue value : field.getValues ())
                    fields.add (new FacetFieldValue (value.getName (), value.getCount ()));

        return fields;
    }

    public synchronized static void deleteAllSavedJobs (List <Cookie> cookies) {
        String profileId = getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + CareerEnvironment.tenant + "/users/" + profileId + "/lists/";
        JobSearchResult result = getSavedJobs (cookies);
        if (result != null)
            if (!result.getJobs ().getResults ().isEmpty ())
                for (Result job : result.getJobs ().getResults ())
                    CareerHttpClient.deleteUrl (url + job.getListId () + "/items/" + job.getListItemId (), cookies);

        Logging.info ("resetting Saved Jobs for user: " + profileId);
    }

    public synchronized static JobSearchResult getSavedJobs (List <Cookie> cookies) {
        String profileId = getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/users/" + profileId + "/jobs/lists?page.size=50";
        try {
            return TestHelper.gsonBuilder ().fromJson (CareerHttpClient.getUrl (url, cookies), JobSearchResult.class);
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }
        return null;
    }

    public synchronized static void deleteAllAppliedJobs (List <Cookie> cookies) {
        String profile = getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/users/";
        url += profile + "/jobs/applications";
        for (Result job : getAppliedJobs (cookies).getResults ()) {
            if (job.isAtsTracked ()) {
                Connection userConnection = null;
                try {
                    String connection = url + "/companies/" + job.getCompanyId () + "/connections";
                    userConnection = new Gson ().fromJson (CareerHttpClient.getUrl (connection, cookies),
                                                           Connection.class);
                } catch (Exception e) {
                    // Expecting 404 Not Found
                    Logging.info (e.getMessage ());
                }
                if (userConnection != null)
                    CareerHttpClient.deleteUrl (url + "/connections/" + userConnection.getUserConnectionId (), cookies);
            }

            try {
                if (job.getJobId () != null) {
                    Activity[] activities = getActivitiesByJobId (cookies, applied, job.getJobId ());
                    if (activities != null) {
                        for (Activity activity : activities) {
                            String delete = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/jobs/";
                            delete += job.getJobId () + "/activity/" + activity.getJobActivityId ();
                            Logging.info ("deleting activityId: " + activity.getJobActivityId ());
                            CareerHttpClient.deleteUrl (delete, cookies);
                        }

                        Logging.info ("deleting jobApplicationId: " + job.getId ());
                        CareerHttpClient.deleteUrl (url + "/" + job.getId (), cookies);
                    } else {
                        Logging.error ("activityId not found");
                    }
                } else {
                    // External jobs
                    Logging.info ("deleting external jobApplicationId: " + job.getId ());
                    CareerHttpClient.deleteUrl (url + "/" + job.getId (), cookies);
                }
            } catch (Exception e) {
                // For some reason applied job doesn't have activity records
                Logging.info (e.getMessage ());
            }
        }

        if (getAppliedJobs (cookies).getResults ().size () > 0)
            Logging.error ("this user still has applied jobs");
    }

    public synchronized static Jobs getAppliedJobs (List <Cookie> cookies) {
        String profile = getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/users/";
        url += profile + "/jobs/applications?page.size=50";
        return new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Jobs.class);
    }

    public synchronized static Activity[] getActivitiesByJobId (List <Cookie> cookies, ActivityType type, String jobId) {
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/users/";
        url += getUserProfileId (cookies) + "/jobs/" + jobId + "/activity/" + type;
        return gsonBuilder ().fromJson (CareerHttpClient.getUrl (url, cookies), Activity[].class);
    }

    public synchronized static void deleteMyGoals (List <Cookie> cookies) {
        String profileId = getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + CareerEnvironment.tenant + "/users/" + profileId + "/lists";
        ListItem list = getMyGoals (cookies);
        if (list != null) {
            list.setListItems (new ArrayList <Item> ());
            String response = CareerHttpClient.postUrl (url, new Gson ().toJson (list), cookies);
            Logging.info ("resetting My Goals for user: " + profileId + ", status: " + response);
        }
    }

    public synchronized static ListItem getMyGoals (List <Cookie> cookies) {
        String profileId = getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + CareerEnvironment.tenant + "/users/" + profileId + "/lists";
        try {
            Queue queue = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Queue.class);
            for (ListItem listItem : queue.getList ()) {
                if (listItem.getListType ().equals (RONET.name ()))
                    return listItem;
            }
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }
        return buildGoalList (profileId);
    }

    public synchronized static ListItem setMyGoals (List <Cookie> cookies, String rOnets) {
        return setMyGoals (cookies, Arrays.asList (new String[] { rOnets }));
    }

    public synchronized static ListItem setMyGoals (List <Cookie> cookies, List <String> rOnets) {
        ListItem list = getMyGoals (cookies);
        String profile = getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + CareerEnvironment.tenant + "/users/" + profile + "/lists";
        if (list != null) {
            for (int i = 0; i < rOnets.size (); ++i)
                list.setListItem (new Item (rOnets.get (i), "SAVED", RONET.name (), i, list.getListId ()));

            String response = CareerHttpClient.postUrl (url, new Gson ().toJson (list, ListItem.class), cookies);
            list = new Gson ().fromJson (response, ListItem.class);
        }
        return list;
    }

    private synchronized static ListItem buildGoalList (String profileId) {
        ListItem list = new ListItem ();
        list.setDescription ("My goal list");
        list.setListType (RONET.name ());
        list.setName ("MyGoals");
        list.setOwnerType ("USER");
        list.setPrivacyType ("Private");
        list.setTenantName (CareerEnvironment.tenant);
        list.setUserIdentifier (profileId);
        return list;
    }

    public synchronized static void deleteAllSavedResumes (List <Cookie> cookies) {
        try {
            Resumes list = getSavedResumes (cookies);
            if (list != null && list.getItems ().size () > 0)
                for (Resume resume : list.getItems ())
                    deleteResume (cookies, resume.getId ());

            list = getSavedResumes (cookies);
            if (list != null && list.getItems ().size () > 0) {
                for (Resume resume : list.getItems ()) {
                    Logging.error ("failed to delete resumeId: " + resume.getId ());
                    deleteResume (cookies, resume.getId ());
                }
            }
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }
    }

    private synchronized static void deleteResume (List <Cookie> cookies, String resumeId) {
        String url = CareerEnvironment.baseUrl + "/api/resume-service/1/" + CareerEnvironment.tenant + "/users/";
        url += getUserProfileId (cookies) + "/document/" + resumeId + "/metadata";
        String response = CareerHttpClient.putUrl (url, "{\"primaryInd\":\"N\",\"status\":\"DELETED\"}", cookies);
        Logging.info ("deleting resumeId: " + resumeId + ", response: " + response);
    }

    private synchronized static Resumes getSavedResumes (List <Cookie> cookies) {
        String url = CareerEnvironment.baseUrl + "/api/resume-service/1/" + CareerEnvironment.tenant + "/users/";
        url += getUserProfileId (cookies) + "/document?type=RESUME&status=COMPLETE";
        try {
            return new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Resumes.class);
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return null;
        }
    }

    public synchronized static List <UserResume> createResumes (List <Cookie> cookies, List <UserResume> resumes) {
        String url = CareerEnvironment.baseUrl + "/api/resume-service/1/" + CareerEnvironment.tenant + "/users/";
        url += getUserProfileId (cookies) + "/resume";
        List <UserResume> results = new ArrayList <UserResume> ();
        for (UserResume resume : resumes) {
            String response = CareerHttpClient.postUrl (url, TestHelper.gsonBuilder ().toJson (resume), cookies);
            Logging.info (response);
            results.add (TestHelper.gsonBuilder ().fromJson (response, UserResume.class));
        }
        return results;
    }

    public synchronized static void setConfirmationMessage (List <Cookie> cookies, boolean hideMessage) {
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/users/";
        url += getUserProfileId (cookies) + "/jobs/applications/confirmation";
        String response = CareerHttpClient.putUrl (url, "{\"hideMessage\":" + hideMessage + "}", cookies);
        Logging.info ("Enabled Confirmation Message: " + response);
    }

    public synchronized static void applyJob (List <Cookie> cookies, String jobId) {
        String url = CareerEnvironment.baseUrl + "/api/job-service/1/" + CareerEnvironment.tenant + "/users/";
        url += getUserProfileId (cookies) + "/jobs/applications";
        String response = CareerHttpClient.postUrl (url, "{\"jobId\":" + jobId + "}", cookies);
        Logging.info (response);
    }

    public synchronized static void takeInterestSurvey (List <Cookie> cookies, int scale) {
        Answers answers = new Answers ();
        for (int i = 1; i <= 60; ++i) {
            Answer answer = new Answer ();
            answer.setItemId (String.valueOf (i));
            answer.setOptionValues (String.valueOf (scale));
            answers.setQuestions (answer);
        }

        String url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + CareerEnvironment.tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/mc/holland";
        String result = CareerHttpClient.postUrl (url, new Gson ().toJson (answers), cookies);
        Logging.info ("dummy up Interest survey: " + result);
    }

    public synchronized static void refreshCookies (List <org.openqa.selenium.Cookie> cookies) {
        try {
            List <Cookie> apacheCookies = new ArrayList <Cookie> ();
            for (org.openqa.selenium.Cookie cookie : cookies)
                if (!cookie.getName ().equals (ASID.name ()))
                    apacheCookies.add (new BasicClientCookie (cookie.getName (), cookie.getValue ()));

            String url = CareerEnvironment.baseUrl + "/api/authentication-service/2/" + CareerEnvironment.tenant + "/user/refresh";
            Map <String, Object> result = CareerHttpClient.post (url, "", apacheCookies);
            for (Auth auth : Auth.values ())
                if (result.get (auth.name ()) != null) {
                    Cookie apacheCookie = (Cookie) result.get (auth.name ());
                    Iterator <org.openqa.selenium.Cookie> i = cookies.iterator ();
                    while (i.hasNext ())
                        if (i.next ().getName ().equals (apacheCookie.getName ()))
                            i.remove ();

                    cookies.add (setAuthCookie (apacheCookie));
                }
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }
    }

    public synchronized static List <org.openqa.selenium.Cookie> doLogin (User user) {
        List <org.openqa.selenium.Cookie> cookies = new ArrayList <org.openqa.selenium.Cookie> ();
        try {
            String url = CareerEnvironment.baseUrl + "/api/authentication-service/2/" + CareerEnvironment.tenant + "/user/login";
            Map <String, Object> result = CareerHttpClient.post (url, new Gson ().toJson (user), null);
            List <Cookie> apacheCookies = new ArrayList <Cookie> ();
            for (Auth auth : Auth.values ())
                if (result.get (auth.name ()) != null) {
                    Cookie cookie = (Cookie) result.get (auth.name ());
                    cookies.add (setAuthCookie (cookie));
                    apacheCookies.add (cookie);
                }
            Logging.info ("user login: " + result);
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }
        return cookies;
    }
}
