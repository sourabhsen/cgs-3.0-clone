package com.aptimus.careers.dto.jobs;

public class Recommendation {

    private String itemType;
    private Long   itemId;
    private String recommendationType;
    private Long   recommendedItemId;
    private Double recommendationQuality;

    public Double getRecommendationQuality () {
        return recommendationQuality;
    }

    public void setRecommendationQuality (Double recommendationQuality) {
        this.recommendationQuality = recommendationQuality;
    }

    public String getItemType () {
        return itemType;
    }

    public void setItemType (String itemType) {
        this.itemType = itemType;
    }

    public Long getItemId () {
        return itemId;
    }

    public void setItemId (Long itemId) {
        this.itemId = itemId;
    }

    public String getRecommendationType () {
        return recommendationType;
    }

    public void setRecommendationType (String recommendationType) {
        this.recommendationType = recommendationType;
    }

    public Long getRecommendedItemId () {
        return recommendedItemId;
    }

    public void setRecommendedItemId (Long recommendedItemId) {
        this.recommendedItemId = recommendedItemId;
    }
}
