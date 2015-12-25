package com.aptimus.careers.test.explorer;

import static com.aptimus.careers.util.PageHelper.SortBy.Relevancy;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNull;
import static org.testng.Assert.assertTrue;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.http.cookie.Cookie;
import com.aptimus.careers.dto.explorer.BurningGlass;
import com.aptimus.careers.dto.explorer.BurningGlass.JobCode;
import com.aptimus.careers.dto.explorer.Degree;
import com.aptimus.careers.dto.explorer.Item;
import com.aptimus.careers.dto.explorer.LaborData;
import com.aptimus.careers.dto.explorer.LaborData.Certification;
import com.aptimus.careers.dto.explorer.LaborData.EducationRequirement;
import com.aptimus.careers.dto.explorer.LaborData.ExperienceLevel;
import com.aptimus.careers.dto.explorer.Onet;
import com.aptimus.careers.dto.explorer.Onet.Job;
import com.aptimus.careers.dto.explorer.Onet.JobFamily;
import com.aptimus.careers.dto.explorer.Program;
import com.aptimus.careers.dto.explorer.Response;
import com.aptimus.careers.dto.explorer.Ronet;
import com.aptimus.careers.dto.explorer.Ronet.JobTitle;
import com.aptimus.careers.dto.explorer.Skill;
import com.aptimus.careers.dto.jobs.Job.Location;
import com.aptimus.careers.dto.jobs.JobSearchRequest;
import com.aptimus.careers.dto.jobs.JobSearchResult;
import com.aptimus.careers.dto.jobs.JobSearchResult.FacetFieldValue;
import com.aptimus.careers.dto.jobs.JobSearchResult.Jobs;
import com.aptimus.careers.dto.playlist.Queue.ListItem;
import com.aptimus.careers.dto.survey.Answers;
import com.aptimus.careers.dto.survey.Answers.AnswerScore;
import com.aptimus.careers.dto.survey.Answers.Score;
import com.aptimus.careers.dto.survey.Interest;
import com.aptimus.careers.dto.survey.Questionnaire;
import com.aptimus.careers.dto.survey.Questionnaire.Question;
import com.aptimus.careers.test.CareerBaseBrowser;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.CareerHttpClient;
import com.aptimus.careers.util.PageHelper.Trait;
import com.aptimus.careers.util.TestHelper;
import com.aptimus.test.selenium.Logging;
import com.google.gson.Gson;

public class ExplorerTestBase extends CareerBaseBrowser {

    private final String tenant = CareerEnvironment.tenant;

    protected String getUserDegree () {
        return TestHelper.getMostRecentProgram (getCookies ());
    }

    protected String getUserProgramCode () {
        return TestHelper.getMostRecentProgramCode (getCookies ());
    }

    protected String getStateAreaId (Location loc) {
        return TestHelper.getStateAreaId (loc);
    }

    private String getStateAreaId () {
        return TestHelper.getStateAreaId (getCookies ());
    }

    protected void verifyRecommendationsData (List <LaborData> uiGoal) {
        verifyRecommendationsData (uiGoal, getUserProgramCode (), null);
    }

    protected void verifyRecommendationsData (List <LaborData> uiGoal, String programCode) {
        verifyRecommendationsData (uiGoal, programCode, null);
    }

    protected void verifyRecommendationsData (List <LaborData> uiGoal, String programCode, String stateId) {
        verifyLabormarketData (uiGoal, getRonetsByProgram (programCode, stateId == null ? getStateAreaId () : stateId));
    }

    private List <LaborData> getRonetsByProgram (String program, String stateId) {
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/explorer/program/results?";
        url += "stateAreaId=" + stateId + "&programCode=" + program;

        List <String> jobIds = new ArrayList <String> ();
        try {
            BurningGlass bg = new Gson ().fromJson (CareerHttpClient.getUrl (url), BurningGlass.class);
            for (int i = 0; i < bg.getJobCodes ().size (); ++i)
                jobIds.add (bg.getJobCode (i).getId ());
        } catch (Exception e) {
            // Expecting 404 Not Found, user is ANONYMOUS
            Logging.info (e.getMessage ());
        }
        jobIds.addAll (getLaborDataByOnet ());

        List <LaborData> jobs = new ArrayList <LaborData> ();
        String ronets = "ronets=";
        for (int i = 0; i < (jobIds.size () > 25 ? 25 : jobIds.size ()); ++i)
            ronets += (i == 0 ? "" : ",") + jobIds.get (i);
        jobs = getRonets (ronets, stateId);

        if (jobIds.size () > 25) {
            ronets = "ronets=";
            for (int i = 25; i < jobIds.size (); ++i)
                ronets += (i == 25 ? "" : ",") + jobIds.get (i);
            jobs.addAll (getRonets (ronets, stateId));
        }

        return jobs;
    }

    private List <String> getLaborDataByOnet () {
        List <Cookie> cookies = getCookies ();
        String profileId = TestHelper.getUserProfileId (cookies);
        String url;
        boolean takenSurvey;
        try {
            url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant + "/users/" + profileId + "/mc/holland";
            CareerHttpClient.getUrl (url, cookies);
            takenSurvey = true;
        } catch (Exception e) {
            // Expecting 404 Not Found
            Logging.info (e.getMessage ());
            takenSurvey = false;
        }

        List <String> jobs = new ArrayList <String> ();
        if (takenSurvey) {
            url = CareerEnvironment.baseUrl + "/api/onet-service/1/" + tenant + "/user/";
            url += profileId + "/jobFamily/job/program?jobsPerFamily=20&bHollandSurvey=true";

            Onet onet = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Onet.class);
            for (JobFamily family : onet.getJobFamilies ())
                if (family.getJobs () instanceof List <?>)
                    for (Job job : new Gson ().fromJson (new Gson ().toJson (family.getJobs ()), Job[].class))
                        jobs.add (job.getJobCode ());
                else
                    jobs.add (new Gson ().fromJson (new Gson ().toJson (family.getJobs ()), Job.class).getJobCode ());
        }
        return jobs;
    }

    // ronets max length is 25
    private List <LaborData> getRonets (String ronets, String stateId) {
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/ronets/labordata?";
        url += ronets + "&stateAreaId=" + stateId + "&fallback=national";
        return new Gson ().fromJson (CareerHttpClient.getUrl (url), Item.class).getItems ();
    }

    protected void verifySearchOccupation (List <LaborData> uiGoal, String searchTerm) {
        verifySearchOccupation (uiGoal, searchTerm, null);
    }

    protected void verifySearchOccupation (List <LaborData> uiGoal, String searchTerm, String stateId) {
        List <LaborData> serviceGoal = getRonetsByOccupation (searchTerm, stateId == null ? getStateAreaId () : stateId);
        verifyLabormarketData (uiGoal, serviceGoal);
    }

    private List <LaborData> getRonetsByOccupation (String searchTerm, String stateId) {
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/jobcodes?page.size=20&searchTerm=";
        url += searchTerm.replace (" ", "%20");
        Jobs jobs = new Gson ().fromJson (CareerHttpClient.getUrl (url), Jobs.class);

        url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/explorer/jobCode/";
        url += jobs.getResult (0).getId () + "/results?laborMarketDetails=true&stateAreaId=" + stateId;
        BurningGlass bg = new Gson ().fromJson (CareerHttpClient.getUrl (url), BurningGlass.class);

        List <LaborData> ronets = new ArrayList <LaborData> ();
        for (JobCode job : bg.getJobCodes ())
            ronets.add (job.getLaborMarketData ());

        String jobCode = ronets.get (0).getId ().replace ("explorer/jobs/", "");
        url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/job/" + jobCode;
        url += "/relatedjobs?fallback=national&stateAreaId=" + stateId;
        Response response = new Gson ().fromJson (CareerHttpClient.getUrl (url), Response.class);
        ronets.addAll (response.getresult ().getData ());
        return ronets;
    }

    protected void verifySearchCareer (List <LaborData> uiGoal, String minorFamily) {
        verifySearchCareer (uiGoal, minorFamily, null);
    }

    protected void verifySearchCareer (List <LaborData> uiGoal, String minorFamily, String stateId) {
        List <LaborData> serviceGoal = getRonetsByCareer (minorFamily, stateId == null ? getStateAreaId () : stateId);
        verifyLabormarketData (uiGoal, serviceGoal);
    }

    private List <LaborData> getRonetsByCareer (String minorFamily, String stateId) {
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/explorer/minorFamily/";
        url += minorFamily + "/results?fallback=national&orderBy=hiringdemand&page.size=50&sort=name&sortOrder=DESC";
        url += "&stateAreaId=" + stateId;

        BurningGlass bg = new Gson ().fromJson (CareerHttpClient.getUrl (url), BurningGlass.class);
        int jobsCount = bg.getJobCodes ().size ();
        List <LaborData> jobs = new ArrayList <LaborData> ();
        String ronets = "ronets=";
        for (int i = 0; i < (jobsCount > 25 ? 25 : jobsCount); ++i)
            ronets += (i == 0 ? "" : ",") + bg.getJobCode (i).getId ();
        jobs = getRonets (ronets, stateId);

        if (jobsCount > 25) {
            ronets = "ronets=";
            for (int i = 25; i < jobsCount; ++i)
                ronets += (i == 25 ? "" : ",") + bg.getJobCode (i).getId ();
            jobs.addAll (getRonets (ronets, stateId));
        }
        return jobs;
    }

    protected void verifyDetailUItoServiceMatch (Ronet uiJob) {
        Ronet svcJob = getGoalDetail (uiJob.getLaborData ().getROnet (), getStateAreaId ());
        verifyRelatedTitles (uiJob, svcJob);
        verifySkills (uiJob, svcJob);

        if (uiJob.getLaborData ().getEducationRequirements ().size () == 0) {
            // CGS-TBD: BG v202 vs. v200 issue
            // assertEquals (svcJob.getLaborData ().getEducationRequirements ().size (), 4);

            for (EducationRequirement eduReq : svcJob.getLaborData ().getEducationRequirements ())
                assertEquals (eduReq.getRequirementPercentile (), "0.0");
            assertEquals (uiJob.getPrograms ().size (), 0);
            assertEquals (uiJob.getDegreeList ().size (), 0);
            assertEquals (uiJob.getLaborData ().getCertifications ().size (), 0);
        } else {
            if (CareerEnvironment.isUopx)
                verifyUopDegrees (uiJob.getPrograms (), svcJob.getPrograms ());
            else
                assertEquals (uiJob.getPrograms ().size (), 0);
            verifyGeneralDegrees (uiJob.getDegreeList (), svcJob.getDegreeList ());
            verifyMinDegreeLevel (uiJob.getLaborData ().getEducationRequirements (),
                                  svcJob.getLaborData ().getEducationRequirements ());
            verifyCertificates (uiJob.getLaborData ().getCertifications (),
                                svcJob.getLaborData ().getCertifications ());
        }

        verifyJobSummary (uiJob);
        verifyLabordata (uiJob.getLaborData (), svcJob.getLaborData ());
        verifyExperience (uiJob.getLaborData ().getExperienceLevels (), svcJob.getLaborData ().getExperienceLevels ());
    }

    private Ronet getGoalDetail (String rOnet, String stateAreaId) {
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/career/";
        url += rOnet + "/details?fallback=national&laborMarketDetails=true&stateAreaId=" + stateAreaId;
        return new Gson ().fromJson (CareerHttpClient.getUrl (url), Ronet.class);
    }

    private void verifyRelatedTitles (Ronet uiJob, Ronet svcJob) {
        List <String> expected = new ArrayList <String> ();
        for (JobTitle title : svcJob.getJobTitles ())
            expected.add (title.getName ());
        assertEquals (uiJob.getRelatedTitles (), expected);
    }

    private void verifySkills (Ronet uiJob, Ronet svcJob) {
        if (svcJob.getSkills () == null) {
            assertEquals (uiJob.getSpecializedSkills ().size (), 0);
            assertEquals (uiJob.getSoftwareSkills ().size (), 0);
            assertEquals (uiJob.getFoundationSkills ().size (), 0);
        } else {
            if (uiJob.getSpecializedSkills ().size () > 0) {
                List <String> uiSpecialized = uiJob.getSpecializedSkills ();
                assertEquals (uiSpecialized.size (), svcJob.getSkills ().getSpecialized ().size ());
                for (Skill skill : svcJob.getSkills ().getSpecialized ())
                    assertTrue (uiSpecialized.contains (skill.getName ()), skill.getName ());
            } else
                assertEquals (svcJob.getSkills ().getSpecialized ().size (), 0);

            if (uiJob.getSoftwareSkills ().size () > 0) {
                List <String> uiSoftware = uiJob.getSoftwareSkills ();
                assertEquals (uiSoftware.size (), svcJob.getSkills ().getSoftware ().size ());
                for (Skill skill : svcJob.getSkills ().getSoftware ())
                    assertTrue (uiSoftware.contains (skill.getName ()), skill.getName ());
            } else
                assertEquals (svcJob.getSkills ().getSoftware ().size (), 0);

            if (uiJob.getFoundationSkills ().size () > 0) {
                List <String> uiFoundation = uiJob.getFoundationSkills ();
                assertEquals (uiFoundation.size (), svcJob.getSkills ().getFoundation ().size ());
                for (Skill skill : svcJob.getSkills ().getFoundation ())
                    assertTrue (uiFoundation.contains (skill.getName ()), skill.getName ());
            } else
                assertEquals (svcJob.getSkills ().getFoundation (), 0);
        }
    }

    private void verifyLabormarketData (List <LaborData> uiGoal, List <LaborData> serviceGoal) {
        assertEquals (uiGoal.size (), serviceGoal.size ());
        Collections.sort (uiGoal, new Comparator <LaborData> () {

            public int compare (LaborData data1, LaborData data2) {
                return data1.getROnet ().compareTo (data2.getROnet ());
            }
        });
        Collections.sort (serviceGoal, new Comparator <LaborData> () {

            public int compare (LaborData data1, LaborData data2) {
                return data1.getROnet ().compareTo (data2.getROnet ());
            }
        });
        for (int i = 0; i < uiGoal.size (); ++i)
            verifyLabordata (uiGoal.get (i), serviceGoal.get (i));
    }

    private void verifyLabordata (LaborData ui, LaborData svc) {
        assertEquals (ui.getROnet (), svc.getROnet ());

        // UI is limited to 40 chars
        assertTrue (svc.getName ().startsWith (ui.getName ().replace ("…", "")));
        assertTrue (svc.getDescription ().startsWith (ui.getDescription ()));

        String minSalary = svc.getSalaryTrendMin ();
        if (minSalary != null && minSalary.equals ("0"))
            assertNull (ui.getSalaryTrendMin ());
        else
            assertEquals (ui.getSalaryTrendMin (), minSalary, ui.getROnet ());

        String maxSalary = svc.getSalaryTrendMax ();
        if (maxSalary != null && maxSalary.equals ("0"))
            assertNull (ui.getSalaryTrendMax ());
        else
            assertEquals (ui.getSalaryTrendMax (), maxSalary, ui.getROnet ());
    }

    private void verifyExperience (List <ExperienceLevel> actual, List <ExperienceLevel> expected) {
        assertEquals (actual.size (), expected.size ());
        for (int i = 0; i < actual.size (); ++i) {
            assertEquals (actual.get (i).getExperienceLevel (), expected.get (i).getExperienceLevel ());
            assertEquals (Float.valueOf (actual.get (i).getExperiencePercentile ()),
                          Float.valueOf (expected.get (i).getExperiencePercentile ()));
        }
    }

    private void verifyCertificates (List <Certification> actual, List <Certification> expected) {
        assertEquals (actual.size (), expected.size ());
        for (int i = 0; i < actual.size (); ++i)
            assertEquals (actual.get (i).getName (), expected.get (i).getName ());
    }

    private void verifyMinDegreeLevel (List <EducationRequirement> actual, List <EducationRequirement> expected) {
        assertEquals (actual.size (), expected.size ());
        for (int i = 0; i < actual.size (); ++i) {
            assertEquals (actual.get (i).getEducationRequirementType (),
                          expected.get (i).getEducationRequirementType ());
            assertEquals (Float.valueOf (actual.get (i).getRequirementPercentile ()),
                          Float.valueOf (expected.get (i).getRequirementPercentile ()));
        }
    }

    private void verifyUopDegrees (List <Program> actual, List <Program> expected) {
        assertEquals (actual.size (), expected.size ());
        for (int i = 0; i < actual.size (); ++i) {
            assertEquals (actual.get (i).getProgramLevel (), expected.get (i).getProgramLevel ());
            assertEquals (actual.get (i).getProgramName (), expected.get (i).getProgramName ());
        }
    }

    private void verifyGeneralDegrees (List <Degree> actual, List <Degree> expected) {
        assertEquals (actual.size (), expected.size ());
        for (int i = 0; i < actual.size (); ++i)
            assertEquals (actual.get (i).getName (), expected.get (i).getName ());
    }

    private void verifyJobSummary (Ronet uiJob) {
        Location loc = TestHelper.getUserLocation (getCookies ());
        JobSearchRequest request = new JobSearchRequest ();
        request.setJobCode (uiJob.getLaborData ().getROnet ());
        request.setLocation (loc.getCity () + ", " + loc.getState ());
        request.setPageNumber (0);
        request.setPageSize ("5");
        request.setSortBy (Relevancy.css ());

        JobSearchResult result = TestHelper.searchSolr (request);
        int numResults = result.getJobs ().getTotalNumberOfResults ();

        assertEquals (uiJob.getNumJobOpportunities (), String.valueOf (numResults));
        if (numResults > 0) {
            List <FacetFieldValue> companies = TestHelper.getCompanyFields (request);
            for (int i = 0; i < uiJob.getTopEmployers ().size (); ++i) {
                String employer = companies.get (i).getName ().trim () + " (" + companies.get (i).getCount () + ")";
                assertEquals (uiJob.getTopEmployer (i), employer);
            }
        }
    }

    protected void verifyLabordataAcrossPages (LaborData actual, LaborData expected) {
        assertEquals (actual.getROnet (), expected.getROnet ());
        assertEquals (actual.getName (), expected.getName ());

        String minSalary = actual.getSalaryTrendMin ();
        if (minSalary == null || minSalary.equals ("0"))
            assertNull (expected.getSalaryTrendMin ());
        else {
            if (minSalary.contains ("K"))
                assertEquals (minSalary, Math.round (Double.valueOf (expected.getSalaryTrendMin ()) / 1000) + "K");
            else
                assertEquals (minSalary, expected.getSalaryTrendMin ());
        }

        String maxSalary = actual.getSalaryTrendMax ();
        if (maxSalary == null || maxSalary.equals ("0"))
            assertNull (expected.getSalaryTrendMax ());
        else if (maxSalary.contains ("K"))
            assertEquals (maxSalary, Math.round (Double.valueOf (expected.getSalaryTrendMax ()) / 1000) + "K");
        else
            assertEquals (maxSalary, expected.getSalaryTrendMax ());
    }

    protected void deleteMyGoals () {
        TestHelper.deleteMyGoals (getCookies ());
    }

    protected ListItem setMyNineGoals () {
        List <Cookie> cookies = getCookies ();
        TestHelper.deleteMyGoals (cookies);
        List <String> rOnets = new ArrayList <String> ();
        rOnets.add ("17-2061.00"); // Hardware Engineer
        rOnets.add ("17-2199.11"); // Solar Engineer
        rOnets.add ("17-2199.04"); // Manufacturing Engineer
        rOnets.add ("17-2011.00"); // Aerospace Engineer
        rOnets.add ("17-2081.00"); // Environmental Engineer
        rOnets.add ("17-2131.00"); // Materials Engineer
        rOnets.add ("17-2141.00"); // Mechanical Engineer
        rOnets.add ("17-2051.00"); // Civil Engineer
        rOnets.add ("17-2081.01"); // Water/Wastewater Engineer
        return TestHelper.setMyGoals (cookies, rOnets);
    }

    protected void resetInterestSurvey () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/mc/holland";
        try {
            String result = CareerHttpClient.deleteUrl (url, cookies);
            Logging.info ("reset Interest survey: " + result);
        } catch (Exception e) {
            // user has not taken Interest survey
            Logging.error (e.getMessage ());
        }
    }

    protected Questionnaire getInterestSurvey () {
        String url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant + "/surveys/mc/holland/q";
        Question[] questions = new Gson ().fromJson (CareerHttpClient.getUrl (url, getCookies ()), Question[].class);
        Questionnaire questionnaire = new Questionnaire ();
        questionnaire.setQuestions (Arrays.asList (questions));
        return questionnaire;
    }

    protected void verifyUserScores (Map <Trait, String> uiScore) {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/mc/holland";
        Answers q = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Answers.class);

        AnswerScore svcScore = q.getAnswerScore ("legacyInterestSurveyScore");
        double total = 0;
        for (Score score : svcScore.getScores ())
            total += Double.valueOf (score.getScoreValue ());

        for (Trait trait : Trait.values ()) {
            long score = Math.round (Double.valueOf (svcScore.getScore (trait.name ()).getScoreValue ()) * 100 / total);
            assertEquals (uiScore.get (trait), String.valueOf (score));
        }
    }

    protected void verifyInterestText (Map <Trait, String> uiInterest) {
        String url = CareerEnvironment.baseUrl + "/api/onet-service/1/" + tenant + "/occupationalInterest/";
        Interest svcInterest = new Gson ().fromJson (CareerHttpClient.getUrl (url), Interest.class);

        for (Trait trait : uiInterest.keySet ())
            assertEquals (uiInterest.get (trait), svcInterest.getOccupationalInterest (trait.name ()).getDescription ());
    }

    protected void takeInterestSurvey () {
        TestHelper.takeInterestSurvey (getCookies (), 2);
    }

    protected Location getUserLocation () {
        Location loc = TestHelper.getUserLocation (getCookies ());
        loc.setCity (WordUtils.capitalizeFully (loc.getCity ()));
        loc.setState (loc.getState ().toUpperCase ());
        return loc;
    }
}
