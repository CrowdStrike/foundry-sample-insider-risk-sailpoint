![CrowdStrike Falcon](/images/cs-logo.png?raw=true)

# Insider Risk SailPoint sample Foundry app

The Insider Risk SailPoint sample Foundry app is a community-driven, open source project which serves as an example of an app which can be built using CrowdStrike's Foundry ecosystem.
`foundry-sample-insider-risk-sailpoint` is an open source project, not a CrowdStrike product. As such, it carries no formal support, expressed or implied.

This app is one of several App Templates included in Foundry that you can use to jumpstart your development. It comes complete with a set of
preconfigured capabilities aligned to its business purpose. Deploy this app from the Templates page with a single click in the Foundry UI, or
create an app from this template using the CLI.

> [!IMPORTANT]  
> To view documentation and deploy this sample app, you need access to the Falcon console.

## Description

Organizations face critical security challenges when employees leave and have elevated access to sensitive data.
The sample Foundry Insider Risk SailPoint helps automate the process of monitoring leaving employees.
This application helps teams:

* Monitor high-risk individuals who may pose insider risk.
* Automatically track employees during their departure process.
* Enhance protection of sensitive data during critical transition periods.
* Maintain security oversight for users with privileged access.

This app illustrates the following functionality amongst other components:
* Fetch Leaving/departing employees data from [SailPoint](https://www.sailpoint.com/).
* Add employees to Identity Protection watchlist and Active Directory group using Workflow built-in actions for enhanced monitoring capabilities.

## Prerequisites

* The Foundry CLI (instructions below)
* SailPoint API Credential
* Active Directory Configuration

### Install the Foundry CLI

You can install the Foundry CLI with Scoop on Windows or Homebrew on Linux/macOS.

**Windows**:

Install [Scoop](https://scoop.sh/). Then, add the Foundry CLI bucket and install the Foundry CLI.

```shell
scoop bucket add foundry https://github.com/crowdstrike/scoop-foundry-cli.git
scoop install foundry
```

Or, you can download the [latest Windows zip file](https://assets.foundry.crowdstrike.com/cli/latest/foundry_Windows_x86_64.zip), expand it, and add the install directory to your PATH environment variable.

**Linux and macOS**:

Install [Homebrew](https://docs.brew.sh/Installation). Then, add the Foundry CLI repository to the list of formulae that Homebrew uses and install the CLI:

```shell
brew tap crowdstrike/foundry-cli
brew install crowdstrike/foundry-cli/foundry
```

Run `foundry version` to verify it's installed correctly.

### SailPoint Configuration

#### 1. Create and configure API Client:
1. Register a new `API Client for integrations`
2. Securely store the generated `Client ID` and `Client Secret`

### Active Directory Configuration
Create an Active Directory group (using Microsoft Active Directory) dedicated for departing employees. This group will be selected during the application installation process.

## Getting Started

Clone this sample to your local system, or [download as a zip file](https://github.com/CrowdStrike/foundry-sample-insider-risk-sailpoint/archive/refs/heads/main.zip).

```shell
git clone https://github.com/CrowdStrike/foundry-sample-insider-risk-sailpoint
cd foundry-sample-insider-risk-sailpoint
```

Log in to Foundry:

```shell
foundry login
```

Select the following permissions:

- [ ] Create and run RTR scripts
- [x] Create, execute and test workflow templates
- [x] Create, run and view API integrations
- [x] Create, edit, delete, and list queries

Deploy the app:

```shell
foundry apps deploy
```

> [!TIP]
> If you get an error that the name already exists, change the name to something unique to your CID in `manifest.yml`.

Re-deploy the app:

```shell
foundry apps deploy
```

Once the deployment has finished, you can release the app:

```shell
foundry apps release
```

Next, go to **Foundry** > **App catalog**, find your app, and install. During app install, you will be prompted for app configuration:
* (API-Integration) SailPoint API Integration configuration:
    * **SailPoint Host**: Your SailPoint host name
    * **ClientId** Your SailPoint API client Id
    * **ClientSecret** Your SailPoint API client secret

      **Example**:
      <p><img width="500px" src="/app_docs/images/workdayCreds.png?raw=true">

* (SailPoint) 'Add SailPoint leavers to IDP watchlist and AD group' & 'Remove SailPoint leavers from IDP watchlist and AD group' configuration:
    * **Target Group**: Active directory group name

      **Example**:
      <p><img width="500px" src="/app_docs/images/workflowConfig.png?raw=true">

> [!NOTE]
>
> You will notice the same configurations been asked a couple of times. This is because there are two workflows (Add SailPoint leavers to IDP watchlist and AD group & Remove SailPoint leavers from IDP watchlist and AD group) using the same configurations.

> [!TIP]
>
> [Refer Workday Configuration section to generate ClientID ClientSecret and Refresh Token](###workday-configuration)
>
> [Refer Active Directory Configuration section to create Active Directory group](###active-directory-configuration)


## About this sample app

### Foundry capabilities used

* **API-Integration.** Used to connect to SailPoint API to get leaving employee data.
* **Functions.** Used to get a user linked account.
* **Logscale Saved Search.** Used to query departing employees data
* **Workflow templates.** Workflow to execute API-Integrations to get leaving employees data from Workday and add/remove employees to/from Identity Protection watchlist.

### Directory structure

* [`api-integrations`](api-integrations)
    * [`SailPoint_API_Integration.json`](api-integrations/SailPoint_API_Integration.json): API-Integration to get leaving employees data from SailPoint.
* [`functions`](functions)
    * [`identity-context`](functions/identity-context): Function to get the linked accounts for a user. If a departing user is an admin, they have a regular account with email and an administrative account without the email.
* [`saved-searches`](saved-searches)
    * [`Query_departing_employees`](saved-searches/Query_departing_employees) Query departing employees data
* [`workflows`](workflows):
    * [`Add_leavers_data_to_IDP_watchlist_and_AD_group.yml`](workflows/Add_leavers_data_to_IDP_watchlist_and_AD_group.yml): This makes a call to SailPoint APIs to get leaving employees data and add employees to Identity Protection watchlist and AD group using built-in actions. Also creates a lookup file so that this information is available in NGS.
    * [`Remove_SailPoint_leavers_from_IDP_and_AD_group.yml`](workflows/Remove_SailPoint_leavers_from_IDP_and_AD_group.yml): This makes a call to SailPoint APIs to get employees data who left 30 days ago and removes from Identity Protection watchlist and AD group using built-in actions.

### Known limitations

#### **Multi-Domain Environment Restrictions**
Multi-domain environments without trust relationships are not supported. The application requires established trust relationships between domains to function properly.

#### **Cloud-Only User Limitations**
Cloud-only users (those without Active Directory accounts) are not supported in the current release. - Support for Entra ID and Okta groups will be available in an upcoming release.

> [!NOTE]
> * The workflow `Add SailPoint leavers data to IDP and AD group` runs daily and processes both:
    >   * Newly identified employees who have given notice of future departure.
>   * Previously identified employees whose departure dates are still in the future.
    >
    >   The workflow will continue to add/maintain these employees on the Identity Protection watchlist and in Active Directory until their actual departure date. This ensures monitoring of all employees those who are on a notice period.
> * The workflow `Remove SailPoint leavers from IDP and AD group` runs daily and automatically removes employees from the watchlist and Active Directory after 30 days of their departure date. This automation helps maintain a clean and up-to-date entries.

## Foundry resources

- Foundry documentation: [US-1](https://falcon.crowdstrike.com/documentation/category/c3d64B8e/falcon-foundry) | [US-2](https://falcon.us-2.crowdstrike.com/documentation/category/c3d64B8e/falcon-foundry) | [EU](https://falcon.eu-1.crowdstrike.com/documentation/category/c3d64B8e/falcon-foundry)
- Foundry learning resources: [US-1](https://falcon.crowdstrike.com/foundry/learn) | [US-2](https://falcon.us-2.crowdstrike.com/foundry/learn) | [EU](https://falcon.eu-1.crowdstrike.com/foundry/learn)

---

<p align="center"><img src="https://raw.githubusercontent.com/CrowdStrike/falconpy/main/docs/asset/cs-logo-footer.png"><BR/><img width="300px" src="https://raw.githubusercontent.com/CrowdStrike/falconpy/main/docs/asset/adversary-goblin-panda.png"></P>
<h3><p align="center">WE STOP BREACHES</p></h3>