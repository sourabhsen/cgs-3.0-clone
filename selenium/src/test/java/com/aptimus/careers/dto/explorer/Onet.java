package com.aptimus.careers.dto.explorer;

import java.util.ArrayList;
import java.util.List;

public class Onet {

    private List <JobFamily> jobFamilies = new ArrayList <JobFamily> ();

    public void setJobFamilies (List <JobFamily> jobFamilies) {
        this.jobFamilies = jobFamilies;
    }

    public void setJobFamilies (JobFamily jobFamily) {
        this.jobFamilies.add (jobFamily);
    }

    public List <JobFamily> getJobFamilies () {
        return this.jobFamilies;
    }

    public JobFamily getJobFamily (int index) {
        return this.jobFamilies.get (index);
    }

    public class JobFamily {

        private String jobFamilyId;
        private String jobFamilyName;
        private Object jobs;

        public void setJobFamilyId (String jobFamilyId) {
            this.jobFamilyId = jobFamilyId;
        }

        public String getJobFamilyId () {
            return this.jobFamilyId;
        }

        public void setJobFamilyName (String jobFamilyName) {
            this.jobFamilyName = jobFamilyName;
        }

        public String getJobFamilyName () {
            return this.jobFamilyName;
        }

        public void setJobs (Object jobs) {
            this.jobs = jobs;
        }

        public Object getJobs () {
            return this.jobs;
        }
    }

    public class Job {

        private String jobCode;
        private String title;

        public void setJobCode (String jobCode) {
            this.jobCode = jobCode;
        }

        public String getJobCode () {
            return this.jobCode;
        }

        public void setTitle (String title) {
            this.title = title;
        }

        public String getTitle () {
            return this.title;
        }
    }
}
