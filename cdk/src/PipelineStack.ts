import { App, Stack, SecretValue } from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipelineActions from '@aws-cdk/aws-codepipeline-actions';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import PipelineStackProps from './PipelineStackProps';
import getCodebuildProject from './build/getCodebuildProject';
import getAssetBucket from './hosting/getAssetBucket';
import camelCase from 'camelcase';
import createAlias from './hosting/createAlias';
import getCloudFrontWebDistribution from './hosting/getCloudFrontWebDistribution';

export default class PipelineStack extends Stack {
  constructor(app: App, id: string, props: PipelineStackProps) {
    super(app, id, props);

    const sourceOutput = new codepipeline.Artifact();
    const { codebuildProject, codebuildOutput } = getCodebuildProject(this, props);
    const assetBucket = getAssetBucket(this, props);
    const distribution = getCloudFrontWebDistribution(this, props, assetBucket, props.certificateArn);

    if (props.domainName) {
      createAlias(this, 'www', props.domainName, new CloudFrontTarget(distribution));
    }

    // eslint-disable-next-line no-new
    new codepipeline.Pipeline(this, `${camelCase(props.appName, { pascalCase: true })}Pipeline`, {
      stages: [
        {
          stageName: 'GetSource',
          actions: [
            new codepipelineActions.GitHubSourceAction({
              actionName: 'Checkout',
              output: sourceOutput,
              owner: props.sourceGithubRepositoryProps.repoOwnerName,
              repo: props.sourceGithubRepositoryProps.repoName,
              oauthToken: SecretValue.plainText(props.sourceGithubRepositoryProps.githubToken),
              trigger: codepipelineActions.GitHubTrigger.WEBHOOK
            })
          ]
        },
        {
          stageName: 'Build',
          actions: [
            new codepipelineActions.CodeBuildAction({
              actionName: 'Build_Upload_Artifacts',
              project: codebuildProject,
              input: sourceOutput,
              outputs: [codebuildOutput]
            })
          ]
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipelineActions.S3DeployAction({
              actionName: 'Deploy',
              input: codebuildOutput,
              bucket: assetBucket
            })
          ]
        }
      ]
    });
  }
}
