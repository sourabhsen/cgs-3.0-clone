package com.aptimus.careers.dto.jobs;

import java.util.ArrayList;
import java.util.List;

public class StateList {

    private List <State> items = new ArrayList <State> ();

    public void setItems (List <State> items) {
        this.items = items;
    }

    public List <State> getItems () {
        return this.items;
    }

    public State getStateAreaId (String city) {
        for (State item : items)
            if (item.getStateAreaName ().toLowerCase ().contains (city.toLowerCase ()))
                return item;
        return null;
    }
    
    public State getStateByCode (String stateCode) {
        for (State item : items)
            if (item.getStateCode ().equalsIgnoreCase (stateCode.trim ()))
                return item;
        return null;
    }

    public class State {

        private String stateName;
        private String stateCode;
        private String stateAreaName;
        private String stateAreaCode;

        public void setStateName (String stateName) {
            this.stateName = stateName;
        }

        public String getStateName () {
            return this.stateName;
        }

        public void setStateCode (String stateCode) {
            this.stateCode = stateCode;
        }

        public String getStateCode () {
            return this.stateCode;
        }

        public void setStateAreaName (String stateAreaName) {
            this.stateAreaName = stateAreaName;
        }

        public String getStateAreaName () {
            return this.stateAreaName;
        }

        public void setStateAreaCode (String stateAreaCode) {
            this.stateAreaCode = stateAreaCode;
        }

        public String getStateAreaCode () {
            return this.stateAreaCode;
        }
    }
}
