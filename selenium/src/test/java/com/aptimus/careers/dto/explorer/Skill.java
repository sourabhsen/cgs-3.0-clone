package com.aptimus.careers.dto.explorer;

import org.apache.commons.lang3.StringEscapeUtils;

public class Skill {

    private String id;
    private String name;
    private String skillType;
    private String jobSkillType;
    private String demandPercentile;
    // for Skill Builder
    private int    skillId;
    private String displayName;
    private String description;

    public void setId (String id) {
        this.id = id;
    }

    public String getId () {
        return this.id;
    }

    public void setName (String name) {
        this.name = name;
    }

    public String getName () {
        return this.name;
    }

    public void setSkillType (String skillType) {
        this.skillType = skillType;
    }

    public String getSkillType () {
        return this.skillType;
    }

    public void setJobSkillType (String jobSkillType) {
        this.jobSkillType = jobSkillType;
    }

    public String getJobSkillType () {
        return this.jobSkillType;
    }

    public void setDemandPercentile (String demandPercentile) {
        this.demandPercentile = demandPercentile;
    }

    public String getDemandPercentile () {
        return this.demandPercentile;
    }

    public void setSkillId (int skillId) {
        this.skillId = skillId;
    }

    public int getSkillId () {
        return this.skillId;
    }

    public void setDisplayName (String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName () {
        return this.displayName;
    }

    public void setDescription (String description) {
        this.description = description;
    }

    public String getDescription () {
        return StringEscapeUtils.unescapeHtml4 (this.description);
    }
}
