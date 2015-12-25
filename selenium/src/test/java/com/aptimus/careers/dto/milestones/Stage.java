package com.aptimus.careers.dto.milestones;

public class Stage {

    private String  id;
    private String  stageNumber;
    private boolean done;
    private String  title;
    private String  description;
    private String  duration;
    private boolean tool;

    public String getId () {
        return this.id;
    }

    public void setId (String id) {
        this.id = id;
    }

    public String getStageNumber () {
        return stageNumber;
    }

    public void setStageNumber (String stageNumber) {
        this.stageNumber = stageNumber;
    }

    public boolean isDone () {
        return done;
    }

    public void markDone (boolean done) {
        this.done = done;
    }

    public String getTitle () {
        return title;
    }

    public void setTitle (String title) {
        this.title = title;
    }

    public String getDescription () {
        return description;
    }

    public void setDescription (String description) {
        this.description = description;
    }

    public String getDuration () {
        return duration;
    }

    public void setDuration (String duration) {
        this.duration = duration;
    }

    public boolean isForTool () {
        return tool;
    }

    public void forTool (boolean tool) {
        this.tool = tool;
    }
}
