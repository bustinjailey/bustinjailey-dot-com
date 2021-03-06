#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import PipelineStack from './PipelineStack';
import getCurrentBranchName from './util/getCurrentBranchName';
import { pascalPrefix } from './util/getStackConstructIdPrefix';

if (!process.env.GITHUB_TOKEN) {
  // eslint-disable-next-line no-console
  console.log('Cannot deploy: No Github Token present');
}

if (!process.env.AWS_ACCOUNT_ID) {
  // eslint-disable-next-line no-console
  console.log('Cannot deploy: No AWS Account ID present');
}

if (!process.env.SITE_CERT_ARN) {
  // eslint-disable-next-line no-console
  console.log('Cannot deploy: No site SSL certificate ARN present');
}

const currentBranch = getCurrentBranchName();
const appName = 'bustinjailey.com';

const pipelineStackProps = {
  appName: appName,
  subdomainName: currentBranch === 'master' ? 'www' : `www-${currentBranch}`,
  certificateArn: process.env.SITE_CERT_ARN!,
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: 'us-west-2'
  },
  uiBuildProps: {
    pathToAppRoot: 'ui',
    pathToBuildOutput: 'ui/build',
    installCommand: 'npm install',
    buildCommand: 'npm run build'
  },
  sourceGithubRepositoryProps: {
    repoName: 'bustinjailey-dot-com',
    repoOwnerName: 'bustinjailey',
    githubToken: process.env.GITHUB_TOKEN || ''
  }
};

const app = new App();
// eslint-disable-next-line no-new
new PipelineStack(app, `${pascalPrefix(pipelineStackProps)}BuildDeployPipelineStack`, pipelineStackProps);
app.synth();
