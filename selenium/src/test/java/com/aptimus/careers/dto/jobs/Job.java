package com.aptimus.careers.dto.jobs;

import java.util.Date;
import org.apache.commons.lang3.StringEscapeUtils;

public class Job {

    private String   jobId;
    private String   companyName;
    private String   providerCompanyName;
    private String   title;
    private String   description;
    private String   status;
    private boolean  publicIndustry;
    private Date     postingDate;
    private int      ageInSeconds;
    private Salary   salary;
    private String   category;
    private String   fullTime;
    private Location location = new Location ();
    private String   applicationStatus;
    private boolean  isPreferredPartner;
    private boolean  isTuitionReimbursed;
    private boolean  isAutoTracked;
    private String   atsId;
    private String   linkToDetailsPage;
    private String   linkToAtsLogin;
    private Date     appliedDate;
    private boolean  expired;

    public void setJobId (String id) {
        this.jobId = id;
    }

    public String getJobId () {
        return this.jobId;
    }

    public void setCompanyName (String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyName () {
        if (this.companyName == null || this.companyName.isEmpty ())
            return StringEscapeUtils.unescapeHtml4 (this.providerCompanyName).trim ()
                    .replace ("\n", " ").replace ("&apos;", "'").replaceAll ("\\s+", " ");
        else
            return StringEscapeUtils.unescapeHtml4 (this.companyName).trim ()
                    .replace ("\n", " ").replace ("&apos;", "'").replaceAll ("\\s+", " ");
    }

    public void setProviderCompanyName (String providerCompanyName) {
        this.providerCompanyName = providerCompanyName;
    }

    public String getProviderCompanyName () {
        return StringEscapeUtils.unescapeHtml4 (this.providerCompanyName)
                .replace ("\n", " ").replace ("&apos;", "'").replaceAll ("\\s+", " ").trim ();
    }

    public void setTitle (String title) {
        this.title = title;
    }

    public String getTitle () {
        return StringEscapeUtils.unescapeHtml4 (this.title)
                .replace ("\n", " ").replace ("&apos;", "'").replaceAll ("\\s+", " ").trim ();
    }

    public void setDescription (String description) {
        this.description = description;
    }

    public String getDescription () {
        return StringEscapeUtils.unescapeHtml4 (this.description).replaceAll ("[\\s\u00A0]+", "")
                .replace ("&apos;", "'").replace ("&reg;", "").replace ("&trade;", "")
                .replace ("&mdash;", "-").replaceAll ("([\u2013]|[\u2014])+", "-").replace ("&ndash;", "-");
    }

    public void setStatus (String status) {
        this.status = status;
    }

    public String getStatus () {
        return StringEscapeUtils.unescapeHtml4 (this.status)
                .replace ("\n", " ").replace ("&apos;", "'").replaceAll ("\\s+", " ").trim ();
    }

    public void setPublicIndustry (boolean publicIndustry) {
        this.publicIndustry = publicIndustry;
    }

    public boolean getPublicIndustry () {
        return this.publicIndustry;
    }

    public void setPostingDate (Date postingDate) {
        this.postingDate = postingDate;
    }

    public Date getPostingDate () {
        return this.postingDate;
    }

    public void setAgeInSeconds (int ageInSeconds) {
        this.ageInSeconds = ageInSeconds;
    }

    public int getAgeInSeconds () {
        return this.ageInSeconds;
    }

    public void setSalary (Salary salary) {
        this.salary = salary;
    }

    public Salary getSalary () {
        return this.salary;
    }

    public void setCategory (String category) {
        this.category = category;
    }

    public String getCategory () {
        return this.category;
    }

    public void setFullTime (String fullTime) {
        this.fullTime = fullTime;
    }

    public String getFullTime () {
        return this.fullTime;
    }

    public void setLocation (Location location) {
        this.location = location;
    }

    public Location getLocation () {
        return this.location;
    }

    public void setAppStatus (String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public String getAppStatus () {
        return this.applicationStatus;
    }

    public void setPreferredPartner (boolean isPreferredPartner) {
        this.isPreferredPartner = isPreferredPartner;
    }

    public boolean isPreferredPartner () {
        return this.isPreferredPartner;
    }

    public void setTuitionReimbursed (boolean isTuitionReimbursed) {
        this.isTuitionReimbursed = isTuitionReimbursed;
    }

    public boolean isTuitionReimbursed () {
        return this.isTuitionReimbursed;
    }

    public void setAutoTracked (boolean isAutoTracked) {
        this.isAutoTracked = isAutoTracked;
    }

    public boolean isAutoTracked () {
        return this.isAutoTracked;
    }

    public void setAtsId (String atsId) {
        this.atsId = atsId;
    }

    public String getAtsId () {
        return this.atsId;
    }

    public void setLinkToDetailsPage (String link) {
        this.linkToDetailsPage = link;
    }

    public String getLinkToDetailsPage () {
        return this.linkToDetailsPage;
    }

    public void setLinkToAtsLogin (String link) {
        this.linkToAtsLogin = link;
    }

    public String getAtsLoginLink () {
        return this.linkToAtsLogin;
    }

    public void setAppliedDate (Date appliedDate) {
        this.appliedDate = appliedDate;
    }

    public Date getAppliedDate () {
        return this.appliedDate;
    }

    public void setExpired (boolean expired) {
        this.expired = expired;
    }

    public boolean isExpired () {
        return this.expired;
    }

    public static class Salary {

        private String minimum;
        private String maximum;

        public void setMinimum (String minimum) {
            this.minimum = minimum;
        }

        public String getMinimum () {
            return this.minimum;
        }

        public void setMaximum (String maximum) {
            this.maximum = maximum;
        }

        public String getMaximum () {
            return this.maximum;
        }
    }

    public static class Location {

        private String address1;
        private String City;
        private String city;
        private String State;
        private String state;
        private String country;
        private String postal;
        private String latitude;
        private String longitude;

        public Location () {}

        public Location (String city, String state) {
            setCity (city);
            setState (state);
        }

        public void setAddress1 (String address1) {
            this.address1 = address1;
        }

        public String getAddress1 () {
            return this.address1;
        }

        public void setCity (String city) {
            this.City = city;
            this.city = city;
        }

        public String getCity () {
            String city = this.city != null ? this.city.replaceAll ("\\s+", " ") : this.city;
            String City = this.City != null ? this.City.replaceAll ("\\s+", " ") : this.City;
            return City == null ? city : City;
        }

        public void setState (String state) {
            this.State = state;
            this.state = state;
        }

        public String getState () {
            return this.State == null ? this.state : this.State;
        }

        public void setCountry (String country) {
            this.country = country;
        }

        public String getCountry () {
            return this.country;
        }

        public void setPostal (String postal) {
            this.postal = postal;
        }

        public String getPostal () {
            return this.postal;
        }

        public void setLatitude (String latitude) {
            this.latitude = latitude;
        }

        public String getLatitude () {
            return this.latitude;
        }

        public void setLongitude (String longitude) {
            this.longitude = longitude;
        }

        public String getLongitude () {
            return this.longitude;
        }
    }
}
