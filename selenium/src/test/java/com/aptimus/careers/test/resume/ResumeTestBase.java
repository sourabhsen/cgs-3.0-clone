package com.aptimus.careers.test.resume;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNull;
import static org.testng.Assert.assertTrue;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import org.apache.http.cookie.Cookie;
import com.aptimus.careers.dto.resume.Contact;
import com.aptimus.careers.dto.resume.Contact.Phone;
import com.aptimus.careers.dto.resume.Contact.PostalAddress;
import com.aptimus.careers.dto.resume.Education;
import com.aptimus.careers.dto.resume.Education.Gpa;
import com.aptimus.careers.dto.resume.Education.School;
import com.aptimus.careers.dto.resume.Experience;
import com.aptimus.careers.dto.resume.Experience.Employer;
import com.aptimus.careers.dto.resume.Resumes.AdditionalInfo;
import com.aptimus.careers.dto.resume.Resumes.AdditionalSection;
import com.aptimus.careers.dto.resume.Resumes.JobPreference;
import com.aptimus.careers.dto.resume.Resumes.Resume;
import com.aptimus.careers.dto.resume.Resumes.Statements;
import com.aptimus.careers.dto.resume.Resumes.Statements.Personal;
import com.aptimus.careers.dto.resume.Resumes.Statements.Veteran;
import com.aptimus.careers.dto.resume.Resumes.Summary;
import com.aptimus.careers.dto.resume.UserResume;
import com.aptimus.careers.test.CareerBaseBrowser;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.CareerHttpClient;
import com.aptimus.careers.util.TestHelper;
import com.aptimus.test.selenium.Logging;
import com.google.gson.Gson;

public class ResumeTestBase extends CareerBaseBrowser {

    private final String tenant = CareerEnvironment.tenant;

    protected String generateRandomTitle () {
        return "selenium - " + TestHelper.dummyString (10);
    }

    protected Contact minContactInfo () {
        Contact contact = new Contact ();
        contact.setFirstName ("John");
        contact.setLastName ("Smith");
        contact.setEmail ("john.smith@email.com");
        contact.setPhone (new Phone ("(555) 555-5555"));

        PostalAddress postalAddress = new PostalAddress ("Oakland", "California");
        postalAddress.setZipCode ("94117");
        contact.setPostalAddress (postalAddress);
        return contact;
    }

    protected Contact contactInfo () {
        Contact contact = minContactInfo ();
        contact.getPostalAddress ().setAddressLine1 ("333 Page Street");
        contact.getPostalAddress ().setAddressLine2 ("Apt 1056");
        return contact;
    }

    protected Employer HealthTrio () {
        Employer job = new Employer ();
        // job.setEmployer ("HealthTrio, Inc."); - ANGCGS-756
        job.setEmployer ("HealthTrio, Inc");
        job.setAddress (new PostalAddress ("Tucson", "Arizona"));
        job.setStartDate (parseDate ("01/2009"));
        job.setEndDate (parseDate ("02/2011"));
        job.presentJob (false);
        job.setJobTitle ("Senior Java Developer");
        job.setDescription ("I did this *And this *And this too.");
        return job;
    }

    protected Employer ImpactEdu () {
        Employer job = new Employer ();
        // job.setEmployer ("Impact Education, Inc."); - ANGCGS-756
        job.setEmployer ("Impact Education, Inc");
        job.setAddress (new PostalAddress ("Ft. Myers", "Florida"));
        job.setStartDate (parseDate ("10/2008"));
        job.setEndDate (parseDate ("06/2009"));
        job.presentJob (false);
        job.setJobTitle ("Lead Software Engineer");
        job.setDescription ("I have done so many things *And these things *And even more");
        return job;
    }

    protected Employer RealNetworks () {
        Employer job = new Employer ();
        // job.setEmployer ("RealNetworks, Inc."); - ANGCGS-756
        job.setEmployer ("RealNetworks, Inc");
        job.setAddress (new PostalAddress ("Seattle", "Washington"));
        job.setStartDate (parseDate ("01/2000"));
        job.setEndDate (parseDate ("04/2006"));
        job.presentJob (false);
        job.setJobTitle ("General Manager");
        job.setDescription ("I did this *And this *And this too.");
        return job;
    }

    protected School minSchool () {
        School school = new School ();
        school.setInstitution ("Oregon State University");
        school.setAddress (new PostalAddress ("Corvallis", "Oregon"));
        school.setDegreeLevel ("Bachelor of");
        school.setDegreeType ("Engineering");
        school.setMajor ("Computer Science");
        school.setStartDate (parseDate ("01/1994"));
        school.setCompletionDate (parseDate ("06/2000"));
        school.presentlyEnrolled (false);
        return school;
    }

    protected School bsOSU () {
        School school = minSchool ();
        school.setGpa (new Gpa ("3.0"));
        school.setDetails ("Here are some details of my education at Oregon St. Univ.");
        return school;
    }

    protected School msUW () {
        School school = new School ();
        school.setInstitution ("University of Washington");
        school.setAddress (new PostalAddress ("Seattle", "Washington"));
        school.setDegreeLevel ("Master of");
        school.setDegreeType ("Technology");
        school.setMajor ("Digital Electronics & Communication Systems");
        school.setGpa (new Gpa ("3.5"));
        school.setStartDate (parseDate ("06/2005"));
        school.setCompletionDate (parseDate ("06/2007"));
        school.presentlyEnrolled (false);
        school.setDetails ("Here are some details of my education at U of Washington");
        return school;
    }

    protected School msUO () {
        School school = new School ();
        school.setInstitution ("University of Oregon");
        school.setAddress (new PostalAddress ("Eugene", "Oregon"));
        school.setDegreeLevel ("Master of");
        school.setDegreeType ("Arts");
        school.setMajor ("Business Administration");
        school.setGpa (new Gpa ("3.9"));
        school.setStartDate (parseDate ("01/2008"));
        school.setCompletionDate (parseDate ("01/2010"));
        school.presentlyEnrolled (false);
        school.setDetails ("Here are some details of my education at U of Oregon");
        return school;
    }

    protected void verifyResumeList (UserResume uiResume, UserResume svcResume) {
        assertEquals (uiResume.getResumeId (), svcResume.getResumeId ());
        assertEquals (uiResume.getName (), svcResume.getName ());
        assertEquals (uiResume.getPrimaryInd (), svcResume.getPrimaryInd ());
        assertEquals (uiResume.getStatus (), svcResume.getStatus ());
        assertEquals (uiResume.getResume ().getPrivacySetting (), svcResume.getResume ().getPrivacySetting ());
    }

    protected void verifyContact (Contact uiContact, String resumeId) {
        verifyContact (uiContact, getResume (resumeId).getResume ().getContact ());
    }

    protected void verifyContact (Contact uiContact, Contact svcContact) {
        assertEquals (uiContact.getFirstName (), svcContact.getFirstName ());
        assertEquals (uiContact.getLastName (), svcContact.getLastName ());
        assertEquals (uiContact.getEmail (), svcContact.getEmail ());
        assertEquals (uiContact.getPhone (0).getNumber (), svcContact.getPhone (0).getNumber ());
        verifyLocation (uiContact.getPostalAddress (), svcContact.getPostalAddress ());
    }

    private void verifyLocation (PostalAddress uiPostal, PostalAddress svcPostal) {
        if (uiPostal.getAddressLine1 () == null || uiPostal.getAddressLine1 ().isEmpty ())
            assertTrue (svcPostal.getAddressLine1 () == null || svcPostal.getAddressLine1 ().isEmpty ());
        else
            assertEquals (uiPostal.getAddressLine1 (), svcPostal.getAddressLine1 ());

        if (uiPostal.getAddressLine2 () == null || uiPostal.getAddressLine2 ().isEmpty ())
            assertTrue (svcPostal.getAddressLine2 () == null || svcPostal.getAddressLine2 ().isEmpty ());
        else
            assertEquals (uiPostal.getAddressLine2 (), svcPostal.getAddressLine2 ());

        assertEquals (uiPostal.getCity (), svcPostal.getCity ());
        assertEquals (uiPostal.getState (), svcPostal.getState ());
        assertEquals (uiPostal.getZipCode (), svcPostal.getZipCode ());
    }

    protected void verifyEducation (List <School> uiSchools, String resumeId) {
        List <School> svcSchools = getResume (resumeId).getResume ().getEducation ().getSchools ();
        assertEquals (uiSchools.size (), svcSchools.size ());
        for (int i = 0; i < uiSchools.size (); ++i)
            verifyEducation (uiSchools.get (i), svcSchools.get (i));
    }

    protected void verifyEducation (School uiSchool, School svcSchool) {
        assertEquals (uiSchool.getInstitution (), svcSchool.getInstitution ());
        if (uiSchool.getAddress () == null) {
            assertNull (svcSchool.getAddress ());
        } else {
            assertEquals (uiSchool.getAddress ().getCity (), svcSchool.getAddress ().getCity ());
            assertEquals (uiSchool.getAddress ().getState (), svcSchool.getAddress ().getState ());
        }

        assertEquals (uiSchool.getDegreeLevel (), svcSchool.getDegreeLevel ());

        if (uiSchool.getDegreeType ().isEmpty ())
            assertTrue (svcSchool.getDegreeType () == null || svcSchool.getDegreeType ().isEmpty ());
        else
            assertEquals (uiSchool.getDegreeType (), svcSchool.getDegreeType ());

        assertEquals (uiSchool.getMajor (), svcSchool.getMajor ());

        if (uiSchool.getGpa () == null || uiSchool.getGpa ().getValue ().isEmpty ()) {
            Gpa gpa = svcSchool.getGpa ();
            assertTrue (gpa == null || gpa.getValue () == null || gpa.getValue ().isEmpty ());
        } else
            assertEquals (uiSchool.getGpa ().getValue (), svcSchool.getGpa ().getValue ());

        assertEquals (formatDate (uiSchool.getStartDate ()), formatDate (svcSchool.getStartDate ()));
        if (uiSchool.getCompletionDate () == null)
            assertNull (svcSchool.getCompletionDate ());
        else
            assertEquals (formatDate (uiSchool.getCompletionDate ()), formatDate (svcSchool.getCompletionDate ()));

        assertEquals (uiSchool.isPresentlyEnrolled (), svcSchool.isPresentlyEnrolled ());

        if (uiSchool.getDetails ().isEmpty ())
            assertTrue (svcSchool.getDetails () == null || svcSchool.getDetails ().isEmpty ());
        else
            assertEquals (uiSchool.getDetails (), svcSchool.getDetails ());
    }

    protected void verifyExperience (List <Employer> uiEmployers, String resumeId) {
        List <Employer> svcEmployers = getResume (resumeId).getResume ().getExperience ().getJobs ();
        assertEquals (uiEmployers.size (), svcEmployers.size ());
        for (int i = 0; i < uiEmployers.size (); ++i)
            verifyExperience (uiEmployers.get (i), svcEmployers.get (i));
    }

    protected void verifyExperience (Employer uiEmployer, Employer svcEmployer) {
        assertEquals (uiEmployer.getEmployer (), svcEmployer.getEmployer ());

        if (uiEmployer.getAddress () == null) {
            assertNull (svcEmployer.getAddress ());
        } else {
            assertEquals (uiEmployer.getAddress ().getCity (), svcEmployer.getAddress ().getCity ());
            assertEquals (uiEmployer.getAddress ().getState (), svcEmployer.getAddress ().getState ());
        }

        assertEquals (formatDate (uiEmployer.getStartDate ()), formatDate (svcEmployer.getStartDate ()));
        if (uiEmployer.getEndDate () == null)
            assertNull (svcEmployer.getEndDate ());
        else
            assertEquals (formatDate (uiEmployer.getEndDate ()), formatDate (svcEmployer.getEndDate ()));

        assertEquals (uiEmployer.isPresentJob (), svcEmployer.isPresentJob ());
        assertEquals (uiEmployer.getJobTitle (), svcEmployer.getJobTitle ());
        assertEquals (uiEmployer.getDescription (), svcEmployer.getDescription ());
    }

    protected void verifyAdditionalInfo (AdditionalInfo uiInfo, String resumeId) {
        verifyAdditionalInfo (uiInfo, getResume (resumeId).getResume ().getAdditionalInfo ());
    }

    protected void verifyAdditionalInfo (AdditionalInfo uiInfo, AdditionalInfo svcInfo) {
        assertEquals (uiInfo.getSkills (), svcInfo.getSkills ());
        assertEquals (uiInfo.getLanguages (), svcInfo.getLanguages ());
        assertEquals (uiInfo.getCertifications (), svcInfo.getCertifications ());
        assertEquals (uiInfo.getAwards (), svcInfo.getAwards ());
        assertEquals (uiInfo.getPersonalHobbies (), svcInfo.getPersonalHobbies ());
        assertEquals (uiInfo.getVolunteerWork (), svcInfo.getVolunteerWork ());
    }

    protected void deleteAllSavedResumes () {
        TestHelper.deleteAllSavedResumes (getCookies ());
    }

    protected List <UserResume> createResumes (int numberOfResumes) {
        List <Cookie> cookies = getCookies ();
        TestHelper.deleteAllSavedResumes (cookies);
        List <UserResume> resumes = new ArrayList <UserResume> ();
        for (int i = 1; i <= numberOfResumes; ++i)
            resumes.add (completeResume ());

        return TestHelper.createResumes (cookies, resumes);
    }

    protected UserResume getResume (String resumeId) {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/resume-service/1/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/resume/" + resumeId;
        return TestHelper.gsonBuilder ().fromJson (CareerHttpClient.getUrl (url, cookies), UserResume.class);
    }

    private UserResume completeResume () {
        UserResume document = new UserResume ();
        document.setName (generateRandomTitle ());
        document.setPrimaryInd ("Y");
        document.setStatus ("COMPLETE");

        Resume resume = new Resume ();
        resume.setEmpty (false);
        resume.setContact (contactInfo ());
        resume.setStatements (statements ());
        resume.setAdditionalInfo (additionalInfo ());
        resume.setSummary (summary ());
        resume.setEducation (new Education (msUW ()));
        resume.getEducation ().getSchools ().add (bsOSU ());
        resume.setExperience (new Experience (HealthTrio ()));
        resume.getExperience ().getJobs ().add (ImpactEdu ());
        resume.setAdditionalSections (additionalSections ());
        resume.setCanonSkills (canonSkills ());
        resume.setJobPreferences (new JobPreference (false));

        document.setResume (resume);
        return document;
    }

    private Statements statements () {
        Statements statements = new Statements ();
        statements.setHonors ("honor1");
        statements.setPersonal (new Personal (new Veteran (false)));
        return statements;
    }

    private Summary summary () {
        Summary summary = new Summary ();
        summary.setUserSummary ("Selenium User summary " + TestHelper.dummyString (10));
        summary.setIncludeUserSummary (true);
        summary.setObjectives (Arrays.asList (new String[] { "Objective 1", "Objective 2" }));
        return summary;
    }

    protected AdditionalInfo additionalInfo () {
        AdditionalInfo info = new AdditionalInfo ();
        for (String skill : canonSkills ())
            info.setSkills (skill);

        info.setLanguages ("language 1");
        info.setLanguages ("language 2");
        info.setCertifications ("cert 1");
        info.setCertifications ("cert 2");
        info.setAwards ("award 1");
        info.setAwards ("award 2");
        info.setPersonalHobbies ("hobby 1");
        info.setPersonalHobbies ("hobby 2");
        info.setVolunteerWork ("volunteer 1");
        info.setVolunteerWork ("volunteer 2");
        return info;
    }

    private List <AdditionalSection> additionalSections () {
        AdditionalSection section = new AdditionalSection ();
        section.setId (1);
        section.setContent ("section1-" + TestHelper.dummyString (10));
        section.setSection ("Selenium New Section");

        List <AdditionalSection> sections = new ArrayList <AdditionalSection> ();
        sections.add (section);
        return sections;
    }

    private List <String> canonSkills () {
        List <String> canonSkills = new ArrayList <String> ();
        canonSkills.add ("Account Reconciliation");
        canonSkills.add ("Accounting");
        canonSkills.add ("Accounting Systems");
        canonSkills.add ("Accounts Payable and Receivable");
        canonSkills.add ("Billing Systems");
        canonSkills.add ("Bookkeeping");
        canonSkills.add ("Cost Accounting");
        canonSkills.add ("Financial Statements");
        canonSkills.add ("French");
        canonSkills.add ("Microsoft Excel");
        canonSkills.add ("Microsoft Powerpoint");
        canonSkills.add ("Payment Schedules");
        canonSkills.add ("Payroll Processing");
        canonSkills.add ("Quickbooks");
        canonSkills.add ("Research");
        canonSkills.add ("Tax Returns");
        return canonSkills;
    }

    private Date parseDate (String date) {
        try {
            return new SimpleDateFormat ("MM/yyyy").parse (date);
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return null;
        }
    }

    private String formatDate (Date date) {
        return new SimpleDateFormat ("MM/yyyy").format (date);
    }

    protected String uploadResumeDoc () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/resume-service/1/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/document";
        String response = CareerHttpClient.postResume (url, "happypath.docx", cookies);
        Logging.info (response);
        return new Gson ().fromJson (response, UserResume.class).getDocumentId ();
    }
}
