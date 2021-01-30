import { CloudFrontWebDistribution, PriceClass, SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { Stack } from '@aws-cdk/core';
import PipelineStackProps from '../deploy/PipelineStackProps';
import camelCase from 'camelcase';
import { IBucket } from '@aws-cdk/aws-s3';

export default function getCloudFrontWebDistribution(
  stack: Stack,
  props: PipelineStackProps,
  bucketSource: IBucket,
  certificateArn: string) {
  return new CloudFrontWebDistribution(
    stack,
    `${camelCase(props.appName, { pascalCase: true })}CFDistribution`, {
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: bucketSource
        },
        behaviors: [{ isDefaultBehavior: true }]
      }
    ],
    aliasConfiguration: {
      acmCertRef: certificateArn,
      names: [`www.${props.domainName}`],
      securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2019
    },
    priceClass: PriceClass.PRICE_CLASS_100,
    
  });
}
