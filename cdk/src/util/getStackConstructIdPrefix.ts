import camelcase = require("camelcase");
import PipelineStackProps from "../PipelineStackProps";

export function pascalPrefix(props: PipelineStackProps): string {
  return camelcase(props.subdomainName + '.' + props.appName, { pascalCase: true });
}
