package com.aptimus.careers.ui.skills.courses;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.dto.skill.SkilledUp.Author;
import com.aptimus.careers.dto.skill.SkilledUp.Course;
import com.aptimus.careers.dto.skill.SkilledUp.Offer;
import com.aptimus.careers.dto.skill.SkilledUp.Price;
import com.aptimus.careers.dto.skill.SkilledUp.Provider;

public class CourseList extends MainCourse {

    private final String results = "div#skills-courses-top section.skill-course-listing > article";
    private final String item    = results + "[data-course-id='%s']";

    public Course getCourse (int idx) {
        return parseCourseEl (waitForElementVisible (results + ":nth-child(" + idx + ")"));
    }

    public List <Course> getCourses () {
        List <Course> courses = new ArrayList <Course> ();
        if (!isElementPresent ("p.course-result-error"))
            for (WebElement el : waitForElementsVisible (results))
                courses.add (parseCourseEl (scrollTo (el)));
        return courses;
    }

    private Course parseCourseEl (WebElement aCourse) {
        Course course = new Course ();
        course.setId (aCourse.getAttribute ("data-course-id"));;
        course.setProvider (new Provider (getText (aCourse, "div.course-info > h3")));
        course.setName (getText (aCourse, "div.course-info > h2"));

        String desc = getText (aCourse, "div.course-info > p").replace ("... Read more", "");
        if (isElementPresent (aCourse, "div.course-info > p span.ng-hide[aria-hidden='true']")) {
            String more = "div.course-info > p span[aria-hidden='true']";
            desc += aCourse.findElement (By.cssSelector (more)).getAttribute ("textContent");
        }
        course.setDescription (desc.replace ("View less", ""));
        course.setOffers (Arrays.asList (new Offer (new Price (getText (aCourse, "div.course-price")))));

        String detailTime = "li[ng-if='course.durationDisplay']";
        if (isElementPresent (aCourse, detailTime))
            course.setDurationDisplay (getText (aCourse, detailTime));

        String detailTrainer = "li[ng-if='course.author.name']";
        if (isElementPresent (aCourse, detailTrainer))
            course.setAuthor (new Author (getText (aCourse, detailTrainer)));

        return course;
    }

    public boolean clickTakeCourse (Course course) {
        String originalHandle = getDriver ().getWindowHandle ();
        boolean status = click (String.format (item, course.getId ()) + " a.course-link");
        for (String handle : getDriver ().getWindowHandles ()) {
            if (!handle.equals (originalHandle))
                getDriver ().switchTo ().window (handle).close ();
        }
        getDriver ().switchTo ().window (originalHandle);

        return status;
    }
}
