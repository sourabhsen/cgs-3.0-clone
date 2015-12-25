package com.aptimus.careers.test.skills;

import static com.aptimus.careers.util.PageHelper.CourseType.allTypes;
import static com.aptimus.careers.util.PageHelper.ListType.SKILL;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertNull;
import static org.testng.Assert.assertTrue;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.http.cookie.Cookie;
import com.aptimus.careers.dto.jobs.JobSearchResult.Jobs;
import com.aptimus.careers.dto.jobs.JobSearchResult.Result;
import com.aptimus.careers.dto.playlist.Queue;
import com.aptimus.careers.dto.playlist.Queue.ListItem;
import com.aptimus.careers.dto.skill.RSkill;
import com.aptimus.careers.dto.skill.SkilledUp;
import com.aptimus.careers.dto.skill.SkilledUp.Course;
import com.aptimus.careers.dto.skill.SkilledUp.Range;
import com.aptimus.careers.dto.skill.SkilledUp.Term;
import com.aptimus.careers.test.CareerBaseBrowser;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.CareerHttpClient;
import com.aptimus.careers.util.PageHelper.CourseType;
import com.aptimus.careers.util.PageHelper.PriceType;
import com.aptimus.careers.util.TestHelper;
import com.aptimus.test.selenium.Logging;
import com.google.gson.Gson;

public class SkillBuilderTestBase extends CareerBaseBrowser {

    private String tenant = CareerEnvironment.tenant;

    protected RSkill getSkill (Result goal, String skillName) {
        for (RSkill skill : getServiceSkills (goal))
            if (skill.getSkill ().getDisplayName ().equalsIgnoreCase (skillName))
                return skill;
        return null;
    }

    protected void verifySkillsUItoServiceMatch (List <RSkill> uiSkills, Result goal) {
        List <RSkill> serviceSkills = getServiceSkills (goal);
        assertEquals (uiSkills.size (), serviceSkills.size ());
        for (int i = 0; i < uiSkills.size (); ++i)
            verifyRonetSkill (uiSkills.get (i), serviceSkills.get (i));
    }

    private List <RSkill> getServiceSkills (Result goal) {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/skill-service/1/skills/occupations/RONET?";
        url += "jobcode=" + goal.getId () + "&maximumskills=15&profileid=" + TestHelper.getUserProfileId (cookies);
        url += "&sort=Importance&tenantid=" + tenant;

        Map <?, ?> rSkills = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Map.class);
        return Arrays.asList (new Gson ().fromJson (new Gson ().toJson (rSkills.values ().iterator ().next ()),
                                                    RSkill[].class));
    }

    private void verifyRonetSkill (RSkill uiSkill, RSkill svcSkill) {
        String skillName = uiSkill.getSkill ().getDisplayName ();
        assertEquals (uiSkill.getSkill ().getSkillId (), svcSkill.getSkill ().getSkillId ());
        assertTrue (skillName.startsWith (svcSkill.getSkill ().getDisplayName ()));

        if (uiSkill.getSkill ().getDescription () == null) {
            assertNull (svcSkill.getSkill ().getDescription ());
            assertNull (uiSkill.getWikipediaUrl ());
            assertNotNull (svcSkill.getWikipediaUrl ());
        } else {
            String serviceDesc = new String (svcSkill.getSkill ().getDescription ().getBytes (ISO88591), UTF8);
            assertTrue (serviceDesc.startsWith (uiSkill.getSkill ().getDescription ()), skillName);
            assertEquals (uiSkill.getWikipediaUrl (), svcSkill.getWikipediaUrl ());
        }

        Map <String, String> actual = uiSkill.getUserJobCodesThisSkillAppearsIn ();
        Map <String, String> expected = svcSkill.getUserJobCodesThisSkillAppearsIn ();
        if (actual == null)
            assertNull (expected);
        else {
            assertEquals (actual.size (), expected.size (), "checking skill=" + skillName);
            for (String goal : expected.values ())
                assertTrue (actual.containsValue (goal), goal);
        }

        // user hasn't rate the skill
        if (svcSkill.getUserDeclaredLevel () == null)
            assertNull (uiSkill.getUserDeclaredLevel (), skillName);
        else
            assertEquals (uiSkill.getUserDeclaredLevel (), svcSkill.getUserDeclaredLevel ());
    }

    protected void verifyCourses (List <Course> uiCourses, List <Course> svcCourses) {
        assertEquals (uiCourses.size (), svcCourses.size ());
        Map <String, Course> ui = hashCourseList (uiCourses);
        Map <String, Course> svc = hashCourseList (svcCourses);

        for (String id : ui.keySet ()) {
            assertTrue (svc.containsKey (id), id + " is in UI but not skill service");
            verifyCourse (ui.get (id), svc.get (id));
        }
    }

    private void verifyCourse (Course uiCourse, Course svcCourse) {
        String provider = uiCourse.getProvider ().getName ();
        assertEquals (provider, new String (svcCourse.getProvider ().getName ().getBytes (ISO88591), UTF8));

        String title = new String (svcCourse.getName ().getBytes (ISO88591), UTF8);
        assertEquals (uiCourse.getName (), title.replace (" ", " ").trim (), provider);

        if (svcCourse.getDescription () == null)
            assertEquals (uiCourse.getDescription (), "", title);
        else {
            String svcDesc = svcCourse.getDescription ();
            String uiDesc = uiCourse.getDescription ();
            assertEquals (uiDesc.length () > 560 ? uiDesc.substring (0, 560) : uiDesc,
                          svcDesc.length () > 560 ? svcDesc.substring (0, 560) : svcDesc, title);
        }

        assertEquals (uiCourse.getOffer (0).getPrice ().getDisplayText (),
                      svcCourse.getOffer (0).getPrice ().getDisplayText ());

        if (svcCourse.getAuthor () == null || svcCourse.getAuthor ().getName () == null)
            assertNull (uiCourse.getAuthor (), title);
        else {
            String svcAuthor = new String (svcCourse.getAuthor ().getName ().getBytes (ISO88591), UTF8);
            assertEquals (uiCourse.getAuthor ().getName (), svcAuthor, title);
        }

        assertEquals (uiCourse.getDurationDisplay (), svcCourse.getDurationDisplay (), title);
    }

    private Map <String, Course> hashCourseList (List <Course> courses) {
        Map <String, Course> hashCourses = new HashMap <String, Course> ();
        for (Course course : courses)
            hashCourses.put (course.getId (), course);

        return hashCourses;
    }

    protected SkilledUp getCourses (RSkill skill, CourseType cType, PriceType pType) {
        return getCourses (skill, cType, pType, 0);
    }

    protected SkilledUp getCourses (RSkill skill, CourseType cType, PriceType pType, int pageNo) {
        String course_type_id = cType.equals (allTypes) ? "" : "&product.type.name=" + cType;
        String url = CareerEnvironment.baseUrl + "/api/skill-service/1/products?q=";
        url += skill.getSkill ().getDisplayName ().replace (" ", "%20");
        url += course_type_id + pType.value ();
        url += "&facet=product.type&facet=price&page.number=" + pageNo + "&page.size=15";
        return new Gson ().fromJson (CareerHttpClient.getUrl (url), SkilledUp.class);
    }

    protected void verifyCourseTypeCount (List <Term> uiTerms, List <Term> svcTerms) {
        int total = 0, count = 0;
        for (Term term : uiTerms) {
            if (term.getTerm ().equals (CourseType.allTypes.name ()))
                total = term.getCount ();
            else
                count += term.getCount ();
        }
        assertEquals (count, total);

        Map <String, Integer> uiTermMap = new HashMap <String, Integer> ();
        for (Term term : uiTerms)
            if (!term.getTerm ().equals (CourseType.allTypes.name ()))
                uiTermMap.put (term.getTerm (), term.getCount ());

        assertEquals (uiTermMap.size (), svcTerms.size ());
        for (int i = 0; i < svcTerms.size (); ++i) {
            int actual = uiTermMap.get (svcTerms.get (i).getTerm ());
            assertNotNull (actual);
            assertEquals (actual, svcTerms.get (i).getCount ());
        }
    }

    protected void verifyPriceCount (List <Range> uiRanges, List <Range> svcRanges) {
        assertEquals (uiRanges.size (), svcRanges.size ());
        for (int i = 0; i < svcRanges.size (); ++i) {
            Range uiRange = uiRanges.get (i);
            Range svcRange = svcRanges.get (i);
            assertEquals (uiRange.getFrom (), svcRange.getFrom ());
            assertEquals (uiRange.getTo (), svcRange.getTo ());
            assertEquals (uiRange.getCount (), svcRange.getCount ());
        }
    }

    protected void deleteMyGoals () {
        TestHelper.deleteMyGoals (getCookies ());
    }

    protected Result setMyGoals (String rOnet) {
        TestHelper.setMyGoals (getCookies (), rOnet);
        return getUserGoals ().get (0);
    }

    protected List <Result> setMyGoals () {
        List <Cookie> cookies = getCookies ();
        TestHelper.deleteMyGoals (cookies);
        List <String> rOnets = new ArrayList <String> ();
        rOnets.add ("11-2021.92"); // Product Manager
        rOnets.add ("11-9111.00"); // Healthcare Administrator
        rOnets.add ("11-3121.92"); // Human Resources Manager
        rOnets.add ("29-1122.00"); // Occupational Therapist
        rOnets.add ("15-1134.91"); // Web Designer
        rOnets.add ("47-5012.00"); // Driller / Drill Operator
        TestHelper.setMyGoals (cookies, rOnets);
        return getUserGoals ();
    }

    protected Result getGoalByName (List <Result> goals, String name) {
        for (Result goal : goals)
            if (goal.getName ().equalsIgnoreCase (name))
                return goal;
        return null;
    }

    protected void deleteMySkills () {
        List <Cookie> cookies = getCookies ();
        String profile = TestHelper.getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + tenant + "/users/" + profile + "/lists";
        try {
            Queue list = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Queue.class);
            for (ListItem listItem : list.getList ()) {
                if (listItem.getListType ().equals (SKILL.name ())) {
                    listItem.setListItems (null);
                    String response = CareerHttpClient.postUrl (url, new Gson ().toJson (listItem), cookies);
                    Logging.info ("resetting skills for user: " + profile + ", status: " + response);
                }
            }
        } catch (Exception e) {
            // Expecting 404 Not Found, no saved skills
            Logging.error (e.getMessage ());
        }
    }

    private List <Result> getUserGoals () {
        List <Cookie> cookies = getCookies ();
        String url = CareerEnvironment.baseUrl + "/api/labormarket-service/1/" + tenant + "/users/";
        url += TestHelper.getUserProfileId (cookies) + "/jobCodes";
        Jobs result = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Jobs.class);
        return result.getResults ();
    }
}
