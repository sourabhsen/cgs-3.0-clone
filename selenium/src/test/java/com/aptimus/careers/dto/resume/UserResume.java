package com.aptimus.careers.dto.resume;

import com.aptimus.careers.dto.resume.Resumes.Resume;

public class UserResume {

    private String name;
    private Resume resume;
    private String primaryInd;
    private String status;
    private String resumeId;
    private String documentId;
    private String documentType;

    public void setName (String name) {
        this.name = name;
    }

    public String getName () {
        return this.name;
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

    public void setResumeId (String resumeId) {
        this.resumeId = resumeId;
    }

    public String getResumeId () {
        return this.resumeId;
    }

    public void setResume (Resume resume) {
        this.resume = resume;
    }

    public Resume getResume () {
        return this.resume;
    }

    public void setDocumentId (String documentId) {
        this.documentId = documentId;
    }

    public String getDocumentId () {
        return this.documentId;
    }

    public void setDocumentType (String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentType () {
        return this.documentType;
    }
}
