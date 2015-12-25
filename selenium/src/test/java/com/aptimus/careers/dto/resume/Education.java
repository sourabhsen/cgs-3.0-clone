package com.aptimus.careers.dto.resume;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.aptimus.careers.dto.resume.Contact.PostalAddress;

public class Education {

    private String        educationLevel;
    private String        status;
    private String        courses;
    private List <School> schools = new ArrayList <School> ();
    private String        userLabel;

    public Education () {}

    public Education (School school) {
        this.schools.add (school);
    }

    public void setEducationLevel (String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getEducationLevel () {
        return this.educationLevel;
    }

    public void setStatus (String status) {
        this.status = status;
    }

    public String getStatus () {
        return this.status;
    }

    public void setCourses (String courses) {
        this.courses = courses;
    }

    public String getCourses () {
        return this.courses;
    }

    public void setUserLabel (String userLabel) {
        this.userLabel = userLabel;
    }

    public String getUserLabel () {
        return this.userLabel;
    }

    public void setSchools (List <School> schools) {
        this.schools = schools;
    }

    public void setSchools (School school) {
        this.schools.add (school);
    }

    public List <School> getSchools () {
        return this.schools;
    }

    public School getSchool (int idx) {
        return this.schools.get (idx);
    }

    public School getSchool (String id) {
        for (School school : this.schools)
            if (school.getId ().equals (id))
                return school;
        return null;
    }

    public static class School {

        private String        id;
        private Date          completionDate;
        private Date          startDate;
        private String        institution;
        private String        qualificationLevel;
        private String        degreeType;
        private String        major;
        private Gpa           gpa;
        private boolean       isAttending;
        private String        details;
        private PostalAddress address;

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }

        public void setCompletionDate (Date completionDate) {
            this.completionDate = completionDate;
        }

        public Date getCompletionDate () {
            return this.completionDate;
        }

        public void setStartDate (Date startDate) {
            this.startDate = startDate;
        }

        public Date getStartDate () {
            return this.startDate;
        }

        public void setInstitution (String institution) {
            this.institution = institution;
        }

        public String getInstitution () {
            return this.institution;
        }

        public void setDegreeLevel (String qualificationLevel) {
            this.qualificationLevel = qualificationLevel;
        }

        public String getDegreeLevel () {
            return this.qualificationLevel;
        }

        public void setDegreeType (String degreeType) {
            this.degreeType = degreeType;
        }

        public String getDegreeType () {
            return this.degreeType;
        }

        public void setMajor (String major) {
            this.major = major;
        }

        public String getMajor () {
            return this.major;
        }

        public void setGpa (Gpa gpa) {
            this.gpa = gpa;
        }

        public Gpa getGpa () {
            return this.gpa;
        }

        public void presentlyEnrolled (boolean isAttending) {
            this.isAttending = isAttending;
        }

        public boolean isPresentlyEnrolled () {
            return this.isAttending;
        }

        public void setDetails (String details) {
            this.details = details;
        }

        public String getDetails () {
            return this.details;
        }

        public void setAddress (PostalAddress address) {
            this.address = address;
        }

        public PostalAddress getAddress () {
            return this.address;
        }
    }

    public static class Gpa {

        private String value;

        public Gpa (String value) {
            this.value = value;
        }

        public String getValue () {
            return this.value;
        }
    }
}
