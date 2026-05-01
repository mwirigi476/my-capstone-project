import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { pipelines } from 'aws-cdk-lib';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyCapstonePipeline',
      synth: new pipelines.ShellStep('Synth', {
        
        input: pipelines.CodePipelineSource.gitHub('mwirigi476/my-capstone-project', 'main', {
          authentication: cdk.SecretValue.secretsManager('github-token'),
        }),
        commands: ['npm ci', 'npx cdk synth'],
      }),
    });
  }
}
