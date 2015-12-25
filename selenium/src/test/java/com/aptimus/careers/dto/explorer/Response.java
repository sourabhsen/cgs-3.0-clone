package com.aptimus.careers.dto.explorer;

import java.util.List;

public class Response {

    private String requestId;
    private String timestamp;
    private String status;
    private String statusCode;
    private Result result;

    public void setRequestId (String requestId) {
        this.requestId = requestId;
    }

    public String getRequestId () {
        return this.requestId;
    }

    public void setTimestamp (String timestamp) {
        this.timestamp = timestamp;
    }

    public String getTimestamp () {
        return this.timestamp;
    }

    public void setStatus (String status) {
        this.status = status;
    }

    public String getStatus () {
        return this.status;
    }

    public void setStatusCode (String statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusCode () {
        return this.statusCode;
    }

    public void setResult (Result result) {
        this.result = result;
    }

    public Result getresult () {
        return this.result;
    }

    public class Result {

        private String           offset;
        private String           limit;
        private String           count;
        private String           totalCount;
        private List <LaborData> data;

        public void setOffset (String offset) {
            this.offset = offset;
        }

        public String getOffset () {
            return this.offset;
        }

        public void setLimit (String limit) {
            this.limit = limit;
        }

        public String getLimit () {
            return this.limit;
        }

        public void setCount (String count) {
            this.count = count;
        }

        public String getCount () {
            return this.count;
        }

        public void setTotalCount (String totalCount) {
            this.totalCount = totalCount;
        }

        public String getTotalCount () {
            return this.totalCount;
        }

        public void setData (List <LaborData> data) {
            this.data = data;
        }

        public List <LaborData> getData () {
            return this.data;
        }
    }
}
