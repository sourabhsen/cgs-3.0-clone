package com.aptimus.careers.dto.jobs;

public class Alert {

    private String     userNotificationId;
    private String     notificationScheduleName;
    private String     userNotificationTitle;
    private String     status;
    private String     queryString;
    private Attributes attributes;

    public void setUserNotificationId (String userNotificationId) {
        this.userNotificationId = userNotificationId;
    }

    public String getUserNotificationId () {
        return this.userNotificationId;
    }

    public void setNotificationScheduleName (String notificationScheduleName) {
        this.notificationScheduleName = notificationScheduleName;
    }

    public String getNotificationScheduleName () {
        return this.notificationScheduleName;
    }

    public void setUserNotificationTitle (String userNotificationTitle) {
        this.userNotificationTitle = userNotificationTitle;
    }

    public String getUserNotificationTitle () {
        return this.userNotificationTitle;
    }

    public void setStatus (String status) {
        this.status = status;
    }

    public String getStatus () {
        return this.status;
    }

    public void setQueryString (String queryString) {
        this.queryString = queryString;
    }

    public String getQueryString () {
        return this.queryString;
    }

    public void setAttributes (Attributes attributes) {
        this.attributes = attributes;
    }

    public Attributes getAttributes () {
        return this.attributes;
    }

    public static class Attributes {

        private String alertUri;
        private String emailAddressProfile;
        private String emailAddressUserDefined;

        public void setAlertUri (String alertUri) {
            this.alertUri = alertUri;
        }

        public String getAlertUri () {
            return this.alertUri;
        }

        public void setEmailAddressProfile (String emailAddressProfile) {
            this.emailAddressProfile = emailAddressProfile;
        }

        public String getEmailAddressProfile () {
            return this.emailAddressProfile;
        }

        public void setEmailAddressUserDefined (String emailAddressUserDefined) {
            this.emailAddressUserDefined = emailAddressUserDefined;
        }

        public String getEmailAddressUserDefined () {
            return this.emailAddressUserDefined;
        }
    }
}
