package com.aptimus.careers.dto.explorer;

import java.util.ArrayList;
import java.util.List;

public class Ronet {

    private LaborData       laborData;
    private List <Degree>   degreeList        = new ArrayList <Degree> ();
    private List <Program>  programs          = new ArrayList <Program> ();
    private List <JobTitle> jobTitles         = new ArrayList <JobTitle> ();
    private Skills          skills;
    private List <String>   relatedTitles;
    private List <String>   specializedSkills = new ArrayList <String> ();
    private List <String>   softwareSkills    = new ArrayList <String> ();
    private List <String>   foundationSkills  = new ArrayList <String> ();
    private String          numJobOpportunities;
    private List <String>   topEmployers      = new ArrayList <String> ();

    public void setLaborData (LaborData laborData) {
        this.laborData = laborData;
    }

    public LaborData getLaborData () {
        return this.laborData;
    }

    public void setDegreeList (List <Degree> degreeList) {
        this.degreeList = degreeList;
    }

    public void setDegreeList (Degree degree) {
        this.degreeList.add (degree);
    }

    public List <Degree> getDegreeList () {
        return this.degreeList;
    }

    public Degree getDegreeList (int index) {
        return this.degreeList.get (index);
    }

    public void setPrograms (List <Program> programs) {
        this.programs = programs;
    }

    public void setPrograms (Program program) {
        this.programs.add (program);
    }

    public List <Program> getPrograms () {
        return this.programs;
    }

    public Program getProgram (int index) {
        return this.programs.get (index);
    }

    public void setJobTitles (List <JobTitle> jobTitles) {
        this.jobTitles = jobTitles;
    }

    public void setJobTitles (JobTitle jobTitle) {
        this.jobTitles.add (jobTitle);
    }

    public List <JobTitle> getJobTitles () {
        return this.jobTitles;
    }

    public JobTitle getJobTitle (int index) {
        return this.jobTitles.get (index);
    }

    public void setSkills (Skills skills) {
        this.skills = skills;
    }

    public Skills getSkills () {
        return this.skills;
    }

    public void setRelatedTitles (List <String> relatedTitles) {
        this.relatedTitles = relatedTitles;
    }

    public void setRelatedTitle (String relatedTitle) {
        this.relatedTitles.add (relatedTitle);
    }

    public List <String> getRelatedTitles () {
        return this.relatedTitles;
    }

    public String getRelatedTitle (int index) {
        return this.relatedTitles.get (index);
    }

    public void setSpecializedSkills (List <String> specializedSkills) {
        this.specializedSkills = specializedSkills;
    }

    public void setSpecializedSkill (String specializedSkill) {
        this.specializedSkills.add (specializedSkill);
    }

    public List <String> getSpecializedSkills () {
        return this.specializedSkills;
    }

    public String getSpecializedSkill (int index) {
        return this.specializedSkills.get (index);
    }

    public void setSoftwareSkills (List <String> softwareSkills) {
        this.softwareSkills = softwareSkills;
    }

    public void setSoftwareSkill (String softwareSkill) {
        this.softwareSkills.add (softwareSkill);
    }

    public List <String> getSoftwareSkills () {
        return this.softwareSkills;
    }

    public String getSoftwareSkill (int index) {
        return this.softwareSkills.get (index);
    }

    public void setFoundationSkills (List <String> foundationSkills) {
        this.foundationSkills = foundationSkills;
    }

    public void setFoundationSkill (String foundationSkill) {
        this.foundationSkills.add (foundationSkill);
    }

    public List <String> getFoundationSkills () {
        return this.foundationSkills;
    }

    public String getFoundationSkill (int index) {
        return this.foundationSkills.get (index);
    }

    public void setNumJobOpportunities (String numJobOpportunities) {
        this.numJobOpportunities = numJobOpportunities;
    }

    public String getNumJobOpportunities () {
        return this.numJobOpportunities;
    }

    public void setTopEmployers (List <String> topEmployers) {
        this.topEmployers = topEmployers;
    }

    public void setTopEmployer (String topEmployer) {
        this.topEmployers.add (topEmployer);
    }

    public List <String> getTopEmployers () {
        return this.topEmployers;
    }

    public String getTopEmployer (int index) {
        return this.topEmployers.get (index);
    }

    public class JobTitle {

        private String name;
        private String id;

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }
    }

    public class Skills {

        private List <Skill> specialized = new ArrayList <Skill> ();
        private List <Skill> software    = new ArrayList <Skill> ();
        private List <Skill> foundation  = new ArrayList <Skill> ();
        private boolean      empty;

        public void setSpecialized (List <Skill> skills) {
            this.specialized = skills;
        }

        public void setSpecialized (Skill skill) {
            this.specialized.add (skill);
        }

        public List <Skill> getSpecialized () {
            return this.specialized;
        }

        public Skill getSpecialized (int index) {
            return this.specialized.get (index);
        }

        public void setSoftware (List <Skill> skills) {
            this.software = skills;
        }

        public void setSoftware (Skill skill) {
            this.software.add (skill);
        }

        public List <Skill> getSoftware () {
            return this.software;
        }

        public Skill getSoftware (int index) {
            return this.software.get (index);
        }

        public void setFoundation (List <Skill> skills) {
            this.foundation = skills;
        }

        public void setFoundation (Skill skill) {
            this.foundation.add (skill);
        }

        public List <Skill> getFoundation () {
            return this.foundation;
        }

        public Skill getFoundation (int index) {
            return this.foundation.get (index);
        }

        public void setEmpty (boolean empty) {
            this.empty = empty;
        }

        public boolean isEmpty () {
            return this.empty;
        }
    }
}
