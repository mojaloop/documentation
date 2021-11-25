# AWS CLI

> Note: This document only relates to Mojaloop Devs with access to the private Mojaloop AWS Environment. If you think it belongs somewhere else, please let me know, or move it accordingly.

## MFA

Since the end of 2019, we have enforced MFA on all AWS Console Accounts (that is, accounts used by people). This has added some difficulty in using the AWS CLI tools, since aws cli commands will be rejected if a user has valid credentials, but hasn't also 

In order to use the aws cli with MFA, you must create 'temporary credentials', that is, an `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` that is valid for a limited amount of time.


### Using aws-mfa

[aws-mfa](https://github.com/broamski/aws-mfa) is a python tool which helps manage the creation of new credentials automatically.

Follow the [Installation guide](https://github.com/broamski/aws-mfa#installation) to install the tool and set up your `~/.aws/credentials` and `.bashrc` files accordingly.

For reference, this is what mine looks like:
```bash
#~/.aws/credentials
[mojaloop-long-term]
aws_access_key_id = NONE_OF
aws_secret_access_key = YOUR_BUSINESS
```

```bash
#~/.bashrc
export AWS_PROFILE=mojaloop
export MFA_DEVICE=arn:aws:iam::<insert arn here>
export MFA_STS_DURATION=3600
```


### Example

For example, given a `~/.aws/credentials` file of the following:
```
[mojaloop]
aws_access_key_id = <insert_your_access_key_id>
aws_secret_access_key = <insert_your_secret_access_key>
```

We can run a simple command to list all buckets (`aws s3 ls`), and see that it fails.

```bash
$ aws s3 ls
An error occurred (AccessDenied) when calling the ListBuckets operation: Access Denied
```

After setting up `aws-mfa`:
```bash
$ aws-mfa
INFO - Validating credentials for profile: mojaloop
INFO - Short term credentials section mojaloop is missing, obtaining new credentials.
Enter AWS MFA code for device [arn:aws:iam::886403637725:mfa/lewis] (renewing for 3600 seconds):123456
INFO - Fetching Credentials - Profile: mojaloop, Duration: 3600
INFO - Success! Your credentials will expire in 3600 seconds at: 2020-02-07 07:33:08+00:00

$ aws s3 ls
2020-01-25 07:30:20 aws-logs-886403637725-us-west-2
2017-03-02 04:31:12 central-ledger-perf
2018-04-23 23:48:21 central-services-perf-ecs-app-no-nat-assetsbucket-3wilcm5utbi
2017-02-01 03:37:24 cf-templates-1877qlmq9pnw-eu-central-1
2019-12-07 04:02:04 circleci-bucket-76847d1f
2018-02-09 01:36:43 devops-circleci-deployment-config
2018-08-30 01:26:39 devops-circleci-jmpdev
2017-03-24 22:47:33 elasticbeanstalk-eu-central-1-886403637725
2017-05-12 04:03:10 elasticbeanstalk-us-east-1-886403637725
2017-02-25 06:36:17 elasticbeanstalk-us-east-2-886403637725
2016-11-19 09:30:11 elasticbeanstalk-us-west-1-886403637725
2016-09-02 09:14:52 elasticbeanstalk-us-west-2-886403637725
2017-03-21 00:22:23 l1p-metrics-processing
2020-01-20 15:47:23 mojaloop-ci-reports
2019-02-12 01:14:07 mojaloop-helm-repo
2019-02-12 19:09:18 mojaloop-oss-qa-results
2019-11-07 00:42:51 mojaloop-wso2-dependencies
2019-11-08 17:53:45 oss-lab-performance-bucket-state
```