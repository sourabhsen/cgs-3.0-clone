package com.aptimus.careers.dto.resume;

import java.util.ArrayList;
import java.util.List;

public class Resumes {

    private List <Resume> items = new ArrayList <Resume> ();

    public void setItems (List <Resume> items) {
        this.items = items;
    }

    public void setItems (Resume item) {
        this.items.add (item);
    }

    public List <Resume> getItems () {
        return this.items;
    }

    public Resume getItem (int idx) {
        return this.items.get (idx);
    }

    public static class Resume {

        private String                   id;
        private String                   privacySetting;
        private String                   documentType;
        private String                   primaryInd;
        private String                   status;
        private Contact                  contact;
        private Summary                  summary;
        private Education                education;
        private Experience               experience;
        private Statements               statements;
        private AdditionalInfo           skills;
        private List <AdditionalSection> additionalSections = new ArrayList <AdditionalSection> ();
        private List <String>            canonSkills        = new ArrayList <String> ();
        private JobPreference            jobPreferences;
        private List <Section>           sections           = new ArrayList <Section> ();
        private boolean                  empty;

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }

        public void setPrivacySetting (String privacySetting) {
            this.privacySetting = privacySetting;
        }

        public String getPrivacySetting () {
            return this.privacySetting;
        }

        public void setDocumentType (String documentType) {
            this.documentType = documentType;
        }

        public String getDocumentType () {
            return this.documentType;
        }

        public void setPrimaryInd (String primaryInd) {
            this.primaryInd = primaryInd;
        }

        public String getPrimaryInd () {
            return this.primaryInd;
        }

        public void setStatus (String status) {
            this.status = status;
        }

        public String getStatus () {
            return this.status;
        }

        public void setContact (Contact contact) {
            this.contact = contact;
        }

        public Contact getContact () {
            return this.contact;
        }

        public void setSummary (Summary summary) {
            this.summary = summary;
        }

        public Summary getSummary () {
            return this.summary;
        }

        public void setEducation (Education education) {
            this.education = education;
        }

        public Education getEducation () {
            return this.education;
        }

        public void setExperience (Experience experience) {
            this.experience = experience;
        }

        public Experience getExperience () {
            return this.experience;
        }

        public void setStatements (Statements statements) {
            this.statements = statements;
        }

        public Statements getStatements () {
            return this.statements;
        }

        public void setAdditionalInfo (AdditionalInfo skills) {
            this.skills = skills;
        }

        public AdditionalInfo getAdditionalInfo () {
            return this.skills;
        }

        public void setAdditionalSections (List <AdditionalSection> additionalSections) {
            this.additionalSections = additionalSections;
        }

        public List <AdditionalSection> getAdditionalSections () {
            return this.additionalSections;
        }

        public void setCanonSkills (List <String> canonSkills) {
            this.canonSkills = canonSkills;
        }

        public List <String> getCanonSkills () {
            return this.canonSkills;
        }

        public void setJobPreferences (JobPreference jobPreferences) {
            this.jobPreferences = jobPreferences;
        }

        public JobPreference getJobPreferences () {
            return this.jobPreferences;
        }

        public void setSections (List <Section> sections) {
            this.sections = sections;
        }

        public List <Section> getSections () {
            return this.sections;
        }

        public void setEmpty (boolean empty) {
            this.empty = empty;
        }

        public boolean isEmpty () {
            return this.empty;
        }
    }

    public static class Summary {

        private String        userSummary;
        private String        userLabel;
        private boolean       includeUserSummary;
        private List <String> objectives = new ArrayList <String> ();

        public void setUserSummary (String userSummary) {
            this.userSummary = userSummary;
        }

        public String getUserSummary () {
            return this.userSummary;
        }

        public void setUserLabel (String userLabel) {
            this.userLabel = userLabel;
        }

        public String getUserLabel () {
            return this.userLabel;
        }

        public void setIncludeUserSummary (boolean includeUserSummary) {
            this.includeUserSummary = includeUserSummary;
        }

        public boolean isIncludeUserSummary () {
            return this.includeUserSummary;
        }

        public void setObjectives (List <String> objectives) {
            this.objectives = objectives;
        }

        public List <String> getObjectives () {
            return this.objectives;
        }
    }

    public static class Statements {

        private Personal personal;
        private String   honors;

        public void setPersonal (Personal personal) {
            this.personal = personal;
        }

        public Personal getPersonal () {
            return this.personal;
        }

        public void setHonors (String honors) {
            this.honors = honors;
        }

        public String getHonors () {
            return this.honors;
        }

        public static class Personal {

            private Veteran veteran;

            public Personal (Veteran veteran) {
                this.veteran = veteran;
            }

            public void setHonors (Veteran veteran) {
                this.veteran = veteran;
            }

            public Veteran getVeteran () {
                return this.veteran;
            }
        }

        public static class Veteran {

            private boolean isVeteran;

            public Veteran (boolean isVeteran) {
                this.isVeteran = isVeteran;
            }

            public void setVeteran (boolean isVeteran) {
                this.isVeteran = isVeteran;
            }

            public boolean isVeteran () {
                return this.isVeteran;
            }
        }
    }

    public static class AdditionalInfo {

        private String        languages;
        private String        certifications;
        private String        awards;
        private String        personalHobbies;
        private String        volunteerWork;
        private List <String> skills = new ArrayList <String> ();

        public void setLanguages (String languages) {
            this.languages = this.languages == null ? languages : this.languages + "," + languages;
        }

        public String getLanguages () {
            return this.languages;
        }

        public void setCertifications (String certifications) {
            this.certifications = this.certifications == null ? certifications : this.certifications + "," + certifications;
        }

        public String getCertifications () {
            return this.certifications;
        }

        public void setAwards (String awards) {
            this.awards = this.awards == null ? awards : this.awards + "," + awards;
        }

        public String getAwards () {
            return this.awards;
        }

        public void setPersonalHobbies (String personalHobbies) {
            this.personalHobbies = this.personalHobbies == null ? personalHobbies : this.personalHobbies + "," + personalHobbies;
        }

        public String getPersonalHobbies () {
            return this.personalHobbies;
        }

        public void setVolunteerWork (String volunteerWork) {
            this.volunteerWork = this.volunteerWork == null ? volunteerWork : this.volunteerWork + "," + volunteerWork;
        }

        public String getVolunteerWork () {
            return this.volunteerWork;
        }

        public void setSkills (List <String> skills) {
            this.skills = skills;
        }

        public void setSkills (String skill) {
            this.skills.add (skill);
        }

        public List <String> getSkills () {
            return this.skills;
        }

        public String getSkill (int idx) {
            return this.skills.get (idx);
        }
    }

    public static class AdditionalSection {

        private String content;
        private int    id;
        private String section;

        public void setContent (String content) {
            this.content = content;
        }

        public String getContent () {
            return this.content;
        }

        public void setId (int id) {
            this.id = id;
        }

        public int getId () {
            return this.id;
        }

        public void setSection (String section) {
            this.section = section;
        }

        public String getSection () {
            return this.section;
        }
    }

    public static class JobPreference {

        private boolean workOverTime;

        public JobPreference (boolean workOverTime) {
            this.workOverTime = workOverTime;
        }

        public void setWorkOverTime (boolean workOverTime) {
            this.workOverTime = workOverTime;
        }

        public boolean getWorkOverTime () {
            return this.workOverTime;
        }
    }

    public class Section {

        private String            type;
        private int               id;
        private List <SubSection> subSections = new ArrayList <SubSection> ();

        public void setType (String type) {
            this.type = type;
        }

        public String getType () {
            return this.type;
        }

        public void setId (int id) {
            this.id = id;
        }

        public int getId () {
            return this.id;
        }

        public void setSubSection (List <SubSection> subSections) {
            this.subSections = subSections;
        }

        public List <SubSection> getSubSections () {
            return this.subSections;
        }
    }

    public class SubSection {

        private String type;
        private int    id;

        public void setType (String type) {
            this.type = type;
        }

        public String getType () {
            return this.type;
        }

        public void setId (int id) {
            this.id = id;
        }

        public int getId () {
            return this.id;
        }
    }
}
