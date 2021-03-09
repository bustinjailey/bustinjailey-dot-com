import { StackProps } from '@aws-cdk/core';
import UiBuildProps from './build/UiBuildProps';
import SourceGithubRepositoryProps from './SourceGithubRepositoryProps';

interface PipelineStackProps extends StackProps {
  readonly appName: string;
  readonly subdomainName: string;
  readonly certificateArn: string;
  readonly sourceGithubRepositoryProps: SourceGithubRepositoryProps;
  readonly uiBuildProps: UiBuildProps;
}

export default PipelineStackProps;
