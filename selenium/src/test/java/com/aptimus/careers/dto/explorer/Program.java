package com.aptimus.careers.dto.explorer;

public class Program {

    private String programId;
    private String programName;
    private String programLink;
    private String programLevel;

    public void setProgramId (String programId) {
        this.programId = programId;
    }

    public String getProgramId () {
        return this.programId;
    }

    public void setProgramName (String programName) {
        this.programName = programName;
    }

    public String getProgramName () {
        return this.programName.trim ().replaceAll ("\\s+", " ");
    }

    public void setProgramLink (String programLink) {
        this.programLink = programLink;
    }

    public String getProgramLink () {
        return this.programLink;
    }

    public void setProgramLevel (String programLevel) {
        this.programLevel = programLevel;
    }

    public String getProgramLevel () {
        return this.programLevel;
    }
}
