interface UiBuildProps {
  readonly pathToAppRoot: string;
  readonly installCommand: string;
  readonly buildCommand: string;
  readonly pathToBuildOutput: string;
}

export default UiBuildProps;
