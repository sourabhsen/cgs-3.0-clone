package com.aptimus.careers.test;

import static com.aptimus.test.selenium.HttpClientHelper.Auth.ASID;
import static com.aptimus.test.selenium.HttpClientHelper.Auth.INFO;
import static com.aptimus.test.selenium.HttpClientHelper.Auth.TOKEN;
import static org.testng.Assert.assertTrue;
import java.io.File;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.openqa.selenium.Cookie;
import org.testng.ITestContext;
import org.testng.annotations.BeforeMethod;
import com.aptimus.careers.dto.playlist.Queue.ListItem;
import com.aptimus.careers.util.PageHelper;
import com.aptimus.careers.util.TestHelper;
import com.aptimus.test.selenium.BaseBrowser;
import com.aptimus.test.selenium.Logging;

public class CareerBaseBrowser extends BaseBrowser {

    protected final Charset ISO88591 = Charset.forName ("ISO-8859-1");
    protected final Charset UTF8     = Charset.forName ("UTF-8");

    static {
        try {
            CareerEnvironment.initialization ();
            sharedCookies.add (new Cookie ("saucelabs_noshunt", "saucelabs_noshunt"));
        } catch (Exception e) {
            throw new RuntimeException (e.getMessage ());
        }
    }

    @BeforeMethod (alwaysRun = true)
    public void beforeMethod (ITestContext testContext, Method method, Object[] testData) throws Exception {
        try {
            super.beforeMethod (testContext, method, testData);
        } catch (Exception e) {
            // sometimes we're getting:
            // Failed to set the 'cookie' property on 'Document': Cookies are disabled inside
            // 'data:' URLs.
            Logging.error (e.getMessage ());
            super.beforeMethod (testContext, method, testData);
        }

        if (!CareerEnvironment.isAnonymous)
            assertTrue (PageHelper.getLogin ().open ().doLogin ());

        // for recommended jobs: we need a goal set, default to Civil Engineer
        List <org.apache.http.cookie.Cookie> cookies = getCookies ();
        ListItem list = TestHelper.getMyGoals (cookies);
        if (list.getListItems () == null || list.getListItems ().isEmpty ()) {
            TestHelper.setMyGoals (cookies, "17-2051.00");
            navigateRefresh ();
        }
    }

    @Override
    public Cookie getCookie (String name) {
        Cookie cookie = super.getCookie (name);
        if (cookie == null)
            Logging.error ("failed to retrive cookie: " + name);
        return cookie;
    }

    @Override
    public List <org.apache.http.cookie.Cookie> getCookies () {
        List <org.apache.http.cookie.Cookie> cookies = new ArrayList <org.apache.http.cookie.Cookie> ();
        Cookie cookie = getCookie (INFO.name ());
        cookies.add (new BasicClientCookie (cookie.getName (), cookie.getValue ()));
        cookie = getCookie (TOKEN.name ());
        cookies.add (new BasicClientCookie (cookie.getName (), cookie.getValue ()));
        cookie = getCookie (ASID.name ());
        cookies.add (new BasicClientCookie (cookie.getName (), cookie.getValue ()));
        cookies.add (new BasicClientCookie ("saucelabs_noshunt", "saucelabs_noshunt"));
        return cookies;
    }

    public void deleteCookie (String name) {
        getDriver ().manage ().deleteCookieNamed (name);
    }

    @Override
    public String getChromeDriverPath () {
        String driverName = "chromedriver_mac32";
        if (CareerEnvironment.os.startsWith ("win")) {
            driverName = "chromedriver.exe";
        } else if (CareerEnvironment.os.contains ("nix") || CareerEnvironment.os.contains ("nux")) {
            driverName = "chromedriver_linux64";
        }

        File file;
        try {
            file = new File (ClassLoader.getSystemResource (driverName).getPath ());
            if (!CareerEnvironment.os.startsWith ("win")) {
                Runtime.getRuntime ().exec ("chmod u+x " + file.getPath ());
            }
        } catch (Exception e) {
            throw new RuntimeException (e.getMessage ());
        }

        return file.getPath ();
    }

    @Override
    public String getIeDriverPath () {
        File file;
        try {
            file = new File (ClassLoader.getSystemResource ("IEDriverServer.exe").getPath ());
        } catch (Exception e) {
            throw new RuntimeException (e.getMessage ());
        }

        return file.getPath ();
    }
}
