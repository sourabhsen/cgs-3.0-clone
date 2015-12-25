package com.aptimus.careers.dto.resume;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sudheer Ananthaiah
 *         <a href="mailto:sudheer.ananthaiah@apollogrp.edu">sudheer.ananthaiah@apollogrp.edu</a>
 */
public class Contact {

    private String        firstName;
    private String        middleName;
    private String        lastName;
    private String        emailAddress;
    private String        webSite;
    private PostalAddress postalAddress;
    private List <Phone>  phones = new ArrayList <Phone> ();

    public void setFirstName (String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName () {
        return this.firstName;
    }

    public void setMiddleName (String middleName) {
        this.middleName = middleName;
    }

    public String getMiddleName () {
        return this.middleName;
    }

    public void setLastName (String lastName) {
        this.lastName = lastName;
    }

    public String getLastName () {
        return this.lastName;
    }

    public void setPostalAddress (PostalAddress postalAddress) {
        this.postalAddress = postalAddress;
    }

    public PostalAddress getPostalAddress () {
        return this.postalAddress;
    }

    public void setPhones (List <Phone> phone) {
        this.phones = phone;
    }

    public void setPhone (Phone phone) {
        this.phones.add (phone);
    }

    public List <Phone> getPhones () {
        return this.phones;
    }

    public Phone getPhone (int idx) {
        return this.phones.get (idx);
    }

    public void setEmail (String email) {
        this.emailAddress = email;
    }

    public String getEmail () {
        return this.emailAddress;
    }

    public void setWebSite (String webSite) {
        this.webSite = webSite;
    }

    public String getWebSite () {
        return this.webSite;
    }

    public static class PostalAddress {

        private String line1;
        private String line2;
        private String city;
        private String state;
        private String postalCode;
        private String country;

        public PostalAddress () {};

        public PostalAddress (String city, String state) {
            this.city = city;
            this.state = state;
        }

        public void setAddressLine1 (String addressLine1) {
            this.line1 = addressLine1;
        }

        public String getAddressLine1 () {
            return this.line1;
        }

        public void setAddressLine2 (String addressLine2) {
            this.line2 = addressLine2;
        }

        public String getAddressLine2 () {
            return this.line2;
        }

        public void setCity (String city) {
            this.city = city;
        }

        public String getCity () {
            return this.city;
        }

        public void setState (String state) {
            this.state = state;
        }

        public String getState () {
            return this.state;
        }

        public void setZipCode (String postalCode) {
            this.postalCode = postalCode;
        }

        public String getZipCode () {
            return this.postalCode;
        }

        public void setCountry (String country) {
            this.country = state;
        }

        public String getCountry () {
            return this.country;
        }
    }

    public static class Phone {

        private String extension;
        private String type;
        private String number;

        public Phone (String number) {
            this.number = number;
        }

        public void setExtension (String extension) {
            this.extension = extension;
        }

        public String getExtension () {
            return this.extension;
        }

        public void setType (String type) {
            this.type = type;
        }

        public String getType () {
            return this.type;
        }

        public void setNumber (String number) {
            this.number = number;
        }

        public String getNumber () {
            return this.number;
        }
    }
}
