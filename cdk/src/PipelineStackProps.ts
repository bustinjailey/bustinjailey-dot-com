import { StackProps } from '@aws-cdk/core';
import UiBuildProps from './build/UiBuildProps';
import SourceGithubRepositoryProps from './SourceGithubRepositoryProps';

interface PipelineStackProps extends StackProps {
  readonly appName: string;
  /**
   * Optional.  Used to create a Route53 alias pointing at the public S3 bucket.
   */
  readonly domainName: string;
  readonly certificateArn: string;
  readonly sourceGithubRepositoryProps: SourceGithubRepositoryProps;
  readonly uiBuildProps: UiBuildProps;
}

export default PipelineStackProps;
