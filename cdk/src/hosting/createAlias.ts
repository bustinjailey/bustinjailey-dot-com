import { Stack } from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { IAliasRecordTarget } from '@aws-cdk/aws-route53';

export default function createAlias(stack: Stack, recordName: string, domainName: string, target: IAliasRecordTarget) {
  const zone = route53.HostedZone.fromLookup(stack, 'Zone', { domainName });

  // eslint-disable-next-line no-new
  new route53.ARecord(stack, 'AliasRecord', {
    zone,
    recordName,
    target: route53.RecordTarget.fromAlias(target)
  });
}
