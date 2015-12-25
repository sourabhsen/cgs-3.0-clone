package com.aptimus.careers.ui.resume.section;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import com.aptimus.careers.dto.resume.Contact;
import com.aptimus.careers.dto.resume.Contact.Phone;
import com.aptimus.careers.dto.resume.Contact.PostalAddress;
import com.aptimus.careers.ui.resume.EditView;
import com.aptimus.test.selenium.Logging;

public class ResumeContact extends EditView {

    private final String form = container + " section.contact-section";

    public boolean isContactPresent () {
        boolean status = scrollTo (waitForElementVisible (form)).isDisplayed ();
        status &= waitUntilVisible (form + " header h2#contact-heading");
        status &= waitUntilVisible (form + " div.section-content");
        return status;
    }

    public boolean enterContactDetails (Contact contact) {
        boolean status = true;
        if (contact.getFirstName () != null)
            status &= enterFirstname (contact.getFirstName ());

        if (contact.getLastName () != null)
            status &= enterLastname (contact.getLastName ());

        if (contact.getEmail () != null)
            status &= enterEmail (contact.getEmail ());

        if (contact.getPhone (0) != null)
            status &= enterPhone (contact.getPhone (0).getNumber ());

        if (contact.getPostalAddress () != null) {
            if (contact.getPostalAddress ().getAddressLine1 () != null)
                status &= enterAddressLine1 (contact.getPostalAddress ().getAddressLine1 ());

            if (contact.getPostalAddress ().getAddressLine2 () != null)
                status &= enterAddressLine2 (contact.getPostalAddress ().getAddressLine2 ());

            if (contact.getPostalAddress ().getCity () != null)
                status &= enterCity (contact.getPostalAddress ().getCity ());

            if (contact.getPostalAddress ().getState () != null)
                status &= enterState (contact.getPostalAddress ().getState ());

            if (contact.getPostalAddress ().getZipCode () != null)
                status &= enterZipcode (contact.getPostalAddress ().getZipCode ());
        }
        return status;
    }

    public boolean enterFirstname (String fname) {
        boolean status = click (form + " label[for='contact_input_1']");
        status &= setText (form + " input#contact_input_1", fname);
        if (!status)
            Logging.error ("can't enter contact first name");
        return status;
    }

    public boolean enterLastname (String lname) {
        boolean status = click (form + " label[for='contact_input_2']");
        status &= setText (form + " input#contact_input_2", lname);
        if (!status)
            Logging.error ("can't enter contact last name");
        return status;
    }

    public boolean enterEmail (String email) {
        boolean status = click (form + " label[for='contact_input_3']");
        status &= setText (form + " input#contact_input_3", email);
        if (!status)
            Logging.error ("can't enter contact email");
        return status;
    }

    public boolean enterPhone (String phone) {
        boolean status = click (form + " label[for='contact_input_4']");
        status &= setText (form + " input#contact_input_4", phone);
        if (!status)
            Logging.error ("can't enter contact phone");
        return status;
    }

    public boolean enterAddressLine1 (String line1) {
        boolean status = click (form + " label[for='contact_input_5']");
        status &= setText (form + " input#contact_input_5", line1);
        if (!status)
            Logging.error ("can't enter contact address1");
        return status;
    }

    public boolean enterAddressLine2 (String line2) {
        boolean status = click (form + " label[for='contact_input_6']");
        status &= setText (form + " input#contact_input_6", line2);
        if (!status)
            Logging.error ("can't enter contact address2");
        return status;
    }

    public boolean enterCity (String city) {
        boolean status = click (form + " label[for='contact_input_7']");
        status &= setText (form + " input#contact_input_7", city);
        if (!status)
            Logging.error ("can't enter contact city");
        return status;
    }

    public boolean enterState (String state) {
        boolean status = clickAndSelectValue (form + " select[name='contact.state']", "string:" + state);
        if (!status)
            Logging.error ("can't enter contact state");
        return status;
    }

    public boolean enterStateFreeForm (String state) {
        boolean status = click (form + " label[for='contact_input_81']");
        status &= setText (form + " input#contact_input_81", state);
        if (!status)
            Logging.error ("can't enter contact state");
        return status;
    }

    public boolean enterCountry (String country) {
        boolean status = clickAndSelectValue (form + " select[name='contact.country']", "string:" + country);
        if (!status)
            Logging.error ("can't enter contact country");
        return status;
    }

    public boolean enterZipcode (String zip) {
        boolean status = click (form + " label[for='contact_input_9']");
        status &= setText (form + " input#contact_input_9", zip);
        if (!status)
            Logging.error ("can't enter contact zipcode");
        return status;
    }

    public Contact getContact () {
        Contact contact = new Contact ();
        WebElement el = scrollTo (waitForElementVisible (form));
        contact.setFirstName (getAttribute (el, "input#contact_input_1", "value"));
        contact.setLastName (getAttribute (el, "input#contact_input_2", "value"));
        contact.setEmail (getAttribute (el, "input#contact_input_3", "value"));
        contact.setPhone (new Phone (getAttribute (el, "input#contact_input_4", "value")));

        PostalAddress address = new PostalAddress ();
        address.setAddressLine1 (getAttribute (el, "input#contact_input_5", "value"));
        address.setAddressLine2 (getAttribute (el, "input#contact_input_6", "value"));
        address.setCity (getAttribute (el, "input#contact_input_7", "value"));

        String st;
        if (isElementPresent (el, "input#contact_input_81[aria-hidden='false']"))
            st = getAttribute (el, "input#contact_input_81[aria-hidden='false']", "value");
        else
            st = new Select (waitForElement ("select[name='contact.state']")).getFirstSelectedOption ().getText ();
        address.setState (st);

        address.setZipCode (getAttribute (el, "input#contact_input_9", "value"));
        contact.setPostalAddress (address);
        return contact;
    }

    public String getEmailInfoTip () {
        hover (form + " a[popover-class='resume-info-tip-popover']");
        return waitForElementVisible (form + " div.resume-info-tips").getAttribute ("content");
    }
}
