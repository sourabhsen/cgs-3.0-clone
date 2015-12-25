package com.aptimus.careers.test.milestones;

import static com.aptimus.careers.util.PageHelper.ListType.CAREER_PLAN_STEP;
import java.util.List;
import org.apache.http.cookie.Cookie;
import com.aptimus.careers.dto.playlist.Queue;
import com.aptimus.careers.dto.playlist.Queue.Item;
import com.aptimus.careers.dto.playlist.Queue.ListItem;
import com.aptimus.careers.test.CareerBaseBrowser;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.careers.util.CareerHttpClient;
import com.aptimus.careers.util.TestHelper;
import com.aptimus.test.selenium.Logging;
import com.google.gson.Gson;

public class CareerPlanTestBase extends CareerBaseBrowser {

    private final String tenant = CareerEnvironment.tenant;

    protected void deleteCompletedStages () {
        List <Cookie> cookies = getCookies ();
        String profileId = TestHelper.getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + tenant + "/users/" + profileId + "/lists";
        ListItem list = getCompletedStages (cookies);
        if (list != null) {
            list.setListItems (null);
            String response = CareerHttpClient.deleteUrl (url + "/" + list.getListId (), cookies);
            Logging.info ("deleting Milestones for user: " + profileId + ", status: " + response);
        }
    }

    private ListItem getCompletedStages (List <Cookie> cookies) {
        String profileId = TestHelper.getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + tenant + "/users/" + profileId + "/lists";
        try {
            Queue list = new Gson ().fromJson (CareerHttpClient.getUrl (url, cookies), Queue.class);
            for (ListItem listItem : list.getList ()) {
                if (listItem.getListType ().equals (CAREER_PLAN_STEP.name ()))
                    return listItem;
            }
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }
        return null;
    }

    private Item stageItem (String identifier) {
        return new Item (identifier, "COMPLETE", CAREER_PLAN_STEP.name ());
    }

    protected void almostCompleteMilestones () {
        List <Cookie> cookies = getCookies ();
        String profileId = TestHelper.getUserProfileId (cookies);
        String url = CareerEnvironment.baseUrl + "/api/playlist-service/1/" + tenant + "/users/" + profileId + "/lists";
        ListItem list = getCompletedStages (cookies);
        if (list != null)
            list.setListItems (null);

        list.setListItem (stageItem ("/career-plan/milestones/goals/chart-your-career-path"));
        list.setListItem (stageItem ("/career-exploration"));
        list.setListItem (stageItem ("/career-plan/milestones/skills/skill-basics"));
        list.setListItem (stageItem ("/career-plan/milestones/skills/gaining-experience"));
        list.setListItem (stageItem ("/skill-builder"));
        list.setListItem (stageItem ("/career-plan/milestones/resume/learn-what-recruiters-want"));
        list.setListItem (stageItem ("/career-plan/milestones/resume/create-your-resume"));
        list.setListItem (stageItem ("/resume-builder"));
        list.setListItem (stageItem ("/career-plan/milestones/image/whats-your-brand"));
        list.setListItem (stageItem ("/career-plan/milestones/image/elevator-pitch"));
        list.setListItem (stageItem ("/career-plan/milestones/image/online-presence"));
        list.setListItem (stageItem ("/career-plan/milestones/image/linkedin-basics"));
        list.setListItem (stageItem ("/career-plan/milestones/image/dress-for-success"));
        list.setListItem (stageItem ("/career-plan/milestones/network/network-basics"));
        list.setListItem (stageItem ("/career-plan/milestones/network/mentor"));
        list.setListItem (stageItem ("/career-plan/milestones/network/linkedin"));
        list.setListItem (stageItem ("/career-plan/milestones/network/phoenix-connect"));
        list.setListItem (stageItem ("/career-plan/milestones/network/professional-organizations"));
        list.setListItem (stageItem ("/career-plan/milestones/network/promote-yourself"));
        list.setListItem (stageItem ("/career-plan/milestones/network/plan"));
        list.setListItem (stageItem ("/career-plan/milestones/letter/what-employers-want-to-see"));
        list.setListItem (stageItem ("/career-plan/milestones/letter/get-your-story-straight"));
        list.setListItem (stageItem ("/career-plan/milestones/letter/perfect-your-letter"));
        list.setListItem (stageItem ("/career-plan/milestones/interview/learn-what-employers-want"));
        list.setListItem (stageItem ("/career-plan/milestones/interview/be-a-good-storyteller"));
        list.setListItem (stageItem ("/career-plan/milestones/interview/do-your-research"));
        list.setListItem (stageItem ("/interview-preparation"));
        list.setListItem (stageItem ("/career-plan/milestones/interview/explain-your-career-history"));
        list.setListItem (stageItem ("/career-plan/milestones/interview/show-excitement"));
        list.setListItem (stageItem ("/career-plan/milestones/interview/practice-makes-perfect"));
        list.setListItem (stageItem ("/career-plan/milestones/interview/informational-interviews"));
        list.setListItem (stageItem ("/career-plan/milestones/strategies/what-hiring-managers-want"));
        list.setListItem (stageItem ("/career-plan/milestones/strategies/select-and-prioritize-job-postings"));
        list.setListItem (stageItem ("/career-plan/milestones/strategies/apply-through-an-insider"));
        list.setListItem (stageItem ("/career-plan/milestones/apply/customize"));
        list.setListItem (stageItem ("/job-search"));
        list.setListItem (stageItem ("/career-plan/milestones/apply/application-tracker"));
        list.setListItem (stageItem ("/career-plan/milestones/apply/prepare"));
        list.setListItem (stageItem ("/career-plan/milestones/apply/follow-up"));
        list.setListItem (stageItem ("/career-plan/milestones/apply/job-offers"));

        String response = CareerHttpClient.postUrl (url, new Gson ().toJson (list), cookies);
        Logging.info ("setting Milestones for user: " + profileId + ", status: " + response);
    }
}
