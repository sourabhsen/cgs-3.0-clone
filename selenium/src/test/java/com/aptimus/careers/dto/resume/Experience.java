package com.aptimus.careers.dto.resume;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.aptimus.careers.dto.resume.Contact.PostalAddress;

public class Experience {

    private String          employmentStatus;
    private String          userLabel;
    private List <Employer> jobs = new ArrayList <Employer> ();

    public Experience () {}

    public Experience (Employer job) {
        this.jobs.add (job);
    }

    public void setEmploymentStatus (String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public String getEmploymentStatus () {
        return this.employmentStatus;
    }

    public void setUserLabel (String userLabel) {
        this.userLabel = userLabel;
    }

    public String getUserLabel () {
        return this.userLabel;
    }

    public void setJobs (List <Employer> jobs) {
        this.jobs = jobs;
    }

    public void setJobs (Employer job) {
        this.jobs.add (job);
    }

    public List <Employer> getJobs () {
        return this.jobs;
    }

    public Employer getJob (int idx) {
        return this.jobs.get (idx);
    }

    public Employer getJob (String id) {
        for (Employer job : this.jobs)
            if (job.getId ().equals (id))
                return job;
        return null;
    }

    public static class Employer {

        private String        id;
        private boolean       isCurrent;
        private Date          startDate;
        private Date          endDate;
        private String        title;
        private String        description;
        private String        employer;
        private PostalAddress address;

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }

        public void presentJob (boolean isCurrent) {
            this.isCurrent = isCurrent;
        }

        public boolean isPresentJob () {
            return this.isCurrent;
        }

        public void setStartDate (Date startDate) {
            this.startDate = startDate;
        }

        public Date getStartDate () {
            return this.startDate;
        }

        public void setEndDate (Date endDate) {
            this.endDate = endDate;
        }

        public Date getEndDate () {
            return this.endDate;
        }

        public void setJobTitle (String title) {
            this.title = title;
        }

        public String getJobTitle () {
            return this.title;
        }

        public void setDescription (String description) {
            this.description = description;
        }

        public String getDescription () {
            return this.description;
        }

        public void setEmployer (String employer) {
            this.employer = employer;
        }

        public String getEmployer () {
            return this.employer;
        }

        public void setAddress (PostalAddress address) {
            this.address = address;
        }

        public PostalAddress getAddress () {
            return this.address;
        }
    }
}
