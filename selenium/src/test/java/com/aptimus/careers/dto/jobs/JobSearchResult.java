package com.aptimus.careers.dto.jobs;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class JobSearchResult {

    private String                          sortBy;
    private boolean                         getLinkedInConnections;
    private boolean                         radiusUsed;
    private Jobs                            jobs;
    private List <FacetField>               facetFields;
    private List <FacetRange>               facetRanges;
    private List <HashMap <String, String>> searches = new ArrayList <HashMap <String, String>> ();

    public void setSortBy (String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortBy () {
        return this.sortBy;
    }

    public void setLinkedInConnections (boolean getLinkedInConnections) {
        this.getLinkedInConnections = getLinkedInConnections;
    }

    public boolean getLinkedInConnections () {
        return this.getLinkedInConnections;
    }

    public void setRadiusUsed (boolean radiusUsed) {
        this.radiusUsed = radiusUsed;
    }

    public boolean getRadiusUsed () {
        return this.radiusUsed;
    }

    public void setJobs (Jobs jobs) {
        this.jobs = jobs;
    }

    public void setSearches (List <HashMap <String, String>> searches) {
        this.searches = searches;
    }

    public void setSearches (HashMap <String, String> search) {
        this.searches.add (search);
    }

    public HashMap <String, String> getSearch (int idx) {
        return this.searches.get (idx);
    }

    public List <HashMap <String, String>> getSearches () {
        return this.searches;
    }

    public Jobs getJobs () {
        return this.jobs;
    }

    public void setFacetFields (List <FacetField> facetField) {
        this.facetFields = facetField;
    }

    public List <FacetField> getFacetFields () {
        return this.facetFields;
    }

    public void setFacetRanges (List <FacetRange> facetRange) {
        this.facetRanges = facetRange;
    }

    public List <FacetRange> getFacetRanges () {
        return this.facetRanges;
    }

    public class Jobs {

        private int           numberOfElements;
        private int           totalPages;
        private int           totalNumberOfResults;
        private int           pageNumber;
        private int           pageSize;
        private List <Result> results = new ArrayList <Result> ();

        public void setNumberOfElements (int numberOfElements) {
            this.numberOfElements = numberOfElements;
        }

        public int getNumberOfElements () {
            return this.numberOfElements;
        }

        public void setTotalPages (int totalPages) {
            this.totalPages = totalPages;
        }

        public int getTotalPages () {
            return this.totalPages;
        }

        public void setTotalNumberOfResults (int totalNumberOfResults) {
            this.totalNumberOfResults = totalNumberOfResults;
        }

        public int getTotalNumberOfResults () {
            return this.totalNumberOfResults;
        }

        public void setPageNumber (int pageNumber) {
            this.pageNumber = pageNumber;
        }

        public int getPageNumber () {
            return this.pageNumber;
        }

        public void setPageSize (int pageSize) {
            this.pageSize = pageSize;
        }

        public int getPageSize () {
            return this.pageSize;
        }

        public void setResults (List <Result> results) {
            this.results = results;
        }

        public void setResult (Result result) {
            this.results.add (result);
        }

        public List <Result> getResults () {
            return this.results;
        }

        public Result getResult (int index) {
            return this.results.get (index);
        }
    }

    public static class Result {

        private Job     job;
        private boolean preferredPartner;
        private boolean tuitionReimbursement;
        private int     totalLinkedInConnections;
        private String  listId;
        private String  listItemId;
        private boolean applied;
        private boolean isSaved;
        // for Skill Builder
        private String  name;
        private String  jobCodeType;
        private String  id;
        // for ATS
        private boolean atsTracked;
        private String  companyId;
        private String  jobId;
        private String  jobTitle;
        private String  company;
        private String  location;

        public void setJob (Job job) {
            this.job = job;
        }

        public Job getJob () {
            return this.job;
        }

        public void setPreferredPartner (boolean preferredPartner) {
            this.preferredPartner = preferredPartner;
        }

        public boolean getPreferredPartner () {
            return this.preferredPartner;
        }

        public void setTuitionReimbursement (boolean tuitionReimbursement) {
            this.tuitionReimbursement = tuitionReimbursement;
        }

        public boolean getTuitionReimbursement () {
            return this.tuitionReimbursement;
        }

        public void setTotalLinkedInConnections (int totalLinkedInConnections) {
            this.totalLinkedInConnections = totalLinkedInConnections;
        }

        public int getTotalLinkedInConnections () {
            return this.totalLinkedInConnections;
        }

        public void setListId (String listId) {
            this.listId = listId;
        }

        public String getListId () {
            return this.listId;
        }

        public void setListItemId (String listItemId) {
            this.listItemId = listItemId;
        }

        public String getListItemId () {
            return this.listItemId;
        }

        public void setApplied (boolean applied) {
            this.applied = applied;
        }

        public boolean getApplied () {
            return this.applied;
        }

        public void setIsSaved (boolean isSaved) {
            this.isSaved = isSaved;
        }

        public boolean getIsSaved () {
            return this.isSaved;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setJobCodeType (String jobCodeType) {
            this.jobCodeType = jobCodeType;
        }

        public String getJobCodeType () {
            return this.jobCodeType;
        }

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }

        public void setAtsTracked (boolean atsTracked) {
            this.atsTracked = atsTracked;
        }

        public boolean isAtsTracked () {
            return this.atsTracked;
        }

        public void setCompanyId (String companyId) {
            this.companyId = companyId;
        }

        public String getCompanyId () {
            return this.companyId;
        }

        public void setJobId (String jobId) {
            this.jobId = jobId;
        }

        public String getJobId () {
            return this.jobId;
        }

        public void setJobTitle (String jobTitle) {
            this.jobTitle = jobTitle;
        }

        public String getJobTitle () {
            return this.jobTitle;
        }

        public void setCompany (String company) {
            this.company = company;
        }

        public String getCompany () {
            return this.company;
        }

        public void setLocation (String location) {
            this.location = location;
        }

        public String getLocation () {
            return this.location;
        }
    }

    public class FacetField {

        private String                 name;
        private List <FacetFieldValue> values = new ArrayList <FacetFieldValue> ();

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name.trim ();
        }

        public void setValues (List <FacetFieldValue> values) {
            this.values = values;
        }

        public void setValue (FacetFieldValue values) {
            this.values.add (values);
        }

        public List <FacetFieldValue> getValues () {
            return this.values;
        }

        public FacetFieldValue getResult (int index) {
            return this.values.get (index);
        }
    }

    public static class FacetFieldValue {

        private String name;
        private int    count;

        public FacetFieldValue (String name, int count) {
            this.name = name;
            this.count = count;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name.trim ();
        }

        public void setCount (int count) {
            this.count = count;
        }

        public int getCount () {
            return this.count;
        }
    }

    public class FacetRange {

        private String                 name;
        private List <FacetRangeCount> counts = new ArrayList <FacetRangeCount> ();

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setCounts (List <FacetRangeCount> counts) {
            this.counts = counts;
        }

        public List <FacetRangeCount> getCounts () {
            return this.counts;
        }
    }

    public class FacetRangeCount {

        private String value;
        private int    count;

        public void setValue (String value) {
            this.value = value;
        }

        public String getValue () {
            return this.value;
        }

        public void setCount (int count) {
            this.count = count;
        }

        public int getCount () {
            return this.count;
        }
    }
}
