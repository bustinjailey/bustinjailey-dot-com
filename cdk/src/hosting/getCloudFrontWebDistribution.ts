import { CloudFrontWebDistribution, PriceClass, SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { Stack } from '@aws-cdk/core';
import PipelineStackProps from '../PipelineStackProps';
import { IBucket } from '@aws-cdk/aws-s3';
import { pascalPrefix } from '../util/getStackConstructIdPrefix';

export default function getCloudFrontWebDistribution(
  stack: Stack,
  props: PipelineStackProps,
  bucketSource: IBucket,
  certificateArn: string) {
  return new CloudFrontWebDistribution(stack, `${pascalPrefix(props)}CFDistribution`, {
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
      names: [`${props.subdomainName}.${props.appName}`],
      securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2019
    },
    priceClass: PriceClass.PRICE_CLASS_100,

  });
}
