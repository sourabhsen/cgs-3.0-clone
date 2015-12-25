package com.aptimus.careers.test;

import java.net.URL;
import java.util.Properties;
import com.aptimus.test.selenium.Environment;

public class CareerEnvironment extends Environment {

    public static Boolean isMobile    = false;
    public static Boolean isUopx      = false;
    public static Boolean isWest      = false;
    public static Boolean isIronyard  = false;
    public static Boolean isProd      = false;
    public static Boolean usingSafari = browserType.equals (BrowserType.safari);
    public static Boolean usingIE     = browserType.equals (BrowserType.ie);
    public static String  dashboard;
    public static String  testUser;
    public static String  testPassword;
    public static String  tenant;
    public static String  brand;
    public static String  domain;
    public static Boolean isAnonymous;
    public static Boolean isLoggedin;
    public static Boolean isKnown;

    public static void initialization () throws Exception {
        testUser = (Environment.testUser == null ? "selenium.user1@mailinator.com" : Environment.testUser);
        testPassword = (Environment.testPassword == null ? "Password123" : Environment.testPassword);

        if (browserType.equals (BrowserType.android) ||
            browserType.equals (BrowserType.ipad) ||
            browserType.equals (BrowserType.iphone))
        {
            isMobile = true;
        }

        String loginStatus = System.getProperty ("login.status", "loggedin");
        isAnonymous = loginStatus.equalsIgnoreCase ("anonymous");
        isLoggedin = loginStatus.equalsIgnoreCase ("loggedin");
        isKnown = loginStatus.equalsIgnoreCase ("known");

        tenant = System.getProperty ("test.tenant", "cgsdemo");
        isIronyard = tenant.equalsIgnoreCase ("ironyard");
        isWest = tenant.equalsIgnoreCase ("west");
        isUopx = tenant.equalsIgnoreCase ("uopx");
        System.setProperty ("tags", System.getProperty ("tags") + ", " + tenant);

        if (id.equalsIgnoreCase ("dc1") || id.equalsIgnoreCase ("dc3") || id.equalsIgnoreCase ("prod"))
            isProd = true;

        brand = "Career Guidance Dashboard";
        domain = ".aptimus.net";

        Properties envProperties = new Properties ();
        envProperties.load (ClassLoader.getSystemResourceAsStream ("env.properties"));
        for (String key : envProperties.stringPropertyNames ()) {
            if (key.equals (tenant + "." + id + ".test.url"))
                baseUrl = envProperties.getProperty (key);
            if (key.equals (tenant + ".sauce.user"))
                sauceUser = envProperties.getProperty (key);
            if (key.equals (tenant + ".sauce.key"))
                sauceKey = envProperties.getProperty (key);
            if (key.equals (tenant + "." + id + ".sauce.tunnel"))
                sauceTunnel = envProperties.getProperty (key);
        }
        dashboard = baseUrl;
        sauceUrl = new URL ("http://" + sauceUser + ":" + sauceKey + "@ondemand.saucelabs.com:80/wd/hub");
    }
}
