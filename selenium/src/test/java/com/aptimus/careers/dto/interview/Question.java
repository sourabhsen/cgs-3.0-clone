package com.aptimus.careers.dto.interview;

public class Question {

    private int    number;
    private String title;

    public void setNumber (int number) {
        this.number = number;
    }

    public int getNumber () {
        return this.number;
    }

    public void setTitle (String title) {
        this.title = title;
    }

    public String getTitle () {
        return this.title;
    }
}
