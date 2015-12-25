package com.aptimus.careers.ui.login;

import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.WebElement;
import com.aptimus.careers.ui.MainCareer;

public class Mailinator extends MainCareer {

    public List <String> getEmailSubjects (String email) {
        navigateTo ("http://mailinator.com/");

        setText ("div.input-append input", email);
        click ("btn.btn.btn-success");

        List <String> emailSubjects = new ArrayList <String> ();
        for (WebElement e : waitForElementsVisible ("div.subject")) {
            emailSubjects.add (e.getText ());
        }

        return emailSubjects;
    }
}
