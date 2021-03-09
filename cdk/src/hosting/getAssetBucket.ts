import { Stack } from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import PipelineStackProps from '../PipelineStackProps';
import { pascalPrefix } from '../util/getStackConstructIdPrefix';

export default function getAssetBucket(stack: Stack, props: PipelineStackProps) {
  return new s3.Bucket(stack, `${pascalPrefix(props)}Bucket`, {
    bucketName: [props.subdomainName, props.appName].join('.'),
    publicReadAccess: true,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    websiteIndexDocument: 'index.html'
  });
}
