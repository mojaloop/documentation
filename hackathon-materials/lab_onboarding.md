# ModusBox Mojaloop Lab
## Getting started with the Lab

>***Note:** This document is specific to the ModusBox lab provided for the Include Everyone hackathon, but may generalize well in the future*


## 1.0 Obtaining an Access Token

- 1.1 Go to the public gateway (the link has been removed as this environment is not public).

- 1.2 Click “Sign Up”, and go through the steps to create a new account

<img src="./images/lab_onboarding_02.png" width="400"/>


- 1.3 Click “Sign Up” > follow the dialog box to the sign in page > Enter your details and “Sign In”

<img src="./images/lab_onboarding_04.png" width="400"/></br>
<img src="./images/lab_onboarding_05.png" width="600"/>


- 1.4 In the top left, select “Applications”

<img src="./images/lab_onboarding_06.png" width="400"/>


- 1.5 Select “Default Application” from the list

<img src="./images/lab_onboarding_07.png" width="400"/>

- 1.6 Navigate to “Production Keys” > set the validity of the key to “-1” > “Generate Keys”

<img src="./images/lab_onboarding_08.png" width="400"/></br>
<img src="./images/lab_onboarding_09.png" width="400"/>

- 1.7 Your access key along with a token will be created. Click “Show keys”

<img src="./images/lab_onboarding_10.png" width="400"/>

- 1.8 Observe that your access token has been created. You can copy this for later reference

<img src="./images/lab_onboarding_11.png" width="600"/>

- 1.9 Navigate to APIs in the top left menu

<img src="./images/lab_onboarding_12.png" width="400"/>

- 1.10 From the list of APIs, select “CentralLedgerApi…”

<img src="./images/lab_onboarding_13.png" width="400"/>


- 1.11 You now need to subscribe the DefaultApplication to this api. You can do this in the top right > “Subscribe”

<img src="./images/lab_onboarding_14.png" width="600"/></br>
<img src="./images/lab_onboarding_15.png" width="600"/>


- 1.12 Navigate to “Api Console”. Your access token should already be pre-filled for you.

<img src="./images/lab_onboarding_16.png" width="600"/>

- 1.13 Now we can test out the `/health` endpoint of the central-ledger service. Browse down the list of endpoints > “Try it out” > “Execute”

<img src="./images/lab_onboarding_17.png" width="600"/></br>
<img src="./images/lab_onboarding_18.png" width="200"/></br>
<img src="./images/lab_onboarding_19.png" width="500"/></br>



1.14 You should see a response similar to the following:


```json
{
  "status": "OK",
  "uptime": 535767.333,
  "startTime": "2019-09-17T15:11:37.794Z",
  "versionNumber": "7.3.1",
  "services": [
    {
      "name": "datastore",
      "status": "OK"
    },
    {
      "name": "broker",
      "status": "OK"
    }
  ]
}
```