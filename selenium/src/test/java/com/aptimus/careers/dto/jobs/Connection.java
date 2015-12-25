package com.aptimus.careers.dto.jobs;

public class Connection {

    private String userConnectionId;
    private String profileId;
    private String providerId;
    private String companyId;
    private String connectionUsername;
    private String connectionToken;
    private String tenantName;
    private String connectionStatus;

    public void setUserConnectionId (String userConnectionId) {
        this.userConnectionId = userConnectionId;
    }

    public String getUserConnectionId () {
        return this.userConnectionId;
    }

    public void setProfileId (String profileId) {
        this.profileId = profileId;
    }

    public String getProfileId () {
        return this.profileId;
    }

    public void setProviderId (String providerId) {
        this.providerId = providerId;
    }

    public String getProviderId () {
        return this.providerId;
    }

    public void setCompanyId (String companyId) {
        this.companyId = companyId;
    }

    public String getCompanyId () {
        return this.companyId;
    }

    public void setConnectionUsername (String connectionUsername) {
        this.connectionUsername = connectionUsername;
    }

    public String getConnectionUsername () {
        return this.connectionUsername;
    }

    public void setConnectionToken (String connectionToken) {
        this.connectionToken = connectionToken;
    }

    public String getConnectionToken () {
        return this.connectionToken;
    }

    public void setTenantName (String tenantName) {
        this.tenantName = tenantName;
    }

    public String getTenantName () {
        return this.tenantName;
    }

    public void setConnectionStatus (String connectionStatus) {
        this.connectionStatus = connectionStatus;
    }

    public String getConnectionStatus () {
        return this.connectionStatus;
    }
}
