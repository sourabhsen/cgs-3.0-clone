package com.aptimus.careers.dto.survey;

import java.util.ArrayList;
import java.util.List;

public class Answers {

    private String             lastModified;
    private String             name;
    private List <Answer>      questions = new ArrayList <Answer> ();
    private List <AnswerScore> scores    = new ArrayList <AnswerScore> ();

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

    public void setQuestions (List <Answer> questions) {
        this.questions = questions;
    }

    public void setQuestions (Answer question) {
        this.questions.add (question);
    }

    public List <Answer> getQuestions () {
        return this.questions;
    }

    public Answer getQuestion (int idx) {
        return this.questions.get (idx);
    }

    public Answer getQuestionByValue (String value) {
        for (Answer answer : this.questions)
            if (answer.getOptionValues ().contains (value))
                return answer;
        return null;
    }

    public void setAnswerScores (List <AnswerScore> scores) {
        this.scores = scores;
    }

    public AnswerScore getAnswerScore (String category) {
        for (AnswerScore score : this.scores)
            if (score.getCategory ().equals (category))
                return score;
        return null;
    }

    public List <AnswerScore> getAnswerScores () {
        return this.scores;
    }

    public static class Answer {

        private String        itemId;
        private List <String> optionValues = new ArrayList <String> ();

        public void setItemId (String itemId) {
            this.itemId = itemId;
        }

        public String getItemId () {
            return this.itemId;
        }

        public void setOptionValues (String optionValue) {
            this.optionValues.add (optionValue);
        }

        public List <String> getOptionValues () {
            return this.optionValues;
        }

        public String getOptionValues (int i) {
            return this.optionValues.get (i);
        }
    }

    public class AnswerScore {

        private String       status;
        private String       category;
        private List <Score> scores = new ArrayList <Score> ();

        public void setStatus (String status) {
            this.status = status;
        }

        public String getStatus () {
            return this.status;
        }

        public void setCategory (String category) {
            this.category = category;
        }

        public String getCategory () {
            return this.category;
        }

        public void setScores (List <Score> scores) {
            this.scores = scores;
        }

        public Score getScore (String scoreName) {
            for (Score score : this.scores)
                if (score.getScoreName ().equals (scoreName))
                    return score;
            return null;
        }

        public List <Score> getScores () {
            return this.scores;
        }
    }

    public class Score {

        private String scoreName;
        private String scoreValue;

        public void setScoreName (String scoreName) {
            this.scoreName = scoreName;
        }

        public String getScoreName () {
            return this.scoreName;
        }

        public void setScoreValue (String scoreValue) {
            this.scoreValue = scoreValue;
        }

        public String getScoreValue () {
            return this.scoreValue;
        }
    }
}
