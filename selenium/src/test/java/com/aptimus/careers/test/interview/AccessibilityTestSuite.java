package com.aptimus.careers.test.interview;

import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;
import com.aptimus.careers.ui.MainCareer;
import com.aptimus.careers.ui.interview.Questions;

@Test (groups = { "Accessibility" })
public class AccessibilityTestSuite extends InterviewTestBase {

    public void interview () {
        Questions interview = new MainCareer ().gotoInterviewPreparation ();
        assertTrue (interview.areAllModulesPresent ());
        assertTrue (interview.accessibilityTest ());

        assertTrue (interview.searchQuestion ("future"));
        assertTrue (interview.isSearchResultPresent ());
        assertTrue (interview.accessibilityTest ());
    }
}
