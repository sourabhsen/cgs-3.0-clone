package com.aptimus.careers.ui.jobs;

public class MainSavedJobs extends MainJob {

    protected final String container = "div#saved-jobs-list-container";

    protected boolean clickSavedTab () {
        return click (container + " > ul#atsTabs a.savedJobs");
    }

    protected boolean clickAppliedTab () {
        return click (container + " > ul#atsTabs a.appliedJobs");
    }
}
