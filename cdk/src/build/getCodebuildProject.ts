import * as codebuild from '@aws-cdk/aws-codebuild';
import { Stack } from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import camelCase from 'camelcase';
import PipelineStackProps from '../PipelineStackProps';

export default function getCodebuildProject(stack: Stack, props: PipelineStackProps)
  : { codebuildProject: codebuild.PipelineProject; codebuildOutput: codepipeline.Artifact; } {
  const codebuildProject = new codebuild.PipelineProject(
    stack,
    `${camelCase(props.appName, { pascalCase: true })}CodebuildBuild`, {
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
    codebuildOutput: new codepipeline.Artifact(`${camelCase(props.appName, { pascalCase: true })}CodebuildBuildOutput`)
  };
}
