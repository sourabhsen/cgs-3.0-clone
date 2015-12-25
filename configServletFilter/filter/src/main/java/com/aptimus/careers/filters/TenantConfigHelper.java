package com.aptimus.careers.filters;

import com.aptimus.api.utils.http.client.HttpClientHelper;
import com.aptimus.api.utils.serialization.JacksonUtils;
import com.aptimus.apticore.dto.Environment;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.methods.HttpGet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * TenantConfigHelper Author Satish Gunnu Date: 10/1/15 Time: 10:34 AM Updated
 * by ${Author} on ${Date} Copyright Aptimus (C) 2015 All rights reserved.
 */
public class TenantConfigHelper {

    private String baseServiceUrl;
    private HttpClientHelper httpClientHelper;
    private String serviceUserName;
    private String servicePassword;
    private String defaultTenant = "cgsdemo";
    private String cfgReplaceJsCode = "['$q', function($q) { return $q.when([CONFIG]);}]"; //replacement javascript code where [CONFIG] gets replace by the actual value
    private String cfgReplaceTenantCssCode = "<link rel=\"stylesheet\" href=\"[CDN]/tenant/[TENANT]/styles/index.css\">";  //replacement tenant css include
    private String cfgReplaceTenantJsCode = "<script src=\"[CDN]/tenant/[TENANT]/js/tenantTemplateCache.js\"></script>";  //replacement tenant js include
    private String cfgTrackingUrlReplaceJsCode = "<script src=\"[URL]\"></script>";  //replacement javascript code where [URL] gets replaced by the actual value
    private String cfgTrackingInlineReplaceJsCode = "<script type=\"text/javascript\">[CODE]</script>";  //replacement javascript code where [CODE] gets replaced by the actual value
    private static final Logger log = LoggerFactory.getLogger(TenantConfigHelper.class);
    private Map<String, TenantConfig> tenantConfigMap = new HashMap<String, TenantConfig>();
    private static final ReentrantReadWriteLock LOCK = new ReentrantReadWriteLock();

    public TenantConfigHelper() {
        this(null, null, null, null, null, null);
    }

    public TenantConfigHelper(String defaultTenant, String cfgReplaceJsCode, String cfgReplaceTenantJsCode, String cfgReplaceTenantCssCode, String cfgTrackingUrlReplaceJsCode, String cfgTrackingInlineReplaceJsCode) {
        this.defaultTenant = isNullOrEmpty(defaultTenant) ? this.defaultTenant : defaultTenant;
        this.cfgReplaceJsCode = isNullOrEmpty(cfgReplaceJsCode) ? this.cfgReplaceJsCode : cfgReplaceJsCode;
        this.cfgReplaceTenantJsCode = isNullOrEmpty(cfgReplaceTenantJsCode) ? this.cfgReplaceTenantJsCode : cfgReplaceTenantJsCode;
        this.cfgReplaceTenantCssCode = isNullOrEmpty(cfgReplaceTenantCssCode) ? this.cfgReplaceTenantCssCode : cfgReplaceTenantCssCode;
        this.cfgTrackingUrlReplaceJsCode = isNullOrEmpty(cfgTrackingUrlReplaceJsCode) ? this.cfgTrackingUrlReplaceJsCode : cfgTrackingUrlReplaceJsCode;
        this.cfgTrackingInlineReplaceJsCode = isNullOrEmpty(cfgTrackingInlineReplaceJsCode) ? this.cfgTrackingInlineReplaceJsCode : cfgTrackingInlineReplaceJsCode;

        setServicesUrl();
        httpClientHelper = new HttpClientHelper();
        loadConfig();
    }

    private void setServicesUrl() {
        switch (Environment.getCurrent()) {
            case QA:
                baseServiceUrl = "https://developer.qa.aptimus.net/api";
                break;
            case UAT:
                baseServiceUrl = "https://developer.uat.aptimus.net/api";
                break;
            case PREPROD:
                baseServiceUrl = "https://developer.preprod.aptimus.net/api";
                break;
            case PRODUCTION:
                baseServiceUrl = "https://developer.aptimus.com/api";
                break;
            case DEVINT:
            default:
                baseServiceUrl = "https://developer.devint.aptimus.net/api";
        }
    }

    private void loadConfig() {
        try {
            Map<String, TenantConfig> tempTenantConfigMap = new HashMap<String, TenantConfig>();
            Map<String, Map> tempTenantDomainMap = new HashMap<String, Map>();
            try {
                tempTenantDomainMap = retrieveDomainMappings();
            } catch (Throwable e) {
                log.error("Error retrieving tenant map config for ", e);
                // If fails to retrieve just use default tenant config. so app would function for default tenant.
            }
            for (String tenant : tempTenantDomainMap.keySet()) {
                TenantConfig tenantConfig = null;
                try {
                    tenantConfig = retrieveConfig(tenant);
                    tenantConfig.setTenant((String)tempTenantDomainMap.get(tenant).get("tenant"));
                    tenantConfig.setDomain((String)tempTenantDomainMap.get(tenant).get("domain"));
                    if (StringUtils.isNotBlank((String)tempTenantDomainMap.get(tenant).get("uiTenant"))) {
                        tenantConfig.setUiTenant((String)tempTenantDomainMap.get(tenant).get("uiTenant"));
                    }
                } catch (Throwable e) {
                    log.error("Error retrieving tenant config for " + tenant, e);
                }
                if (tenantConfig != null) {
                    tempTenantConfigMap.put(tenant, tenantConfig);
                }
            }
            LOCK.writeLock().lock();
            tenantConfigMap = tempTenantConfigMap;
        } finally {
            LOCK.writeLock().unlock();
        }
    }


    public void reloadConfig() {
        loadConfig();
    }

    public TenantConfig getTenantConfig(String tenant) {
        try {
            LOCK.readLock().lock();
            return tenantConfigMap.get(tenant);
        } finally {
            LOCK.readLock().unlock();
        }
    }

    public String getTenantFromDomain(String domain) {
        try {
            LOCK.readLock().lock();
            for (Map.Entry<String, TenantConfig> tenantConfig : tenantConfigMap.entrySet()) {
                if (tenantConfig.getValue() !=null && domain.equalsIgnoreCase(tenantConfig.getValue().getDomain())) {
                    return tenantConfig.getKey();
                }
            }
        } finally {
            LOCK.readLock().unlock();
        }
        return null;
    }

    public boolean hasDomainMappings() {
        return tenantConfigMap != null && !tenantConfigMap.isEmpty();
    }

    private TenantConfig retrieveConfig(String tenant) throws IOException {
        String url = baseServiceUrl + "/utility/2/" + tenant + "/config/app/cgs/module/main";
        String cachedTrackingUrlJsCode = "";
        String cachedTrackingInlineJsCode = "";
        String cachedReplaceTenantJsCode = "";
        String cachedReplaceTenantCssCode = "";
        String tenantCDN = "";
        TenantConfig tenantConfig = new TenantConfig();
        HttpGet request = new HttpGet(url);
        request.setHeader("Accept", "application/json; charset=UTF-8");

        // use UTF-8 to fix encoding issues with client
        String configJsonStr = new String(httpClientHelper.executeAndReturnAsString(request, serviceUserName, servicePassword).getBytes("UTF-8"));

        tenantConfig.setCachedConfigJsonStr(configJsonStr);
        tenantConfig.setCachedConfigReplacementJsCode(cfgReplaceJsCode.replace("[CONFIG]", configJsonStr));
        Map<String, Object> jsonMap = JacksonUtils.jsonToObject(configJsonStr, Map.class);
        tenantConfig.setPropertiesMap(jsonMap);

        boolean trackingConfigFound = false;
        if (jsonMap != null && jsonMap.containsKey("config")) {
            Map<String, Object> configRoot = (Map<String, Object>) jsonMap.get("config");
            if (configRoot != null && configRoot.containsKey("tracking")) {
                Map<String, Object> trackingRoot = (Map<String, Object>) configRoot.get("tracking");
                if (isNullOrEmpty(cfgTrackingUrlReplaceJsCode) || isNullOrEmpty(trackingRoot.get("url").toString())) {
                    cachedTrackingUrlJsCode = "";
                } else {
                    cachedTrackingUrlJsCode = cfgTrackingUrlReplaceJsCode.replace("[URL]", trackingRoot.get("url").toString());
                }
                cachedTrackingInlineJsCode = cfgTrackingInlineReplaceJsCode.replace("[CODE]", trackingRoot.get("inline").toString());
                trackingConfigFound = true;
            }
            tenantCDN = configRoot.containsKey("tenantCdnUrl") ? configRoot.get("tenantCdnUrl").toString() : "";
        }
        cachedReplaceTenantJsCode = cfgReplaceTenantJsCode.replace("[CDN]", tenantCDN).replace("[TENANT]", tenant);
        tenantConfig.setCachedTenantJsReplacementCode(cachedReplaceTenantJsCode);
        cachedReplaceTenantCssCode = cfgReplaceTenantCssCode.replace("[CDN]", tenantCDN).replace("[TENANT]", tenant);
        tenantConfig.setCachedTenantCssReplacementCode(cachedReplaceTenantCssCode);

        if (!trackingConfigFound) {
            cachedTrackingUrlJsCode = cachedTrackingInlineJsCode = "<!-- tracking config not found -->";
        }
        tenantConfig.setCachedTrackingUrlJsCode(cachedTrackingUrlJsCode);
        tenantConfig.setCachedTrackingInlineJsCode(cachedTrackingInlineJsCode);

        if (log.isDebugEnabled()) {
            log.debug("Retrieved config: {}", tenantConfig.getCachedConfigJsonStr());
            log.debug("Replacement js code: {}", tenantConfig.getCachedConfigReplacementJsCode());
            log.debug("Replacement tenant js code: {}", tenantConfig.getCachedTenantJsReplacementCode());
            log.debug("Replacement tenant css code: {}", tenantConfig.getCachedTenantCssReplacementCode());
            log.debug("Tracking URL js code: {}", tenantConfig.getCachedTrackingUrlJsCode());
            log.debug("Tracking inline js code: {}", tenantConfig.getCachedTrackingInlineJsCode());
        }

        log.info("Retrieved tenant config for tenant {} and the value is \n" + tenantConfig, tenant);

        return tenantConfig;
    }

    private Map<String, Map> retrieveDomainMappings() throws IOException {
        String url = baseServiceUrl + "/utility/2/apti/config/app/cgs/module/domains";
        HttpGet request = new HttpGet(url);
        request.setHeader("Accept", "application/json; charset=UTF-8");
        String configJsonStr = httpClientHelper.executeAndReturnAsString(request, serviceUserName, servicePassword);
        Map<String, Map> tempTenantDomainMap = JacksonUtils.jsonToObject(configJsonStr, Map.class);
        log.info("Loaded domain mappings with values " + tempTenantDomainMap);
        return tempTenantDomainMap;
    }

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static void main(String[] args) {
        TenantConfigHelper tenantConfigHelper = new TenantConfigHelper();
        System.out.println("\n----------");
        System.out.println(tenantConfigHelper.getTenantConfig("uopx"));
        System.out.println("\n----------");
        System.out.println(tenantConfigHelper.getTenantFromDomain("careerguidance.devint.aptimus.net"));
        System.out.println("\n----------");
        System.out.println(tenantConfigHelper.getTenantFromDomain("uopx.careerguidance.devint.aptimus.net"));
        System.out.println("\n----------");
        System.out.println(tenantConfigHelper.getTenantFromDomain("west.careerguidance.devint.aptimus.net"));
        System.out.println("\n----------");
        System.out.println(tenantConfigHelper.getTenantFromDomain("rockit.careerguidance.devint.aptimus.net"));
    }

}
