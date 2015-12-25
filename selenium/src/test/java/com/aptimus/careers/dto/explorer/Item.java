package com.aptimus.careers.dto.explorer;

import java.util.List;

public class Item {

    private List <LaborData> items;

    public void setItems (List <LaborData> items) {
        this.items = items;
    }

    public void setItems (LaborData item) {
        this.items.add (item);
    }

    public List <LaborData> getItems () {
        return this.items;
    }

    public LaborData getItem (int index) {
        return this.items.get (index);
    }
}
