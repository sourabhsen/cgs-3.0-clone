package com.aptimus.careers.util;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.message.BasicHeader;
import com.aptimus.test.selenium.HttpClientHelper;
import com.aptimus.test.selenium.Logging;

public class CareerHttpClient extends HttpClientHelper {

    public synchronized static String postResume (String url, String file, List <Cookie> cookies) {
        Map <String, Object> result = new HashMap <String, Object> ();
        try {
            HttpPost httpPost = new HttpPost (url);
            httpPost.addHeader (new BasicHeader ("Accept", "application/json"));

            if (cookies != null)
                for (Cookie cookie : cookies)
                    httpPost.addHeader ("Cookie", cookie.getName () + "=" + cookie.getValue ());

            Logging.info ("Executing request: " + httpPost.getRequestLine ());

            String fileType;
            if (file.contains (".pdf"))
                fileType = "application/pdf";
            else if (file.contains (".doc"))
                fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            else
                throw new RuntimeException ("unsupported file format");

            File resume = new File (ClassLoader.getSystemResource (file).getPath ());
            HttpEntity body = MultipartEntityBuilder.create ()
                    .setMode (HttpMultipartMode.BROWSER_COMPATIBLE)
                    .addTextBody ("name", "selenium - " + TestHelper.dummyString (10) + " - " + file)
                    .addTextBody ("documentType", "RESUME")
                    .addTextBody ("primaryInd", "Y")
                    .addBinaryBody ("file", resume, ContentType.create (fileType), file)
                    .build ();

            httpPost.setEntity (body);
            result = execute (httpPost);
            Logging.info ("response:" + result);
        } catch (Exception e) {
            Logging.error (e.getMessage ());
            throw new RuntimeException (e.getCause ());
        }
        return String.valueOf (result.get (BODY));
    }
}
