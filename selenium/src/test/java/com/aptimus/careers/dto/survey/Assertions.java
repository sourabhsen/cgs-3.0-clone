package com.aptimus.careers.dto.survey;

import java.util.ArrayList;
import java.util.List;

public class Assertions {

    private String                surveyName;
    private String                updatedOn;
    private String                updatedSince;
    private List <UserAssertions> userAssertions = new ArrayList <UserAssertions> ();

    public void setSurveyName (String surveyName) {
        this.surveyName = surveyName;
    }

    public String getSurveyName () {
        return this.surveyName;
    }

    public void setUpdatedOn (String updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getUpdatedOn () {
        return this.updatedOn;
    }

    public void setUpdatedSince (String updatedSince) {
        this.updatedSince = updatedSince;
    }

    public String getUpdatedSince () {
        return this.updatedSince;
    }

    public void setUserAssertions (List <UserAssertions> assertions) {
        this.userAssertions = assertions;
    }

    public void setUserAssertions (UserAssertions assertions) {
        this.userAssertions.add (assertions);
    }

    public List <UserAssertions> getUserAssertions () {
        return this.userAssertions;
    }

    public UserAssertions getUserAssertions (int idx) {
        return this.userAssertions.get (idx);
    }

    public static class UserAssertions {

        private String name;
        private String value;
        private String updatedOn;
        private String updatedSince;

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setValue (String value) {
            this.value = value;
        }

        public String getValue () {
            return this.value;
        }

        public void setUpdatedOn (String updatedOn) {
            this.updatedOn = updatedOn;
        }

        public String getUpdatedOn () {
            return this.updatedOn;
        }

        public void setUpdatedSince (String updatedSince) {
            this.updatedSince = updatedSince;
        }

        public String getUpdatedSince () {
            return this.updatedSince;
        }
    }
}
