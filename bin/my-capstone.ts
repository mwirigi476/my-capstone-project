#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WorkflowStack } from '../lib/workflow-stack';

const app = new cdk.App();
new WorkflowStack(app, 'MyWorkflowStack', {
  env: { 
    account: '093796422314', // <--- Paste your Account ID here
    region: 'us-east-1'      // <--- Make sure this matches your aws configure region
  },
});
