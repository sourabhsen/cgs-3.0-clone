package com.aptimus.careers.dto;

import java.util.ArrayList;
import java.util.List;

public class StudentProgram {

    private String      self;
    private List <Item> items = new ArrayList <Item> ();

    public void setSelf (String self) {
        this.self = self;
    }

    public String getSelf () {
        return this.self;
    }

    public void setItems (List <Item> items) {
        this.items = items;
    }

    public void setItems (Item item) {
        this.items.add (item);
    }

    public List <Item> getItems () {
        return this.items;
    }

    public Item getItem (int index) {
        return this.items.get (index);
    }

    public class Item {

        private String                          id;
        private AcademicProgramOffering         academicProgramOffering;
        private List <StudentProgramMilestones> studentProgramMilestones;

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }

        public void setAcademicProgramOffering (AcademicProgramOffering academicProgramOffering) {
            this.academicProgramOffering = academicProgramOffering;
        }

        public AcademicProgramOffering getAcademicProgramOffering () {
            return this.academicProgramOffering;
        }

        public void setStudentProgramMilestones (List <StudentProgramMilestones> studentProgramMilestones) {
            this.studentProgramMilestones = studentProgramMilestones;
        }

        public List <StudentProgramMilestones> getStudentProgramMilestones () {
            return this.studentProgramMilestones;
        }
    }

    public class StudentProgramMilestones {

        private String milestoneType;
        private String milestoneDate;

        public void setMilestoneType (String milestoneType) {
            this.milestoneType = milestoneType;
        }

        public String getMilestoneType () {
            return this.milestoneType;
        }

        public void setMilestoneDate (String milestoneDate) {
            this.milestoneDate = milestoneDate;
        }

        public String getMilestoneDate () {
            return this.milestoneDate;
        }
    }

    public class AcademicProgramOffering {

        private AcademicProgram academicProgram;

        public void setAcademicProgram (AcademicProgram academicProgram) {
            this.academicProgram = academicProgram;
        }

        public AcademicProgram getAcademicProgram () {
            return this.academicProgram;
        }
    }

    public class AcademicProgram {

        private String                    name;
        private String                    academicProgramCode;
        private List <ProgramDescription> descriptions;

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setAcademicProgramCode (String academicProgramCode) {
            this.academicProgramCode = academicProgramCode;
        }

        public String getAcademicProgramCode () {
            return this.academicProgramCode;
        }

        public void setDescriptions (List <ProgramDescription> descriptions) {
            this.descriptions = descriptions;
        }

        public void setDescriptions (ProgramDescription description) {
            this.descriptions.add (description);
        }

        public List <ProgramDescription> getDescriptions () {
            return this.descriptions;
        }

        public ProgramDescription getDescription (int index) {
            return this.descriptions.get (index);
        }
    }

    public class ProgramDescription {

        private String description;

        public void setDescription (String description) {
            this.description = description;
        }

        public String getDescription () {
            return this.description;
        }
    }
}
