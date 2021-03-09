import { execSync } from 'child_process';

export default function getCurrentBranchName(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}