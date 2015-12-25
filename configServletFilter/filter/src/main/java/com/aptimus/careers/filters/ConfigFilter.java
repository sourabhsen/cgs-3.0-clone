/**
 *
 * @author mmaday
 */
package com.aptimus.careers.filters;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigFilter implements Filter, Serializable {

    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(ConfigFilter.class);
    private static final String encoding = "UTF-8";
    private String cfgTenantId = "cgsdemo"; // tenant id in config service
    private int cfgCacheRefreshSecs = 3600; // number of seconds before refreshing cache
    private String cfgRefreshConfigParam = "refreshConfig";
    private String cfgReplaceStartToken = "/* BEGIN-CONFIG-FILTER-REPLACE */";  // start token to replace content
    private String cfgReplaceEndToken = "/* END-CONFIG-FILTER-REPLACE */";// end token to replace content
    private String cfgReplaceJsCode = "['$q', function($q) { return $q.when([CONFIG]);}]"; //replacement javascript code where [CONFIG] gets replace by the actual value
    private String cfgReplaceTenantToken = "@@tenant@@";  // token to replace tenant with
    private String cfgReplaceUiTenantToken = "@@uiTenant@@";
    private String cfgReplaceTenantJsToken = "<!--#include CONFIG-FILTER-REPLACE-TENANT-JS-->";  // token to replace tenant js include
    private String cfgReplaceTenantJsCode  = "<script src=\"[CDN]/tenant/[TENANT]/js/tenantTemplateCache.js\"></script>";  //replacement tenant js include
    private String cfgReplaceTenantCssToken = "<!--#include CONFIG-FILTER-REPLACE-TENANT-CSS-->";  // token to replace tenant css include
    private String cfgReplaceTenantCssCode  = "<link rel=\"stylesheet\" href=\"[CDN]/tenant/[TENANT]/styles/index.css\">";  //replacement tenant css include
    private String cfgTrackingUrlReplaceToken = "<!--#include CONFIG-FILTER-REPLACE-TRACKING-URL-->";  // token to replace for with tracking url script include
    private String cfgTrackingUrlReplaceJsCode = "<script src=\"[URL]\"></script>";  //replacement javascript code where [URL] gets replaced by the actual value
    private String cfgTrackingInlineReplaceToken = "<!--#include CONFIG-FILTER-REPLACE-TRACKING-INLINE-->";  // token to replace for with tracking inline script run at bottom
    private String cfgTrackingInlineReplaceJsCode = "<script type=\"text/javascript\">[CODE]</script>";  //replacement javascript code where [CODE] gets replaced by the actual value
    private Date lastCacheTime = null;
    private Pattern jsReplacePattern;
    private TenantConfigHelper tenantConfigHelper;

    public void init(FilterConfig config) throws ServletException {       
        cfgTenantId = setParamValue(config, "tenantId", cfgTenantId);
        cfgCacheRefreshSecs = setParamValue(config, "cacheRefreshSecs", cfgCacheRefreshSecs);
        cfgRefreshConfigParam = setParamValue(config, "refreshConfigParam", cfgRefreshConfigParam);
        cfgReplaceStartToken = setParamValue(config, "replaceStartToken", cfgReplaceStartToken);
        cfgReplaceEndToken = setParamValue(config, "replaceEndToken", cfgReplaceEndToken);
        cfgReplaceJsCode = setParamValue(config, "replaceJsCode", cfgReplaceJsCode);
        cfgReplaceTenantToken = setParamValue(config, "replaceTenantToken", cfgReplaceTenantToken);
        cfgReplaceUiTenantToken = setParamValue(config, "replaceUiTenantToken", cfgReplaceUiTenantToken);
        cfgReplaceTenantJsToken = setParamValue(config, "replaceTenantJsToken", cfgReplaceTenantJsToken);
        cfgReplaceTenantJsCode = setParamValue(config, "replaceTenantJsCode", cfgReplaceTenantJsCode);
        cfgReplaceTenantCssToken = setParamValue(config, "replaceTenantCssToken", cfgReplaceTenantCssToken);
        cfgReplaceTenantCssCode = setParamValue(config, "replaceTenantCssCode", cfgReplaceTenantCssCode);
        cfgTrackingUrlReplaceToken = setParamValue(config, "trackingUrlReplaceToken", cfgTrackingUrlReplaceToken);
        cfgTrackingUrlReplaceJsCode = setParamValue(config, "trackingUrlReplaceJsCode", cfgTrackingUrlReplaceJsCode);
        cfgTrackingInlineReplaceToken = setParamValue(config, "trackingInlineReplaceToken", cfgTrackingInlineReplaceToken);
        cfgTrackingInlineReplaceJsCode = setParamValue(config, "trackingInlineReplaceJsCode", cfgTrackingInlineReplaceJsCode);

        tenantConfigHelper = new TenantConfigHelper(cfgTenantId, cfgReplaceJsCode, cfgReplaceTenantJsCode, cfgReplaceTenantCssCode, cfgTrackingUrlReplaceJsCode, cfgTrackingInlineReplaceJsCode);
        lastCacheTime = new Date();

        jsReplacePattern = Pattern.compile(Pattern.quote(cfgReplaceStartToken) + ".*?" + Pattern.quote(cfgReplaceEndToken), Pattern.DOTALL);

        if (log.isInfoEnabled()) {
            log.info("Retrieved parameters");
            log.info("tenantId: {}", cfgTenantId);
            log.info("cacheRefreshSecs: {}", cfgCacheRefreshSecs);
            log.info("refreshConfigParam: {}", cfgRefreshConfigParam);
            log.info("replaceStartToken: {}", cfgReplaceStartToken);
            log.info("replaceEndToken: {}", cfgReplaceEndToken);
            log.info("replaceJsCode: {}", cfgReplaceJsCode);
            log.info("replaceTenantToken: {}", cfgReplaceTenantToken);
            log.info("replaceUiTenantToken: {}", cfgReplaceUiTenantToken);
            log.info("replaceTenantJsToken: {}", cfgReplaceTenantJsToken);
            log.info("replaceTenantJsCode: {}", cfgReplaceTenantJsCode);
            log.info("replaceTenantCssToken: {}", cfgReplaceTenantCssToken);
            log.info("replaceTenantCssCode: {}", cfgReplaceTenantCssCode);
            log.info("trackingUrlReplaceToken: {}", cfgTrackingUrlReplaceToken);
            log.info("trackingUrlReplaceJsCode: {}", cfgTrackingUrlReplaceJsCode);
            log.info("trackingInlineReplaceToken: {}", cfgTrackingInlineReplaceToken);
            log.info("trackingInlineReplaceJsCode: {}", cfgTrackingInlineReplaceJsCode);
        }

    }

    private String setParamValue(final FilterConfig config, final String paramName, final String defaultValue) {
        String paramVal = config.getInitParameter(paramName);

        // if param value empty, use default
        return TenantConfigHelper.isNullOrEmpty(paramVal) ? defaultValue : paramVal;
    }

    private int setParamValue(final FilterConfig config, final String paramName, final int defaultValue) {
        String paramVal = config.getInitParameter(paramName);
        try {
            Integer paramValInt = Integer.parseInt(paramVal);
            return paramValInt;
        } catch (NumberFormatException nfe) {
            return defaultValue;
        }
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String tenant = resolveTenant((HttpServletRequest) request);

        // set content-type to UTF-8
        setContentType(request, response);

        Date currentDt = new Date();
        String refreshParamVal = request.getParameter(cfgRefreshConfigParam);

        TenantConfig tenantConfig = tenantConfigHelper.getTenantConfig(tenant);

        if ((tenantConfig == null && !tenantConfigHelper.hasDomainMappings()) || lastCacheTime == null || !TenantConfigHelper.isNullOrEmpty(refreshParamVal) || ((currentDt.getTime() - lastCacheTime.getTime()) / 1000) > cfgCacheRefreshSecs) {
            try {
                tenantConfigHelper.reloadConfig();
                lastCacheTime = new Date();
            } catch (Exception e) {
                log.error("Error retrieving configuration from config service", e);
                throw new ServletException("Error retrieving configuration from config service", e);
            }
        }



        if (tenantConfig == null) {
            tenantConfig = tenantConfigHelper.getTenantConfig(tenant);
            // still no config?
            if (tenantConfig == null) {
                throw new RuntimeException("Tenant config is not set in utility service. Please check the configs for tenant - " + tenant);
            }
        }

        CharResponseWrapper wrapper = new CharResponseWrapper((HttpServletResponse) response);

        chain.doFilter(request, wrapper);

        // Wrap the response in a wrapper so we can get at the text after calling the next filter
        PrintWriter out = response.getWriter();

        // set the cache headers
        setCacheHeaders(response);

        // Extract the text from the completed servlet and apply the regexes
        String modifiedHtml = wrapper.toString();
        // replace response if begin/end token exist
        modifiedHtml = jsReplacePattern.matcher(modifiedHtml).replaceAll(Matcher.quoteReplacement(tenantConfig.getCachedConfigReplacementJsCode()))
                .replace(cfgReplaceTenantJsToken, tenantConfig.getCachedTenantJsReplacementCode())
                .replace(cfgReplaceTenantCssToken, tenantConfig.getCachedTenantCssReplacementCode())
                .replace(cfgTrackingUrlReplaceToken, tenantConfig.getCachedTrackingUrlJsCode())
                .replace(cfgTrackingInlineReplaceToken, tenantConfig.getCachedTrackingInlineJsCode())
                .replace(cfgReplaceTenantToken, tenantConfig.getTenant())
                .replace(cfgReplaceUiTenantToken, tenantConfig.getUiTenant());

        log.info("Using tenant - {} and uiTenant - {} configs", tenantConfig.getTenant(), tenantConfig.getUiTenant());

        out.write(modifiedHtml);

        // Write our modified text to the real response
        response.setContentLength(modifiedHtml.length());
    }

    public void destroy() {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private void setContentType(ServletRequest request, ServletResponse response) throws UnsupportedEncodingException {
        // Respect the client-specified character encoding
        // (see HTTP specification section 3.4.1)
        if (null == request.getCharacterEncoding()) {
            request.setCharacterEncoding(encoding);
        }
        /**
         * Set the default response content type and encoding
         */
        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
    }

    private void setCacheHeaders(ServletResponse response) {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setHeader("Cache-Control", "private");
        httpResponse.setDateHeader("Expires", lastCacheTime.getTime() + cfgCacheRefreshSecs * 1000);
    }

    private String resolveTenant(HttpServletRequest request) throws IOException {
        String tenant = resolveTenantByRequestParam(request);
        log.info("Resolved tenant to {} based on request param", tenant);
        if (TenantConfigHelper.isNullOrEmpty(tenant)) {
            return resolveTenantByDomain(request);
        }
        return tenant;
    }

    private String resolveTenantByRequestParam(HttpServletRequest request) {
        return request.getParameter("tenant");
    }

    private String resolveTenantByDomain(HttpServletRequest request) throws IOException {
        String domain = getRemoteHost(request);
        log.info("<-- Incoming domain name is -->" + domain);
        String tenant = tenantConfigHelper.getTenantFromDomain(domain);
        if (TenantConfigHelper.isNullOrEmpty(tenant)) {
            log.info("Using default tenant {} there is no mapping found for tenant {} and domain {} ", new Object[]{cfgTenantId, domain, tenant});
            tenant = cfgTenantId;
        }
        log.info("Domain is resolved to {} and tenant resolved to {} ", new Object[]{domain, tenant});
        return tenant;
    }

    private String getRemoteHost(HttpServletRequest request) {
        // JMP: Use the server name here. In all our envs, as long as the web
        // server has "ProxyPreserveHost on"
        // then this will resolve to the original host the request was sent to.
        String clientAddress = request.getServerName();
        if (TenantConfigHelper.isNullOrEmpty(clientAddress)) {
            log.info("Request.servername is null getting domain from remote host --> ");
            // get it from the request
            clientAddress = request.getRemoteHost();
        }
        return clientAddress;
    }

}
