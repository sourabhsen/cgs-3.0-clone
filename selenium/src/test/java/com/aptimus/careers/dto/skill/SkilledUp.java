package com.aptimus.careers.dto.skill;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringEscapeUtils;

public class SkilledUp {

    private Map <String, Facet> facets  = new HashMap <String, Facet> ();
    private List <Course>       results = new ArrayList <Course> ();
    private int                 pageNumber;
    private int                 pageSize;
    private int                 totalPages;
    private int                 numberOfElements;
    private int                 totalNumberOfResults;

    public void setFacets (Map <String, Facet> facets) {
        this.facets = facets;
    }

    public Map <String, Facet> getFacets () {
        return this.facets;
    }

    public List <Range> getRanges () {
        return this.facets.get ("price").getRanges ();
    }

    public List <Term> getTerms () {
        return this.facets.get ("product.type").getTerms ();
    }

    public void setCourses (List <Course> results) {
        this.results = results;
    }

    public List <Course> getCourses () {
        return this.results;
    }

    public void setPageNumber (int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageNumber () {
        return this.pageNumber;
    }

    public void setPageSize (int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageSize () {
        return this.pageSize;
    }

    public void setTotalPages (int totalPages) {
        this.totalPages = totalPages;
    }

    public int getTotalPages () {
        return this.totalPages;
    }

    public void setNumberOfElements (int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    public int getNumberOfElements () {
        return this.numberOfElements;
    }

    public void setTotalNumberOfResults (int totalNumberOfResults) {
        this.totalNumberOfResults = totalNumberOfResults;
    }

    public int getTotalNumberOfResults () {
        return this.totalNumberOfResults;
    }

    public class Facet {

        private List <Range> ranges = new ArrayList <Range> ();
        private List <Term>  terms  = new ArrayList <Term> ();

        public List <Range> getRanges () {
            return this.ranges;
        }

        public List <Term> getTerms () {
            return this.terms;
        }
    }

    public static class Range {

        private String  from;
        private String  to;
        private Integer count;
        private Integer totalCount;

        public Range (String from, String to, Integer count, Integer totalCount) {
            this.from = from;
            this.to = to;
            this.count = count;
            this.totalCount = totalCount;
        }

        public Range () {}

        public String getFrom () {
            return this.from;
        }

        public void setTo (String to) {
            this.to = to;
        }

        public String getTo () {
            return this.to;
        }

        public void setCount (Integer count) {
            this.count = count;
        }

        public Integer getCount () {
            return this.count;
        }

        public void setTotalCount (Integer totalCount) {
            this.totalCount = totalCount;
        }

        public Integer getTotalCount () {
            return this.totalCount;
        }

        public void setFrom (String from) {
            this.from = from;
        }
    }

    public static class Term {

        private String term;
        private int    count;
        private String text;

        public void setTerm (String term) {
            this.term = term;
        }

        public String getTerm () {
            return this.term;
        }

        public void setCount (int count) {
            this.count = count;
        }

        public int getCount () {
            return this.count;
        }

        public void setText (String text) {
            this.text = text;
        }

        public String getText () {
            return this.text;
        }
    }

    public static class Course {

        private String       id;
        private String       name;
        private Provider     provider;
        private String       description;
        private Author       author;
        private String       durationDisplay;
        private List <Offer> offers = new ArrayList <Offer> ();

        public void setId (String id) {
            this.id = id;
        }

        public String getId () {
            return this.id;
        }

        public void setName (String name) {
            this.name = name;
        }

        public String getName () {
            String tmp = StringEscapeUtils.unescapeHtml4 (this.name)
                    .replace ("\n", " ").replace ("&apos;", "'").replaceAll ("\\s+", " ").trim ();
            return tmp.length () > 290 ? tmp.substring (0, 290) : tmp;
        }

        public void setProvider (Provider provider) {
            this.provider = provider;
        }

        public Provider getProvider () {
            return this.provider;
        }

        public void setDescription (String description) {
            this.description = description;
        }

        public String getDescription () {
            if (this.description == null)
                return this.description;
            else
                return StringEscapeUtils.unescapeHtml4 (this.description)
                        .replaceAll ("</?i>", "").replaceAll ("<a href(.*?)>", "").replaceAll ("</a>", "")
                        .replaceAll ("[^\\p{L}\\p{Z}]", " ").replace ("é", " ")
                        .replace ("â", "").replace ("ÃÂÂ", "").replace ("ÃÂ", "").replace ("Â", "").replace ("Ã", "")
                        .replace ("ï", "").replaceAll ("[\\s\u00A0]+", " ").replaceAll ("\\s+", " ").trim ();
        }

        public void setDurationDisplay (String durationDisplay) {
            this.durationDisplay = durationDisplay;
        }

        public String getDurationDisplay () {
            return this.durationDisplay;
        }

        public void setAuthor (Author author) {
            this.author = author;
        }

        public Author getAuthor () {
            return this.author;
        }

        public void setOffers (List <Offer> offers) {
            this.offers = offers;
        }

        public List <Offer> getOffers () {
            return this.offers;
        }

        public Offer getOffer (int idx) {
            return this.offers.get (idx);
        }
    }

    public static class Provider {

        private String name;

        public Provider (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name;
        }
    }

    public static class Author {

        private String name;

        public Author (String name) {
            this.name = name;
        }

        public String getName () {
            return this.name != null ? this.name.replaceAll ("\\s+", " ").trim () : this.name;
        }
    }

    public static class Offer {

        private Price price;

        public Offer (Price price) {
            this.price = price;
        }

        public Price getPrice () {
            return this.price;
        }
    }

    public static class Price {

        private String displayText;

        public Price (String displayText) {
            this.displayText = displayText;
        }

        public void setDisplayText (String displayText) {
            this.displayText = displayText;
        }

        public String getDisplayText () {
            return this.displayText;
        }
    }
}
