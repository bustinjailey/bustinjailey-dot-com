# TODO
## UI
* Add husky and run tests before commits
* Create landing page
* Hook up to headless CMS
* Set up Commitizen
## CDK
* Split stack into BuildDeployStack and HostingStack
* Write unit tests that assert specifics of wildcards, bucket name, subdomain, and their consistency/interaction between Constructs
* Clean up config structure
* Describe what must be created manually in AWS (SSL certificate in us-east-1)
* Create staging deployment pipeline (git webhook tied to specific branches?  Create subdomain off of branchname like preview)?
## Overall
* Rethink monorepo dependency sharing (pnpm?)