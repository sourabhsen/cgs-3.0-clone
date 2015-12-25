package com.aptimus.careers.dto.survey;

import java.util.ArrayList;
import java.util.List;

public class Questionnaire {

    private String          description;
    private String          lastModified;
    private String          name;
    private List <Question> questions = new ArrayList <Question> ();

    public void setDescription (String description) {
        this.description = description;
    }

    public String getDescription () {
        return this.description;
    }

    public void setLastModified (String lastModified) {
        this.lastModified = lastModified;
    }

    public String getLastModified () {
        return this.lastModified;
    }

    public void setName (String name) {
        this.name = name;
    }

    public String getName () {
        return this.name;
    }

    public void setQuestions (List <Question> questions) {
        this.questions = questions;
    }

    public List <Question> getQuestions () {
        return this.questions;
    }

    public Question getQuestions (int itemId) {
        for (Question question : this.questions)
            if (question.getItemId ().equals (String.valueOf (itemId)))
                return question;
        return null;
    }

    public static class Question {

        private String        itemId;
        private String        itemText;
        private String        questionURI;
        private List <Option> optionValues = new ArrayList <Option> ();

        public void setItemId (String itemId) {
            this.itemId = itemId;
        }

        public String getItemId () {
            return this.itemId;
        }

        public void setItemText (String itemText) {
            this.itemText = itemText;
        }

        public String getItemText () {
            return this.itemText;
        }

        public void setOptionValues (List <Option> optionValues) {
            this.optionValues = optionValues;
        }

        public void setOptionValues (Option optionValue) {
            this.optionValues.add (optionValue);
        }

        public List <Option> getOptionValues () {
            return this.optionValues;
        }

        public Option getOptionValue (int idx) {
            return this.optionValues.get (idx);
        }

        public void setQuestionURI (String questionURI) {
            this.questionURI = questionURI;
        }

        public String getQuestionURI () {
            return this.questionURI;
        }
    }

    public static class Option {

        private String  optionLabel;
        private String  optionValue;
        private String  optionURI;
        private boolean selected;

        public void setOptionLabel (String optionLabel) {
            this.optionLabel = optionLabel;
        }

        public String getOptionLabel () {
            return this.optionLabel;
        }

        public void setOptionValue (String optionValue) {
            this.optionValue = optionValue;
        }

        public String getOptionValue () {
            return this.optionValue;
        }

        public void setSelected (boolean isSelected) {
            this.selected = isSelected;
        }

        public boolean isSelected () {
            return this.selected;
        }

        public void setOptionURI (String optionURI) {
            this.optionURI = optionURI;
        }

        public String getOptionURI () {
            return this.optionURI;
        }
    }

}
