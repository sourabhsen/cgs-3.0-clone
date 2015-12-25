package com.aptimus.careers.ui;

import static com.aptimus.test.selenium.HttpClientHelper.Auth.ASID;
import static com.aptimus.test.selenium.HttpClientHelper.Auth.INFO;
import static com.aptimus.test.selenium.HttpClientHelper.Auth.TOKEN;
import static org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOfElementLocated;
import static org.openqa.selenium.support.ui.ExpectedConditions.textToBePresentInElement;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfAllElementsLocatedBy;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.Point;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.aptimus.careers.test.CareerEnvironment;
import com.aptimus.test.selenium.BasePage;
import com.aptimus.test.selenium.Environment;
import com.aptimus.test.selenium.Logging;

public class CareerPage extends BasePage {

    // Element is not always visible until you scroll down (ie. flyover).
    // Split isTextInElement() into 2.
    protected boolean isTextInElement (String css, String text) {
        return isTextInElement (scrollTo (waitForElement (css)), text);
    }

    protected boolean isTextInElement (WebElement el, String text) {
        try {
            return new WebDriverWait (getDriver (), CareerEnvironment.maxWaitTime).until (
                    textToBePresentInElement (el, text));
        } catch (TimeoutException e) {
            Logging.error ("looking for=" + text + ", found text=" + el.getText ());
            return false;
        }
    }

    protected boolean noSuchElementPresent (String css) {
        try {
            if (new WebDriverWait (getDriver (), CareerEnvironment.maxWaitTime).until (
                    invisibilityOfElementLocated (By.cssSelector (css))))
                return !isElementPresent (css);
            else
                return false;
        } catch (TimeoutException e) {
            Logging.error (e.getMessage ());
            return false;
        }
    }

    protected boolean isElementHidden (String css) {
        try {
            if (new WebDriverWait (getDriver (), CareerEnvironment.maxWaitTime).until (
                    invisibilityOfElementLocated (By.cssSelector (css))))
                return isElementPresent (css);
            else
                return false;
        } catch (TimeoutException e) {
            Logging.info (e.getMessage ());
            return false;
        }
    }

    protected boolean isElementPresent (WebElement el, String css) {
        try {
            el.findElement (By.cssSelector (css));
            return true;
        } catch (NoSuchElementException e) {
            Logging.info ("css is not present=" + css);
            return false;
        }
    }

    public boolean isElementVisible (String css) {
        try {
            boolean status = super.isElementVisible (css);
            if (!status)
                Logging.info ("css is not visible=" + css);
            return status;
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return false;
        }
    }

    public boolean waitUntilVisible (String css) {
        try {
            return waitForElementVisible (css).isDisplayed ();
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            wait (1000);
        return waitForElementVisible (css).isDisplayed ();
    }
    }

    protected String getText (WebElement el, String css) {
        return el.findElement (By.cssSelector (css)).getText ().trim ();
    }

    protected String getAttribute (WebElement el, String css, String attribute) {
        return el.findElement (By.cssSelector (css)).getAttribute (attribute).trim ();
    }

    protected boolean clickAndSelectValue (String select, String value) {
        try {
            new Select (scrollTo (waitForElementClickable (select))).selectByValue (value);
            return click (select + " > option[value='" + value + "']");
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return false;
        }
    }

    protected boolean clickAndSelectText (String select, String text) {
        try {
            if (!text.equals ("")) {
                new Select (scrollTo (waitForElementClickable (select))).selectByVisibleText (text);
            }
            return true;
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return false;
        }
    }

    @Override
    public boolean click (String css) {
        try {
            scrollTo (waitForElement (By.cssSelector (css)));
            waitForElementClickable (By.cssSelector (css)).click ();
            return true;
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return false;
        }
    }

    @Override
    public WebElement scrollTo (WebElement el) {
        Point location = el.getLocation ();
        Dimension size = el.getSize ();
        int redStaticBarHeight = 127;
        if (CareerEnvironment.isIronyard)
            redStaticBarHeight = 131;
        if (CareerEnvironment.isUopx)
            redStaticBarHeight = 99;

        int y = location.getY () - (size.getHeight () / 2);
        executeJavascript (String.format ("window.scrollTo (%s, %s)", 0,
                                          y <= redStaticBarHeight ? redStaticBarHeight : y - redStaticBarHeight));
        return el;
    }

    @Override
    public void hover (String cssSelector) {
        if (CareerEnvironment.isMobile || CareerEnvironment.usingSafari) {
            scrollTo (waitForElement (cssSelector));
            executeJavascript ("$( '" + cssSelector.replace ("'", "\\'") + "').mouseover();");
        } else
            new Actions (getDriver ()).moveToElement (waitForElement (cssSelector)).build ().perform ();
    }

    protected boolean pressKey (Keys key) {
        try {
            wait (500);
            getDriver ().switchTo ().activeElement ().sendKeys (key);
            return true;
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            return false;
        }
    }

    public boolean hasPageLoaded () {
        long timeOut = System.currentTimeMillis () + (CareerEnvironment.maxWaitTime * 1000);
        boolean result;
        do {
            result = String.valueOf (executeJavascript ("return document.readyState")).equals ("complete");
            if (result) {
                return result;
            } else {
                wait (250);
            }
        } while (System.currentTimeMillis () < timeOut);
        Logging.error ("page failed to load");
        return result;
    }

    protected String checkSessionStorage (String jsScript) {
        long timeOut = System.currentTimeMillis () + (CareerEnvironment.maxWaitTime * 1000);
        String result;
        do {
            result = executeJavascript (jsScript);
            if (result.isEmpty ()) {
                wait (250);
            } else {
                return result;
            }
        } while (System.currentTimeMillis () < timeOut);
        Logging.error (jsScript + " is failed");
        return result;
    }

    public boolean checkLoadingIcon () {
        boolean cgBusy = isElementVisible ("div.apt-busy-fixed-center");
        if (!cgBusy) {
            wait (500);
            cgBusy = isElementVisible ("div.apt-busy-fixed-center");
        }

        if (cgBusy) {
            waitForElementInvisible ("div.apt-busy-fixed-center");
            waitForElementInvisible ("div.cg-busy-backdrop-animation");
            hasPageLoaded ();
        }

        return true;
    }

    public List <WebElement> waitForElementsVisible (String css) {
        try {
            return new WebDriverWait (getDriver (), Environment.maxWaitTime).until (
                    visibilityOfAllElementsLocatedBy (By.cssSelector (css)));
        } catch (StaleElementReferenceException e) {
            wait (500);
            return new WebDriverWait (getDriver (), Environment.maxWaitTime).until (
                    visibilityOfAllElementsLocatedBy (By.cssSelector (css)));
        } catch (TimeoutException e) {
            Logging.error (e.getMessage ());
            return null;
        }
    }

    @Override
    public List <Cookie> getCookies () {
        List <Cookie> cookies = new ArrayList <Cookie> ();
        org.openqa.selenium.Cookie cookie = getCookie (INFO.name ());
        cookies.add (new BasicClientCookie (cookie.getName (), cookie.getValue ()));
        cookie = getCookie (TOKEN.name ());
        cookies.add (new BasicClientCookie (cookie.getName (), cookie.getValue ()));
        cookie = getCookie (ASID.name ());
        cookies.add (new BasicClientCookie (cookie.getName (), cookie.getValue ()));
        cookies.add (new BasicClientCookie ("saucelabs_noshunt", "saucelabs_noshunt"));
        return cookies;
    }

    protected String executeJavascript (String javascript, WebElement el) {
        String output = "";
        try {
            output = String.valueOf ( ((JavascriptExecutor) getDriver ()).executeScript (javascript, el));
        } catch (Exception e) {
            Logging.error (e.getMessage ());
        }
        return output;
    }

    @Override
    public void navigateRefresh () {
        getDriver ().navigate ().refresh ();
        hasPageLoaded ();
    }

    @Override
    public void navigateTo (String url) {
        getDriver ().navigate ().to (url);
        hasPageLoaded ();
    }

    @Override
    public void navigateBack () {
        getDriver ().navigate ().back ();
        hasPageLoaded ();
    }

    public boolean accessibilityTest () {
        boolean status = checkTitleText ();
        status &= checkLanguageAttribute ();
        status &= checkAltTextImage ();
        status &= checkLinksText ();
        status &= checkTableHeaderAndSummary ();
        return status;
    }

    private boolean checkTitleText () {
        Logging.info ("Page Title should not be empty");
        boolean status = true;
        int count = waitForElements ("title").size ();
        if (count == 0) {
            Logging.error ("Every page should have a title");
            status = false;
        }
        if (count > 1) {
            Logging.error ("More than one Page Title found");
            status = false;
        }

        String titleText = getDriver ().getTitle ();
        Logging.info ("Page Title Text - " + titleText);
        if (titleText.isEmpty ()) {
            Logging.error ("Page Title is missing");
            status = false;
        }

        return status;
    }

    private boolean checkLanguageAttribute () {
        Logging.info ("Primary language of a page should be declared within html lang attribute");
        String lang = waitForElementVisible ("html").getAttribute ("lang");
        boolean status = true;
        if (lang.isEmpty ()) {
            Logging.error ("Primary language of a page should be declared within html lang attribute");
            status = false;
        }

        return status;
    }

    private boolean checkAltTextImage () {
        Logging.info ("Looking for Alt Text for Images");
        boolean status = true;
        if (isElementPresent ("img")) {
            for (WebElement el : waitForElements ("img")) {
                String altText = el.getAttribute ("alt");
                String srcText = el.getAttribute ("src");
                if (altText.isEmpty ()) {
                    Logging.error ("Alternate text missing for Image: " + srcText);
                    status = false;
                }
            }
        } else
            Logging.info ("no Images found");

        return status;
    }

    private boolean checkLinksText () {
        Logging.info ("Hyperlinks should always have text associated with them");
        boolean status = true;
        if (isElementPresent ("a")) {
            int count = 1;
            for (WebElement el : waitForElements ("a")) {
                String text = el.getText ().trim ();
                String href = el.getAttribute ("href");
                String role = el.getAttribute ("role");
                if (text.isEmpty ())
                    text = el.getAttribute ("textContent"); // it might be hidden

                if (text.isEmpty ())
                    if (href == null)
                        if (role == null || !role.equalsIgnoreCase ("button")) {
                            Logging.error ("    missing role=button");
                            status = false;
                        } else
                            Logging.info ("    found role=button");

                    else {
                        Logging.error ("Hyperlinks[" + count + "] should always have text associated with them for: " + href);
                        status = false;
                    }
                else
                    Logging.info ("href=" + href + ", text=" + text);

                ++count;
            }
            Logging.info ("Total number of HyperLinks on this webpage: " + count);
        } else
            Logging.info ("no Hyperlinks found");

        return status;
    }

    private boolean checkTableHeaderAndSummary () {
        Logging.info ("Table should have a summary and table header (attr: header, role and scope)");
        boolean status = true;
        if (isElementPresent ("table")) {
            for (WebElement el : waitForElements ("table")) {
                String summaryText = el.getAttribute ("summary");
                if (summaryText.isEmpty ()) {
                    Logging.error ("Table should have non empty summary: " + summaryText);
                    status = false;
                }

                if (isElementPresent (el, "th")) {
                    WebElement th = el.findElement (By.cssSelector ("th"));
                    String headers = th.getAttribute ("headers");
                    if (headers == null || headers.isEmpty ()) {
                        Logging.error ("Table header is missing headers attribute: " + headers);
                        status = false;
                    }

                    String role = th.getAttribute ("role");
                    if (role == null || role.isEmpty ()) {
                        Logging.error ("Table header is missing role attribute: " + role);
                        status = false;
                    }

                    String scope = th.getAttribute ("scope");
                    if (scope == null || scope.isEmpty ()) {
                        Logging.error ("Table header is missing scope attribute: " + scope);
                        status = false;
                    }

                } else {
                    Logging.error ("Table should have a table header");
                    status = false;
                }
            }
        } else
            Logging.info ("no Table found");

        return status;
    }
}
