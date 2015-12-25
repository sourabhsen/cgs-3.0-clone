*** Settings ***
Library     Selenium2Library
Library     SauceLabs
Variables   Environment.py

Suite Setup         open test browser
Suite Teardown      close test browser


*** Variables ***
${BROWSER}          firefox
${BASE_URL}         ${${env}_URL}
${REMOTE_URL}       ${${env}_SAUCE}
${CAPABILITIES}     tunnel-identifier:sandbox_qa,platform:Windows 7,browserName:
${USE_SAUCE}        no

*** Keywords ***
open test browser
    Run Keyword If  '${USE_SAUCE}' == 'yes'
        ...  Open Browser  ${BASE_URL}  ${BROWSER}   remote_url=${REMOTE_URL}    desired_capabilities=${CAPABILITIES}${BROWSER}
        ...  ELSE   Open Browser  ${BASE_URL}  ${BROWSER}
    
close test browser
    Run Keyword If  '${USE_SAUCE}' == 'yes'
        ...  Run Keyword If  '${REMOTE_URL}' != ''
            ...  Report Sauce status
            ...  ${SUITE_NAME} | ${TEST_NAME}
            ...  ${TEST_STATUS}  ${TEST_TAGS}  ${REMOTE_URL}
        
    Close all browsers


*** Test Cases ***
Checking widgets are in placed
    Set Browser Implicit Wait   10
    Set Selenium Implicit Wait  10
    
    Wait Until Element Is Visible   id=left-side-container