import * as codebuild from '@aws-cdk/aws-codebuild';
import { Stack } from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import PipelineStackProps from '../PipelineStackProps';
import { pascalPrefix } from '../util/getStackConstructIdPrefix';

export default function getCodebuildProject(stack: Stack, props: PipelineStackProps)
  : { codebuildProject: codebuild.PipelineProject; codebuildOutput: codepipeline.Artifact; } {
  const codebuildProject = new codebuild.PipelineProject(
    stack,
    `${pascalPrefix(props)}CodebuildBuild`, {
    buildSpec: codebuild.BuildSpec.fromObject({
      version: '0.2',
      phases: {
        install: {
          commands: [
            `cd ${props.uiBuildProps.pathToAppRoot}`,
            props.uiBuildProps.installCommand
          ]
        },
        build: {
          commands: [
            props.uiBuildProps.buildCommand
          ]
        }
      },
      artifacts: {
        'base-directory': props.uiBuildProps.pathToBuildOutput,
        files: [
          '**/*'
        ]
      },
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_2_0
      }
    })
  });

  return {
    codebuildProject,
    codebuildOutput: new codepipeline.Artifact(`${pascalPrefix(props)}CodebuildBuildOutput`)
  };
}
