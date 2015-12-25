package com.aptimus.careers.ui.resume;

public class PublishPreview extends MainResume {

    private final String modal = "body.modal-open > div.padded-modal-content";

    public boolean isPublishPreviewPresent () {
        String container = modal + " section#resume-preview-dialog";
        return waitUntilVisible (modal) && waitUntilVisible (container + " iframe[title='Resume Preview']");
    }

    public boolean closePreview () {
        boolean status = click (modal + " a.modal-close-link span");
        status &= waitForElementInvisible (modal + " section#resume-preview-dialog");
        return status;
    }
}
