package com.aptimus.careers.dto.playlist;

import java.util.ArrayList;
import java.util.List;

public class Queue {

    private List <ListItem> list = new ArrayList <ListItem> ();

    public void setList (List <ListItem> listItem) {
        this.list = listItem;
    }

    public void setList (ListItem list) {
        this.list.add (list);
    }

    public List <ListItem> getList () {
        return this.list;
    }

    public ListItem getList (int index) {
        return this.list.get (index);
    }

    public static class ListItem {

        private String      createDate;
        private String      description;
        private String      listId;
        private List <Item> listItems;
        private String      listType;
        private String      name;
        private String      ownerType;
        private String      privacyType;
        private String      tenantName;
        private String      userIdentifier;

        public void setCreateDate (String createDate) {
            this.createDate = createDate;
        }

        public String getCreateDate () {
            return this.createDate;
        }

        public void setDescription (String description) {
            this.description = description;
        }

        public String getDescription () {
            return this.description;
        }

        public void setListId (String listId) {
            this.listId = listId;
        }

        public String getListId () {
            return this.listId;
        }

        public void setListItems (List <Item> listItems) {
            this.listItems = listItems;
        }

        public void setListItem (Item listItem) {
            if (this.listItems == null)
                this.listItems = new ArrayList <Item> ();

            this.listItems.add (listItem);
        }

        public List <Item> getListItems () {
            return this.listItems;
        }

        public Item getListItem (int index) {
            return this.listItems.get (index);
        }

        public void setListType (String listType) {
            this.listType = listType;
        }

        public String getListType () {
            return this.listType;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }

        public void setOwnerType (String ownerType) {
            this.ownerType = ownerType;
        }

        public String getOwnerType () {
            return this.ownerType;
        }

        public void setPrivacyType (String privacyType) {
            this.privacyType = privacyType;
        }

        public String getPrivacyType () {
            return this.privacyType;
        }

        public void setTenantName (String tenantName) {
            this.tenantName = tenantName;
        }

        public String getTenantName () {
            return this.tenantName;
        }

        public void setUserIdentifier (String userIdentifier) {
            this.userIdentifier = userIdentifier;
        }

        public String getUserIdentifier () {
            return this.userIdentifier;
        }
    }

    public static class Item {

        private String createDate;
        private String itemIdentifier;
        private int    itemSequence;
        private String itemStatus;
        private String itemType;
        private String listId;
        private String listItemId;

        public Item (String identifier, String status, String type, int sequence, String listId) {
            this (identifier, status, type);
            this.itemSequence = sequence;
            this.listId = listId;
        }

        public Item (String identifier, String status, String type) {
            this.itemIdentifier = identifier;
            this.itemStatus = status;
            this.itemType = type;
        }

        public void setCreateDate (String createDate) {
            this.createDate = createDate;
        }

        public String getCreateDate () {
            return this.createDate;
        }

        public void setItemIdentifier (String itemIdentifier) {
            this.itemIdentifier = itemIdentifier;
        }

        public String getItemIdentifier () {
            return this.itemIdentifier;
        }

        public void setItemSequence (int itemSequence) {
            this.itemSequence = itemSequence;
        }

        public int getItemSequence () {
            return this.itemSequence;
        }

        public void setItemStatus (String itemStatus) {
            this.itemStatus = itemStatus;
        }

        public String getItemStatus () {
            return this.itemStatus;
        }

        public void setItemType (String itemType) {
            this.itemType = itemType;
        }

        public String getItemType () {
            return this.itemType;
        }

        public void setListId (String listId) {
            this.listId = listId;
        }

        public String getListId () {
            return this.listId;
        }

        public void setListItemId (String listItemId) {
            this.listItemId = listItemId;
        }

        public String getListItemId () {
            return this.listItemId;
        }
    }
}
