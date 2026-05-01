#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WorkflowStack } from '../workflow-stack';
import { PipelineStack } from '../lib/pipeline-stack'; // Add this import

const app = new cdk.App();

// Your existing Workflow
new WorkflowStack(app, 'MyWorkflowStack', {
  env: { account: '093796422314', region: 'us-east-1' },
});

// Your NEW Pipeline
new PipelineStack(app, 'MyPipelineStack', {
  env: { account: '093796422314', region: 'us-east-1' },
});
