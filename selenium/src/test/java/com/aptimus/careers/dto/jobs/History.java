package com.aptimus.careers.dto.jobs;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class History {

    private Date   searchTime;
    private String searchType;
    private String searchValue;
    private String tenantName;
    private int    ageInSec;

    public void setSearchTime (Date searchTime) {
        this.searchTime = searchTime;
    }

    public Date getSearchTime () {
        return this.searchTime;
    }

    public void setSearchType (String searchType) {
        this.searchType = searchType;
    }

    public String getSearchType () {
        return this.searchType;
    }

    public void setSearchValue (String searchValue) {
        this.searchValue = searchValue;
    }

    public String getSearchValue () {
        return this.searchValue;
    }

    public void setTenantName (String tenantName) {
        this.tenantName = tenantName;
    }

    public String getTenantName () {
        return this.tenantName;
    }

    public void setAgeInSec (int ageInSec) {
        this.ageInSec = ageInSec;
    }

    public int getAgeInSec () {
        return this.ageInSec;
    }

    public class Searches {

        private List <Map <String, String>> searches = new ArrayList <Map <String, String>> ();

        public void setSearches (List <Map <String, String>> searches) {
            this.searches = searches;
        }

        public List <Map <String, String>> getSearches () {
            return this.searches;
        }
    }
}
