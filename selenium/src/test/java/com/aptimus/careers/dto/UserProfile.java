package com.aptimus.careers.dto;

/**
 * url:
 * https://student.qa.aptimus.phoenix.edu/api/profile-service/1/uopx/profiles/9a74dfe8-ecd6-44d5-
 * 962d-0f82765c63ca?includeStudentPrograms=true
 * 
 * @author Harry Soehalim
 *         <a href="mailto:harry.soehalim@apollogrp.edu">harry.soehalim@apollogrp.edu</a>
 */
public class UserProfile {

    private String message;
    private String messageCode;
    private String errors;
    private User   profile;

    public void setMessage (String message) {
        this.message = message;
    }

    public String getMessage () {
        return this.message;
    }

    public void setMessageCode (String messageCode) {
        this.messageCode = messageCode;
    }

    public String getMessageCode () {
        return this.messageCode;
    }

    public void setErrors (String errors) {
        this.errors = errors;
    }

    public String getErrors () {
        return this.errors;
    }

    public void setProfile (User profile) {
        this.profile = profile;
    }

    public User getProfile () {
        return this.profile;
    }

    public static class User {

        private String         username;
        private String         password;
        private String         firstName;
        private StudentProgram studentPrograms;
        private String         profileId;
        private String         city;
        private String         state;
        private String         emailAddress;
        private String         home2EmailAddress;
        private String         businessEmailAddress;
        private String         status;
        private String         loginStatus;

        public User (String username, String password) {
            this.username = username;
            this.password = password;
        }

        public void setUsername (String username) {
            this.username = username;
        }

        public String getUsername () {
            return this.username;
        }

        public void setPassword (String password) {
            this.password = password;
        }

        public String getPassword () {
            return this.password;
        }

        public void setFirstName (String firstName) {
            this.firstName = firstName;
        }

        public String getFirstName () {
            return this.firstName;
        }

        public void setStudentPrograms (StudentProgram studentPrograms) {
            this.studentPrograms = studentPrograms;
        }

        public StudentProgram getStudentPrograms () {
            return this.studentPrograms;
        }

        public void setProfileId (String profileId) {
            this.profileId = profileId;
        }

        public String getProfileId () {
            return this.profileId;
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

        public void setEmailAddress (String emailAddress) {
            this.emailAddress = emailAddress;
        }

        public String getEmailAddress () {
            if (this.emailAddress == null)
                return this.businessEmailAddress == null ? this.home2EmailAddress : this.businessEmailAddress;
            else
                return this.emailAddress;
        }

        public void setHome2EmailAddress (String home2EmailAddress) {
            this.home2EmailAddress = home2EmailAddress;
        }

        public void setBusinessEmailAddress (String businessEmailAddress) {
            this.businessEmailAddress = businessEmailAddress;
        }

        public void setStatus (String status) {
            this.status = status;
        }

        public String getStatus () {
            return this.status;
        }

        public void setLoginStatus (String loginStatus) {
            this.loginStatus = loginStatus;
        }

        public String getLoginStatus () {
            return this.loginStatus;
        }
    }
}
