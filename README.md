Source code for www.bustinjailey.com plus the Continuous Deployment pipeline used to depoy it

# Building bustinjailey-dot-com UI
```
cd ui/bustinjailey-dot-com
npm install
npm run build
```

# Deploying CDK code
/cdk contains the build and deploy pipeline stack for the site.  It also contains definitions of the various AWS services used to host www.bustinjailey.com.
```
cd cdk
npm install
source ~/.code-secrets && cdk deploy
```
~/.code-secrets provides GITHUB_TOKEN, AWS_ACCOUNT_ID, SITE_CERT_ARN environment variables that are required to deploy the CDK stacks.
