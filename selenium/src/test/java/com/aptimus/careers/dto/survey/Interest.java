package com.aptimus.careers.dto.survey;

import java.util.ArrayList;
import java.util.List;

public class Interest {

    private List <Occupational> occupationalInterest = new ArrayList <Occupational> ();

    public void setOccupationalInterest (List <Occupational> occupationalInterest) {
        this.occupationalInterest = occupationalInterest;
    }

    public Occupational getOccupationalInterest (String name) {
        for (Occupational occupational : this.occupationalInterest)
            if (occupational.getName ().equals (name))
                return occupational;
        return null;
    }

    public List <Occupational> getOccupationalInterest () {
        return this.occupationalInterest;
    }

    public class Occupational {

        private String elementId;
        private String name;
        private String description;

        public void setElementId (String elementId) {
            this.elementId = elementId;
        }

        public String getElementId () {
            return this.elementId;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setDescription (String description) {
            this.description = description;
        }

        public String getDescription () {
            return this.description;
        }
    }
}
