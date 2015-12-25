package com.aptimus.careers.dto.jobs;

import java.util.Date;

public class Activity {

    private String jobActivityId;
    private String activityId;
    private String jobId;
    private String userIdentifier;
    private String activityValue;
    private String activityName;
    private String tenantName;
    private String serviceName;
    private String pageName;
    private String pageNameDetail;
    private Date   createDate;

    public void setJobActivityId (String jobActivityId) {
        this.jobActivityId = jobActivityId;
    }

    public String getJobActivityId () {
        return this.jobActivityId;
    }

    public void setActivityId (String activityId) {
        this.activityId = activityId;
    }

    public String getActivityId () {
        return this.activityId;
    }

    public void setJobId (String jobId) {
        this.jobId = jobId;
    }

    public String getJobId () {
        return this.jobId;
    }

    public void setUserIdentifier (String userIdentifier) {
        this.userIdentifier = userIdentifier;
    }

    public String getUserIdentifier () {
        return this.userIdentifier;
    }

    public void setActivityValue (String activityValue) {
        this.activityValue = activityValue;
    }

    public String getActivityValue () {
        return this.activityValue;
    }

    public void setActivityName (String activityName) {
        this.activityName = activityName;
    }

    public String getActivityName () {
        return this.activityName;
    }

    public void setTenantName (String tenantName) {
        this.tenantName = tenantName;
    }

    public String getTenantName () {
        return this.tenantName;
    }

    public void setServiceName (String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceName () {
        return this.serviceName;
    }

    public void setPageName (String pageName) {
        this.pageName = pageName;
    }

    public String getPageName () {
        return this.pageName;
    }

    public void setPageNameDetail (String pageNameDetail) {
        this.pageNameDetail = pageNameDetail;
    }

    public String getPageNameDetail () {
        return this.pageNameDetail;
    }

    public void setCreateDate (Date createDate) {
        this.createDate = createDate;
    }

    public Date getCreateDate () {
        return this.createDate;
    }
}
