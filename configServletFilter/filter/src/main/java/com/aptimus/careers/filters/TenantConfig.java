package com.aptimus.careers.filters;

import org.apache.commons.lang.StringUtils;

import java.util.Map;

/**
 * TenantConfig Author Satish Gunnu Date: 10/1/15 Time: 11:22 AM Updated by
 * ${Author} on ${Date} Copyright Aptimus (C) 2012 All rights reserved.
 */
public class TenantConfig {

    private String cachedConfigJsonStr;  // Config as JSON string
    private String cachedConfigReplacementJsCode; // config replacement javascript code
    private String cachedTenantJsReplacementCode;   // replacement tenant js include
    private String cachedTenantCssReplacementCode;   // replacement tenant css include
    private String cachedTrackingUrlJsCode; // tracking url (run at top) javascript code
    private String cachedTrackingInlineJsCode; // tracking inline (run at bottom) javascript code
    private String domain;
    private Map<String, Object> propertiesMap;
    private String tenant;
    private String uiTenant;

    public String getCachedConfigJsonStr() {
        return cachedConfigJsonStr;
    }

    public void setCachedConfigJsonStr(String cachedConfigJsonStr) {
        this.cachedConfigJsonStr = cachedConfigJsonStr;
    }

    public String getCachedConfigReplacementJsCode() {
        return cachedConfigReplacementJsCode;
    }

    public void setCachedConfigReplacementJsCode(String cachedConfigReplacementJsCode) {
        this.cachedConfigReplacementJsCode = cachedConfigReplacementJsCode;
    }

    public String getCachedTenantJsReplacementCode() {
        return cachedTenantJsReplacementCode;
    }

    public void setCachedTenantJsReplacementCode(String cachedTenantJsReplacementCode) {
        this.cachedTenantJsReplacementCode = cachedTenantJsReplacementCode;
    }
    
    public String getCachedTenantCssReplacementCode() {
        return cachedTenantCssReplacementCode;
    }

    public void setCachedTenantCssReplacementCode(String cachedTenantCssReplacementCode) {
        this.cachedTenantCssReplacementCode = cachedTenantCssReplacementCode;
    }

    public String getCachedTrackingUrlJsCode() {
        return cachedTrackingUrlJsCode;
    }

    public void setCachedTrackingUrlJsCode(String cachedTrackingUrlJsCode) {
        this.cachedTrackingUrlJsCode = cachedTrackingUrlJsCode;
    }

    public String getCachedTrackingInlineJsCode() {
        return cachedTrackingInlineJsCode;
    }

    public void setCachedTrackingInlineJsCode(String cachedTrackingInlineJsCode) {
        this.cachedTrackingInlineJsCode = cachedTrackingInlineJsCode;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public Map<String, Object> getPropertiesMap() {
        return propertiesMap;
    }

    public void setPropertiesMap(Map<String, Object> propertiesMap) {
        this.propertiesMap = propertiesMap;
    }

    public String getTenant() {
        return tenant;
    }

    public void setTenant(String tenant) {
        this.tenant = tenant;
    }

    public String getUiTenant() {
        if (StringUtils.isNotBlank(uiTenant))
            return uiTenant;
        return tenant;
    }

    public void setUiTenant(String uiTenant) {
        this.uiTenant = uiTenant;
    }

    @Override
    public String toString() {
        return "TenantConfig{" +
                "cachedConfigJsonStr='" + cachedConfigJsonStr + '\'' +
                ", cachedConfigReplacementJsCode='" + cachedConfigReplacementJsCode + '\'' +
                ", cachedTenantJsReplacementCode='" + cachedTenantJsReplacementCode + '\'' +
                ", cachedTenantCssReplacementCode='" + cachedTenantCssReplacementCode + '\'' +
                ", cachedTrackingUrlJsCode='" + cachedTrackingUrlJsCode + '\'' +
                ", cachedTrackingInlineJsCode='" + cachedTrackingInlineJsCode + '\'' +
                ", domain='" + domain + '\'' +
                ", propertiesMap=" + propertiesMap +
                ", tenant='" + tenant + '\'' +
                ", uiTenant='" + uiTenant + '\'' +
                '}';
    }
}
