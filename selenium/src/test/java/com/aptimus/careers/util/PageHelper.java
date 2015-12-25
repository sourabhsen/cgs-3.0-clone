package com.aptimus.careers.util;

import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.ui.login.CgsdemoLogin;
import com.aptimus.careers.ui.login.ILogin;
import com.aptimus.careers.ui.login.IronyardLogin;
import com.aptimus.careers.ui.login.UopxLogin;

public class PageHelper {

    public static ILogin getLogin () {
        if (CareerEnvironment.isIronyard)
            return new IronyardLogin ();
        else if (CareerEnvironment.isUopx)
            return new UopxLogin ();
        else
            return new CgsdemoLogin ();
    }

    public enum Trait {
        Artistic, Conventional, Realistic, Investigative, Social, Enterprising;
    }

    public enum Filter {
        radius ("Distance"),
        Location ("Location"),
        AcademicProgram ("Academic Program"),
        EducationLevel ("Education Level"),
        Company ("Company"),
        CareerArea ("Career Area"),
        ExperienceLevel ("Experience Level"),
        EmployeePartner ("Employee Partner"),
        TuitionReimbursement ("Tuition Reimbursement");

        private String solrFacet;

        private Filter (String solrFacet) {
            this.solrFacet = solrFacet;
        }

        public String solrFacet () {
            return this.solrFacet;
        }

        public String id () {
            return "filter-" + this.solrFacet;
        }
    }

    public enum SortBy {
        Relevancy ("Relevancy"), Date ("Date Posted");

        private String css;

        private SortBy (String css) {
            this.css = css;
        }

        public String css () {
            return this.css;
        }
    }

    public enum ListType {
        JOB, RONET, SKILL, CAREER_SETTINGS, CAREER_PLAN_STEP, RECOMMENDATION_FEEDBACK
    }

    public enum ActivityType {
        feedback, apply_clicked, applied, Job_Viewed, expired_or_does_not_exist
    }

    public enum ResumeSection {
        EDUCATION, EXPERIENCE, ADDITIONAL_INFO, CUSTOM
    }

    public enum ResumeInfoList {
        SKILLS ("addl-SKILLS_SUBSECTION", "skills"),
        AWARDS ("addl-AWARDS", "awards"),
        CERTIFICATIONS ("addl-CERTIFICATIONS", "certifications"),
        LANGUAGES ("addl-LANGUAGES", "languages"),
        HOBBIES ("addl-HOBBIES", "personalHobbies"),
        VOLUNTEER ("addl-VOLUNTEER", "volunteerWork");

        private String id, title;

        private ResumeInfoList (String id, String title) {
            this.id = id;
            this.title = title;
        }

        public String title () {
            return this.title;
        }

        public String id () {
            return this.id;
        }
    }

    public enum Panel {
        rbSummaryQualification, rbJobHistory, rbEducation, rbAdditionalInformationSkills;
    }

    public enum CourseType {
        allTypes, Course, Webinar, Book, Talk, Bootcamp, Miscellaneous;
    }

    public enum PriceType {
        allPrices ("allPrices", "", "-1.0", "-1.0"),
        unpriced ("-1", "&price.min=-1&price.max=0", "-1.0", "0.0"),
        free ("0", "&price.min=0&price.max=0", "0.0", "0.01"),
        lessThanFifty ("0.01", "&price.min=0.01&price.max=50", "0.01", "50.0"),
        fiftyToHun ("50", "&price.min=50&price.max=100", "50.0", "100.0"),
        hunToTwoFifty ("100", "&price.min=100&price.max=250", "100.0", "250.0"),
        twoFiftyToFiveHun ("250", "&price.min=250&price.max=500", "250.0", "500.0"),
        fiveHunToFiveThou ("500", "&price.min=500&price.max=5000", "500.0", "5000.0"),
        fiveThouToTenThou ("5000", "&price.min=5000&price.max=10000", "5000.0", "10000.0"),
        tenThouToTwentyThou ("10000", "&price.min=10000&price.max=20000", "10000.0", "20000.0");

        private String css, value, from, to;

        private PriceType (String css, String value, String from, String to) {
            this.css = css;
            this.value = value;
            this.from = from;
            this.to = to;
        }

        public String css () {
            return this.css;
        }

        public String value () {
            return this.value;
        }

        public String from () {
            return this.from;
        }

        public String to () {
            return this.to;
        }
    }

    public enum Rating {
        Beginner, Intermediate, Advanced;
    }

    public enum Answer {
        yes, no, on, off, missing
    }

    public enum Sort {
        asc, desc
    }

    public enum Tool {
        careerExploration, skillBuilder, resumeBuilder, interviewPreparation, jobsearch, military;
    }

    public enum ResumeSamples {
        accountant ("Accountant"),
        executiveassistent ("Executive Assistant"),
        financialanalyst ("Financial Analyst"),
        itmanagement ("IT Manager"),
        managmentprofessional ("Management Professional"),
        counseling ("Mental Health / Behavioral Counselor"),
        nurse ("Nurse"),
        securityprofessional ("Security Professional"),
        teacher ("Teacher");

        private String btn;

        private ResumeSamples (String btn) {
            this.btn = btn;
        }

        public String btn () {
            return this.btn;
        }
    }
}
