package com.aptimus.careers.dto.jobs;

import java.util.ArrayList;
import java.util.List;

public class JobSearchRequest {

    private List <String> companyFilter;
    private List <String> eduLevelFilter;
    private List <String> experienceLevel;
    private Boolean       getLinkedInConnections;
    private List <String> industryFilter;
    private List <String> jobCode;
    private List <String> jobTitle;
    private List <String> jobType;
    private List <String> keywords;
    private List <String> keywordsCompany;
    private List <String> keywordsTitle;
    private String        location;
    private List <String> locationFilter;
    private String        minEducationLevel;
    private Integer       pageNumber;
    private String        pageSize;
    private Boolean       preferredPartner;
    private String        profileId;
    private List <String> programFilter;
    private List <String> programCode;
    private String        radius;
    private List <String> salaryFrequency;
    private List <String> salaryRange;
    private String        sortBy;
    private Boolean       tuitionReimbursement;

    public void setCompany (String company) {
        if (this.companyFilter == null)
            this.companyFilter = new ArrayList <String> ();
        this.companyFilter.add (company);
    }

    public List <String> getCompany () {
        return this.companyFilter;
    }

    public boolean delCompany (String company) {
        return this.companyFilter.remove (company);
    }

    public void setEduLevelFilter (String eduLevelFilter) {
        if (this.eduLevelFilter == null)
            this.eduLevelFilter = new ArrayList <String> ();
        this.eduLevelFilter.add (eduLevelFilter);
    }

    public List <String> getEduLevelFilter () {
        return this.eduLevelFilter;
    }

    public boolean delEduLevelFilter (String eduLevelFilter) {
        return this.eduLevelFilter.remove (eduLevelFilter);
    }

    public void setExperienceLevel (String experienceLevel) {
        if (this.experienceLevel == null)
            this.experienceLevel = new ArrayList <String> ();
        this.experienceLevel.add (experienceLevel);
    }

    public List <String> getExperienceLevel () {
        return this.experienceLevel;
    }

    public boolean delExperienceLevel (String experienceLevel) {
        return this.experienceLevel.remove (experienceLevel);
    }

    public void setGetLinkedInConnections (Boolean getLinkedInConnections) {
        this.getLinkedInConnections = getLinkedInConnections;
    }

    public Boolean getGetLinkedInConnections () {
        return this.getLinkedInConnections;
    }

    public void setIndustry (String industry) {
        if (this.industryFilter == null)
            this.industryFilter = new ArrayList <String> ();
        this.industryFilter.add (industry);
    }

    public List <String> getIndustry () {
        return this.industryFilter;
    }

    public boolean delIndustry (String industry) {
        return this.industryFilter.remove (industry);
    }

    public void setJobCode (List <String> jobCode) {
        this.jobCode = jobCode;
    }

    public void setJobCode (String jobCode) {
        if (this.jobCode == null)
            this.jobCode = new ArrayList <String> ();
        this.jobCode.add (jobCode);
    }

    public List <String> getJobCode () {
        return this.jobCode;
    }

    public String getJobCode (int index) {
        return this.jobCode.get (index);
    }

    public void setJobTitle (List <String> jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setJobTitle (String jobTitle) {
        if (this.jobTitle == null)
            this.jobTitle = new ArrayList <String> ();
        this.jobTitle.add (jobTitle);
    }

    public List <String> getJobTitle () {
        return this.jobTitle;
    }

    public String getJobTitle (int index) {
        return this.jobTitle.get (index);
    }

    public void setJobType (List <String> jobType) {
        this.jobType = jobType;
    }

    public void setJobType (String jobType) {
        if (this.jobType == null)
            this.jobType = new ArrayList <String> ();
        this.jobType.add (jobType);
    }

    public List <String> getJobType () {
        return this.jobType;
    }

    public String getJobType (int index) {
        return this.jobType.get (index);
    }

    public void setKeywords (List <String> keywords) {
        this.keywords = keywords;
    }

    public void setKeywords (String keyword) {
        if (this.keywords == null)
            this.keywords = new ArrayList <String> ();
        this.keywords.add (keyword);
    }

    public List <String> getKeywords () {
        return this.keywords;
    }

    public String getKeyword (int index) {
        return this.keywords.get (index);
    }

    public void setKeywordsCompany (List <String> keywordsCompany) {
        this.keywordsCompany = keywordsCompany;
    }

    public void setKeywordCompany (String keywordsCompany) {
        if (this.keywordsCompany == null)
            this.keywordsCompany = new ArrayList <String> ();
        this.keywordsCompany.add (keywordsCompany);
    }

    public List <String> getKeywordsCompany () {
        return this.keywordsCompany;
    }

    public String getKeywordCompany (int index) {
        return this.keywordsCompany.get (index);
    }

    public void setKeywordsTitle (List <String> keywordsTitle) {
        this.keywordsTitle = keywordsTitle;
    }

    public void setKeywordTitle (String keyword) {
        if (this.keywordsTitle == null)
            this.keywordsTitle = new ArrayList <String> ();
        this.keywordsTitle.add (keyword);
    }

    public List <String> getKeywordsTitle () {
        return this.keywordsTitle;
    }

    public String getKeywordTitle (int index) {
        return this.keywordsTitle.get (index);
    }

    public void setLocation (String location) {
        this.location = location;
    }

    public String getLocation () {
        return this.location;
    }

    public void setLocationFilter (String locationFilter) {
        if (this.locationFilter == null)
            this.locationFilter = new ArrayList <String> ();
        this.locationFilter.add (locationFilter);
    }

    public List <String> getLocationFilter () {
        return this.locationFilter;
    }

    public boolean delLocationFilter (String locationFilter) {
        return this.locationFilter.remove (locationFilter);
    }

    public void setMinEducationLevel (String minEducationLevel) {
        this.minEducationLevel = minEducationLevel;
    }

    public String getMinEducationLevel () {
        return this.minEducationLevel;
    }

    public void setPageNumber (Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Integer getPageNumber () {
        return this.pageNumber;
    }

    public void setPageSize (String pageSize) {
        this.pageSize = pageSize;
    }

    public String getPageSize () {
        return this.pageSize;
    }

    public void setPreferredPartner (Boolean preferredPartner) {
        this.preferredPartner = preferredPartner;
    }

    public Boolean getPreferredPartner () {
        return this.preferredPartner;
    }

    public void setProfileId (String profileId) {
        this.profileId = profileId;
    }

    public String getProfileId () {
        return this.profileId;
    }

    public void setProgram (String program) {
        if (this.programFilter == null)
            this.programFilter = new ArrayList <String> ();
        this.programFilter.add (program);
    }

    public List <String> getProgram () {
        return this.programFilter;
    }

    public boolean delProgram (String program) {
        return this.programFilter.remove (program);
    }

    public void setProgramCode (List <String> programCode) {
        this.programCode = programCode;
    }

    public void setProgramCode (String programCode) {
        if (this.programCode == null)
            this.programCode = new ArrayList <String> ();
        this.programCode.add (programCode);
    }

    public List <String> getProgramCode () {
        return this.programCode;
    }

    public String getProgramCode (int index) {
        return this.programCode.get (index);
    }

    public void setRadius (String radius) {
        this.radius = radius;
    }

    public String getRadius () {
        return this.radius;
    }

    public void setSalaryFrequency (List <String> salaryFrequency) {
        this.salaryFrequency = salaryFrequency;
    }

    public void setSalaryFrequency (String salaryFrequency) {
        if (this.salaryFrequency == null)
            this.salaryFrequency = new ArrayList <String> ();
        this.salaryFrequency.add (salaryFrequency);
    }

    public List <String> getSalaryFrequency () {
        return this.salaryFrequency;
    }

    public String getSalaryFrequency (int index) {
        return this.salaryFrequency.get (index);
    }

    public void setSalaryRange (List <String> salaryRange) {
        this.salaryRange = salaryRange;
    }

    public void setSalaryRange (String salaryRange) {
        if (this.salaryRange == null)
            this.salaryRange = new ArrayList <String> ();
        this.salaryRange.add (salaryRange);
    }

    public List <String> getSalaryRange () {
        return this.salaryRange;
    }

    public String getSalaryRange (int index) {
        return this.salaryRange.get (index);
    }

    public void setSortBy (String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortBy () {
        return this.sortBy;
    }

    public void setTuitionReimbursement (Boolean tuitionReimbursement) {
        this.tuitionReimbursement = tuitionReimbursement;
    }

    public Boolean getTuitionReimbursement () {
        return this.tuitionReimbursement;
    }
}
