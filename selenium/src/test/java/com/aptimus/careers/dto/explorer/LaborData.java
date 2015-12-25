package com.aptimus.careers.dto.explorer;

import java.util.ArrayList;
import java.util.List;

public class LaborData {

    private String                      stateAreaId;
    private String                      scopeAreaId;
    private String                      scopeAreaType;
    private String                      hiringTrend;
    private String                      hiringTrendPercentile;
    private String                      hiringDemand;
    private String                      salaryTrend;
    private String                      salaryTrendPercentile;
    private String                      salaryTrendAverage;
    private String                      salaryTrendMin;
    private String                      salaryTrendMax;
    private String                      salaryTrendRealTime;
    private String                      salaryTrendRealTimeAverage;
    private String                      salaryTrendRealTimeMin;
    private String                      salaryTrendRealTimeMax;
    private String                      description;
    private String                      id;
    private String                      name;
    private String                      degreeIntroStatement;
    private String                      degrees;
    private String                      rOnet;
    private List <Certification>        certifications        = new ArrayList <Certification> ();
    private List <EducationRequirement> educationRequirements = new ArrayList <EducationRequirement> ();
    private List <ExperienceLevel>      experienceLevels      = new ArrayList <ExperienceLevel> ();

    public void setStateAreaId (String stateAreaId) {
        this.stateAreaId = stateAreaId;
    }

    public String getStateAreaId () {
        return stateAreaId;
    }

    public void setScopeAreaId (String scopeAreaId) {
        this.scopeAreaId = scopeAreaId;
    }

    public String getScopeAreaId () {
        return scopeAreaId;
    }

    public void setScopeAreaType (String scopeAreaType) {
        this.scopeAreaType = scopeAreaType;
    }

    public String getScopeAreaType () {
        return scopeAreaType;
    }

    public void setHiringTrend (String hiringTrend) {
        this.hiringTrend = hiringTrend;
    }

    public String getHiringTrend () {
        return hiringTrend;
    }

    public void setHiringTrendPercentile (String hiringTrendPercentile) {
        this.hiringTrendPercentile = hiringTrendPercentile;
    }

    public String getHiringTrendPercentile () {
        return hiringTrendPercentile;
    }

    public void setHiringDemand (String hiringDemand) {
        this.hiringDemand = hiringDemand;
    }

    public String getHiringDemand () {
        return hiringDemand;
    }

    public void setSalaryTrend (String salaryTrend) {
        this.salaryTrend = salaryTrend;
    }

    public String getSalaryTrend () {
        return salaryTrend;
    }

    public void setSalaryTrendPercentile (String salaryTrendPercentile) {
        this.salaryTrendPercentile = salaryTrendPercentile;
    }

    public String getSalaryTrendPercentile () {
        return salaryTrendPercentile;
    }

    public void setSalaryTrendAverage (String salaryTrendAverage) {
        this.salaryTrendAverage = salaryTrendAverage;
    }

    public String getSalaryTrendAverage () {
        return salaryTrendAverage;
    }

    public void setSalaryTrendMin (String salaryTrendMin) {
        this.salaryTrendMin = salaryTrendMin;
    }

    public String getSalaryTrendMin () {
        return salaryTrendMin;
    }

    public void setSalaryTrendMax (String salaryTrendMax) {
        this.salaryTrendMax = salaryTrendMax;
    }

    public String getSalaryTrendMax () {
        return salaryTrendMax;
    }

    public void setSalaryTrendRealTime (String salaryTrendRealTime) {
        this.salaryTrendRealTime = salaryTrendRealTime;
    }

    public String getSalaryTrendRealTime () {
        return salaryTrendRealTime;
    }

    public void setSalaryTrendRealTimeAverage (String salaryTrendRealTimeAverage) {
        this.salaryTrendRealTimeAverage = salaryTrendRealTimeAverage;
    }

    public String getSalaryTrendRealTimeAverage () {
        return salaryTrendRealTimeAverage;
    }

    public void setSalaryTrendRealTimeMin (String salaryTrendRealTimeMin) {
        this.salaryTrendRealTimeMin = salaryTrendRealTimeMin;
    }

    public String getSalaryTrendRealTimeMin () {
        return salaryTrendRealTimeMin;
    }

    public void setSalaryTrendRealTimeMax (String salaryTrendRealTimeMax) {
        this.salaryTrendRealTimeMax = salaryTrendRealTimeMax;
    }

    public String getSalaryTrendRealTimeMax () {
        return salaryTrendRealTimeMax;
    }

    public void setDescription (String description) {
        this.description = description;
    }

    public String getDescription () {
        return description.replace ("  ", " ").replace ("…", "");
    }

    public void setId (String id) {
        this.id = id;
    }

    public String getId () {
        return id;
    }

    public void setName (String name) {
        this.name = name;
    }

    public String getName () {
        return name;
    }

    public void setDegreeIntroStatement (String degreeIntroStatement) {
        this.degreeIntroStatement = degreeIntroStatement;
    }

    public String getDegreeIntroStatement () {
        return degreeIntroStatement;
    }

    public void setDegrees (String degrees) {
        this.degrees = degrees;
    }

    public String getDegrees () {
        return degrees;
    }

    public void setROnet (String rOnet) {
        this.rOnet = rOnet;
    }

    public String getROnet () {
        return rOnet;
    }

    public void setCertifications (List <Certification> certifications) {
        this.certifications = certifications;
    }

    public void setCertification (Certification certification) {
        this.certifications.add (certification);
    }

    public List <Certification> getCertifications () {
        return this.certifications;
    }

    public Certification getCertification (int index) {
        return this.certifications.get (index);
    }

    public void setEducationRequirements (List <EducationRequirement> educationRequirements) {
        this.educationRequirements = educationRequirements;
    }

    public void setEducationRequirement (EducationRequirement educationRequirement) {
        this.educationRequirements.add (educationRequirement);
    }

    public List <EducationRequirement> getEducationRequirements () {
        return this.educationRequirements;
    }

    public EducationRequirement getEducationRequirement (int index) {
        return this.educationRequirements.get (index);
    }

    public void setExperienceLevels (List <ExperienceLevel> experienceLevels) {
        this.experienceLevels = experienceLevels;
    }

    public void setExperienceLevel (ExperienceLevel experienceLevel) {
        this.experienceLevels.add (experienceLevel);
    }

    public List <ExperienceLevel> getExperienceLevels () {
        return this.experienceLevels;
    }

    public ExperienceLevel getExperienceLevel (int index) {
        return this.experienceLevels.get (index);
    }

    public static class Certification {

        private String name;
        private String demandPercentile;

        public Certification (String name) {
            this.name = name;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return name;
        }

        public void setDemandPercentile (String demandPercentile) {
            this.demandPercentile = demandPercentile;
        }

        public String getDemandPercentile () {
            return demandPercentile;
        }
    }

    public static class EducationRequirement {

        private String educationRequirementType;
        private String requirementPercentile;

        public EducationRequirement (String requirementPercentile, String educationRequirementType) {
            this.requirementPercentile = requirementPercentile;
            this.educationRequirementType = educationRequirementType;
        }

        public void setEducationRequirementType (String educationRequirementType) {
            this.educationRequirementType = educationRequirementType;
        }

        public String getEducationRequirementType () {
            return educationRequirementType;
        }

        public void setRequirementPercentile (String requirementPercentile) {
            this.requirementPercentile = requirementPercentile;
        }

        public String getRequirementPercentile () {
            return requirementPercentile;
        }
    }

    public static class ExperienceLevel {

        private String experienceLevel;
        private String experiencePercentile;

        public ExperienceLevel (String experiencePercentile, String experienceLevel) {
            this.experiencePercentile = experiencePercentile;
            this.experienceLevel = experienceLevel;
        }

        public void setExperienceLevel (String experienceLevel) {
            this.experienceLevel = experienceLevel;
        }

        public String getExperienceLevel () {
            return experienceLevel;
        }

        public void setExperiencePercentile (String experiencePercentile) {
            this.experiencePercentile = experiencePercentile;
        }

        public String getExperiencePercentile () {
            return experiencePercentile;
        }
    }
}
