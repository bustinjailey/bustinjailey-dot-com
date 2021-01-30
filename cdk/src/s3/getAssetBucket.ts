import { Stack } from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import PipelineStackProps from '../deploy/PipelineStackProps';

export default function getAssetBucket(stack: Stack, props: PipelineStackProps) {
  const recordName = 'www';

  return new s3.Bucket(stack, props.appName + '-bucket', {
    bucketName: [recordName, props.appName].join('.'),
    publicReadAccess: true,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    websiteIndexDocument: 'index.html'
  });
}
