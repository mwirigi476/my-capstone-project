import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export class WorkflowStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create SSM Parameter
    const configParam = new ssm.StringParameter(this, 'AppGreeting', {
      parameterName: '/app/config/greeting',
      stringValue: 'Hello from CI/CD Automated Infrastructure!',
    });

    // 2. Create Lambda
    const myLambda = new lambda.Function(this, 'WorkflowTask', {
      runtime: lambda.Runtime.NODEJS_16_X, 
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    });

    configParam.grantRead(myLambda);

    // 3. Create Step Function Task with Retries
    const submitTask = new tasks.LambdaInvoke(this, 'Invoke Task', {
      lambdaFunction: myLambda,
    });
    
    submitTask.addRetry({ maxAttempts: 2 });

    // --- ADDED FOR STEP 2 RUBRIC: A "Wait" state ---
    const waitState = new stepfunctions.Wait(this, 'Wait 5 Seconds', {
      time: stepfunctions.WaitTime.duration(cdk.Duration.seconds(5)),
    });

    // Chain them together: Wait -> then Invoke Lambda
    const chain = waitState.next(submitTask);

    // 4. Define State Machine (Updated to use the chain)
    new stepfunctions.StateMachine(this, 'MyStateMachine', {
      definition: chain, 
    });
  }
}
