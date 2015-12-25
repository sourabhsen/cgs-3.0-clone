package com.aptimus.careers.test.dashboard;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;
import static org.testng.Assert.fail;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.http.cookie.Cookie;
import com.aptimus.careers.dto.jobs.Job.Location;
import com.aptimus.careers.dto.resume.Contact;
import com.aptimus.careers.dto.resume.Contact.Phone;
import com.aptimus.careers.dto.resume.Contact.PostalAddress;
import com.aptimus.careers.dto.resume.Resumes.JobPreference;
import com.aptimus.careers.dto.resume.Resumes.Resume;
import com.aptimus.careers.dto.resume.Resumes.Summary;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.dto.survey.Answers;
import com.aptimus.careers.dto.survey.Answers.Answer;
import com.aptimus.careers.dto.survey.Assertions;
import com.aptimus.careers.dto.survey.Questionnaire;
import com.aptimus.careers.dto.survey.Questionnaire.Option;
import com.aptimus.careers.dto.survey.Questionnaire.Question;
import com.aptimus.careers.test.CareerBaseBrowser;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.CareerHttpClient;
import com.aptimus.careers.util.TestHelper;
import com.aptimus.test.selenium.Logging;
import com.google.gson.Gson;

public class DashboardTestBase extends CareerBaseBrowser {

    private String tenant = CareerEnvironment.tenant;

    protected void deleteMyGoals () {
        TestHelper.deleteMyGoals (getCookies ());
    }

    protected void deleteAllAppliedJobs () {
        TestHelper.deleteAllAppliedJobs (getCookies ());
    }

    protected void deleteAllSavedJobs () {
        TestHelper.deleteAllSavedJobs (getCookies ());
    }

    protected void deleteAllSavedResumes () {
        TestHelper.deleteAllSavedResumes (getCookies ());
    }

    protected List <UserResume> createResumes (int numberOfResumes) {
        List <UserResume> resumes = new ArrayList <UserResume> ();
        for (int i = 1; i <= numberOfResumes; ++i)
            resumes.add (completeResume ());

        return TestHelper.createResumes (getCookies (), resumes);
    }

    protected void setResumePublic (String resumeId) {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/resume-service/1/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/resume/" + resumeId + "/preferences";
        String response = CareerHttpClient.putUrl (url, "{\"searchable\":true}", cookies);
        Logging.info (response);
    }

    protected void setFirstOption () {
        List <Cookie> cookies = getCookies ();
        List <Question> questionnaires = getSurvey ();
        Answers answers = new Answers ();
        for (Question question : questionnaires) {
            Answer answer = new Answer ();
            answer.setItemId (question.getItemId ());
            answer.setOptionValues (question.getOptionValue (0).getOptionValue ());
            answers.setQuestions (answer);
        }

        String url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/mc/firsttime";
        String result = CareerHttpClient.postUrl (url, new Gson ().toJson (answers), cookies);
        Logging.info (result);
    }

    protected void resetFirstTimeSurvey () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/mc/firsttime";
        try {
            String result = CareerHttpClient.deleteUrl (url, cookies);
            Logging.info ("reset First Time survey: " + result);
        } catch (Exception e) {
            // user has not taken First Time survey
            Logging.error (e.getMessage ());
        }
    }

    protected void verifyNoSurveyTaken (List <Question> ui) {
        for (Question question : ui)
            for (Option option : question.getOptionValues ())
                assertFalse (option.isSelected ());
    }

    protected void verifySurvey (List <Question> ui) {
        List <Question> svc = getSurvey ();
        assertEquals (ui.size (), svc.size ());
        for (int i = 0; i < svc.size (); ++i) {
            assertEquals (ui.get (i).getItemId (), svc.get (i).getItemId ());
            assertEquals (ui.get (i).getItemText (), svc.get (i).getItemText ());
            verifySurveyAnswers (ui.get (i).getOptionValues (), svc.get (i).getOptionValues ());
        }
    }

    private void verifySurveyAnswers (List <Option> uiOption, List <Option> svcOption) {
        assertEquals (uiOption.size (), svcOption.size ());
        for (int i = 0; i < svcOption.size (); ++i) {
            assertEquals (uiOption.get (i).getOptionLabel (), svcOption.get (i).getOptionLabel ());
            assertEquals (uiOption.get (i).getOptionValue (), svcOption.get (i).getOptionValue ());
            assertEquals (uiOption.get (i).isSelected (), svcOption.get (i).isSelected ());
        }
    }

    private List <Question> getSurvey () {
        List <Cookie> cookies = getCookies ();
        String base = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant;
        String survey = base + "/surveys/mc/firsttime";
        Questionnaire q = new Gson ().fromJson (CareerHttpClient.getUrl (survey, cookies), Questionnaire.class);

        try {
            String answer = base + "/users/" + TestHelper.getUserProfileId (cookies) + "/mc/firsttime";
            Answers answers = new Gson ().fromJson (CareerHttpClient.getUrl (answer, cookies), Answers.class);
            for (Question question : q.getQuestions ())
                for (int i = 0; i < question.getOptionValues ().size (); ++i)
                    if (answers.getQuestionByValue (question.getOptionValue (i).getOptionValue ()) != null)
                        question.getOptionValue (i).setSelected (true);
                    else
                        question.getOptionValue (i).setSelected (false);
        } catch (Exception e) {
            // user has not taken First Time survey
            Logging.error (e.getMessage ());
        }

        return q.getQuestions ();
    }

    protected void takeInterestSurvey () {
        TestHelper.takeInterestSurvey (getCookies (), 2);
    }

    protected Assertions getUserAssertions () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/survey-service/2/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/mc/firsttime/assertions";
        return new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Assertions.class);
    }

    public void compareLastUpdated (Assertions beforeRescore, Assertions afterRescore) {
        try {
            Duration before = DatatypeFactory.newInstance ().newDuration (beforeRescore.getUpdatedSince ());
            Duration after = DatatypeFactory.newInstance ().newDuration (afterRescore.getUpdatedSince ());
            assertTrue (after.isShorterThan (before));
        } catch (Exception e) {
            fail (e.getMessage ());
        }
    }

    protected String getUserLocation () {
        Location loc = TestHelper.getUserLocation (getCookies ());
        return WordUtils.capitalizeFully (loc.getCity ()) + ", " + loc.getState ().toUpperCase ();
    }

    private UserResume completeResume () {
        UserResume document = new UserResume ();
        document.setName ("selenium - " + TestHelper.dummyString (10));
        document.setPrimaryInd ("Y");
        document.setStatus ("COMPLETE");

        Resume resume = new Resume ();
        resume.setEmpty (false);
        resume.setContact (contactInfo ());
        resume.setSummary (summary ());
        resume.setJobPreferences (new JobPreference (false));

        document.setResume (resume);
        return document;
    }

    private Contact contactInfo () {
        Contact contact = new Contact ();
        contact.setFirstName ("Selenium");
        contact.setLastName ("Chrome");
        contact.setEmail ("selenium.test@mailinator.com");
        contact.setPhone (new Phone ("(650) 343-9105"));

        PostalAddress postalAddress = new PostalAddress ("Seattle", "WA");
        postalAddress.setZipCode ("98121");
        contact.setPostalAddress (postalAddress);
        return contact;
    }

    private Summary summary () {
        Summary summary = new Summary ();
        summary.setUserSummary ("Selenium User summary " + TestHelper.dummyString (10));
        summary.setIncludeUserSummary (true);
        summary.setObjectives (Arrays.asList (new String[] { "Objective 1", "Objective 2" }));
        return summary;
    }
}
