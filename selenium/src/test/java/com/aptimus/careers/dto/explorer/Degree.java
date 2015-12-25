package com.aptimus.careers.dto.explorer;

public class Degree {

    private String degreeName;
    private String isDegreeArea;
    private String isClientData;
    private String id;
    private String name;
    private String educationLevel;

    public Degree (String name) {
        this.name = name;
    }

    public void setDegreeName (String degreeName) {
        this.degreeName = degreeName;
    }

    public String getDegreeName () {
        return degreeName;
    }

    public void setIsDegreeArea (String isDegreeArea) {
        this.isDegreeArea = isDegreeArea;
    }

    public String isDegreeArea () {
        return isDegreeArea;
    }

    public void setIsClientData (String isClientData) {
        this.isClientData = isClientData;
    }

    public String isClientData () {
        return isClientData;
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

    public void setEducationLevel (String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getEducationLevel () {
        return educationLevel;
    }
}
