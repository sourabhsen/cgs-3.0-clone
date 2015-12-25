package com.aptimus.careers.dto.explorer;

import java.util.List;

public class BurningGlass {

    private String            noOfJobsOpenings;
    private String            salaryRange;
    private String            salaryTrendMin;
    private String            salaryTrendMax;
    private String            salaryTrendRealTimeMin;
    private String            salaryTrendRealTimeMax;
    private List <JobCode>    jobCodes;
    private List <FamilyName> familyNames;
    private List <Program>    tenantDegrees;
    private List <Program>    generalDegrees;

    public void setNoOfJobsOpenings (String noOfJobsOpenings) {
        this.noOfJobsOpenings = noOfJobsOpenings;
    }

    public String getNoOfJobsOpenings () {
        return this.noOfJobsOpenings;
    }

    public void setSalaryRange (String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public String getSalaryRange () {
        return this.salaryRange;
    }

    public void setSalaryTrendMin (String salaryTrendMin) {
        this.salaryTrendMin = salaryTrendMin;
    }

    public String getSalaryTrendMin () {
        return this.salaryTrendMin;
    }

    public void setSalaryTrendMax (String salaryTrendMax) {
        this.salaryTrendMax = salaryTrendMax;
    }

    public String getSalaryTrendMax () {
        return this.salaryTrendMax;
    }

    public void setSalaryTrendRealTimeMin (String salaryTrendRealTimeMin) {
        this.salaryTrendRealTimeMin = salaryTrendRealTimeMin;
    }

    public String getSalaryTrendRealTimeMin () {
        return this.salaryTrendRealTimeMin;
    }

    public void setSalaryTrendRealTimeMax (String salaryTrendRealTimeMax) {
        this.salaryTrendRealTimeMax = salaryTrendRealTimeMax;
    }

    public String getSalaryTrendRealTimeMax () {
        return this.salaryTrendRealTimeMax;
    }

    public void setJobCodes (List <JobCode> jobCodes) {
        this.jobCodes = jobCodes;
    }

    public void setJobCode (JobCode jobCode) {
        this.jobCodes.add (jobCode);
    }

    public List <JobCode> getJobCodes () {
        return this.jobCodes;
    }

    public JobCode getJobCode (int index) {
        return this.jobCodes.get (index);
    }

    public void setFamilyNames (List <FamilyName> familyNames) {
        this.familyNames = familyNames;
    }

    public void setFamilyName (FamilyName familyName) {
        this.familyNames.add (familyName);
    }

    public List <FamilyName> getFamilyNames () {
        return this.familyNames;
    }

    public FamilyName getFamilyName (int index) {
        return this.familyNames.get (index);
    }

    public void setPrograms (List <Program> tenantDegrees) {
        this.tenantDegrees = tenantDegrees;
    }

    public void setProgram (Program tenantDegree) {
        this.tenantDegrees.add (tenantDegree);
    }

    public List <Program> getPrograms () {
        return this.tenantDegrees;
    }

    public Program getProgram (int index) {
        return this.tenantDegrees.get (index);
    }

    public void setGeneralDegrees (List <Program> generalDegrees) {
        this.generalDegrees = generalDegrees;
    }

    public void setGeneralDegree (Program generalDegree) {
        this.generalDegrees.add (generalDegree);
    }

    public List <Program> getGeneralDegrees () {
        return this.generalDegrees;
    }

    public Program getGeneralDegree (int index) {
        return this.generalDegrees.get (index);
    }

    public class JobCode {

        private String    name;
        private String    jobCodeType;
        private String    id;
        private LaborData laborMarketData;

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

        public void setLaborMarketData (LaborData laborMarketData) {
            this.laborMarketData = laborMarketData;
        }

        public LaborData getLaborMarketData () {
            return this.laborMarketData;
        }
    }

    public class FamilyName {

        private String id;
        private String name;
        private String type;

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setType (String type) {
            this.type = type;
        }

        public String getType () {
            return this.type;
        }
    }
}
