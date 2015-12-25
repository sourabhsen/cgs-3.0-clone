package com.aptimus.careers.dto.skill;

import java.util.List;
import java.util.Map;
import com.aptimus.careers.dto.explorer.Skill;

public class RSkill {

    private Skill                skill;
    private String               userDeclaredLevel;
    private String               wikipediaUrl;
    private AssessmentData       assessmentData;
    private Map <String, String> userJobCodesThisSkillAppearsIn;

    public void setSkill (Skill skill) {
        this.skill = skill;
    }

    public Skill getSkill () {
        return this.skill;
    }

    public void setUserDeclaredLevel (String userDeclaredLevel) {
        this.userDeclaredLevel = userDeclaredLevel;
    }

    public String getUserDeclaredLevel () {
        return this.userDeclaredLevel;
    }

    public void setWikipediaUrl (String wikipediaUrl) {
        this.wikipediaUrl = wikipediaUrl;
    }

    public String getWikipediaUrl () {
        return this.wikipediaUrl;
    }

    public void setAssessmentData (AssessmentData assessmentData) {
        this.assessmentData = assessmentData;
    }

    public AssessmentData getAssessmentData () {
        return this.assessmentData;
    }

    public void setUserJobCodesThisSkillAppearsIn (Map <String, String> userJobCodesThisSkillAppearsIn) {
        this.userJobCodesThisSkillAppearsIn = userJobCodesThisSkillAppearsIn;
    }

    public Map <String, String> getUserJobCodesThisSkillAppearsIn () {
        return this.userJobCodesThisSkillAppearsIn;
    }

    public static class AssessmentData {

        private String       url;
        private String       description;
        private String       icon;
        private String       name;
        private String       state;
        private List <Score> scores;

        public void setUrl (String url) {
            this.url = url;
        }

        public String getUrl () {
            return this.url;
        }

        public void setDescription (String description) {
            this.description = description;
        }

        public String getDescription () {
            return this.description;
        }

        public void setIcon (String icon) {
            this.icon = icon;
        }

        public String getIcon () {
            return this.icon;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setState (String state) {
            this.state = state;
        }

        public String getState () {
            return this.state;
        }

        public void setScores (List <Score> scores) {
            this.scores = scores;
        }

        public List <Score> getScores () {
            return this.scores;
        }
    }

    public class Score {

        private String  image;
        private boolean isPublic;
        private String  level;
        private boolean thresholdMet;
        private float   percentile;
        private float   rawScore;
        private int     score;
        private String  lastModified;

        public void setImage (String image) {
            this.image = image;
        }

        public String getImage () {
            return this.image;
        }

        public void setIsPublic (boolean isPublic) {
            this.isPublic = isPublic;
        }

        public boolean isPublic () {
            return this.isPublic;
        }

        public void setLevel (String level) {
            this.level = level;
        }

        public String getLevel () {
            return this.level;
        }

        public void setThresholdMet (boolean thresholdMet) {
            this.thresholdMet = thresholdMet;
        }

        public boolean isThresholdMet () {
            return this.thresholdMet;
        }

        public void setPercentile (float percentile) {
            this.percentile = percentile;
        }

        public float getPercentile () {
            return this.percentile;
        }

        public void setRawScore (float rawScore) {
            this.rawScore = rawScore;
        }

        public float getRawScore () {
            return this.rawScore;
        }

        public void setScore (int score) {
            this.score = score;
        }

        public int getScore () {
            return this.score;
        }

        public void setLastModified (String lastModified) {
            this.lastModified = lastModified;
        }

        public String getLastModified () {
            return this.lastModified;
        }
    }
}
