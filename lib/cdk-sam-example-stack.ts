import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from "node:path";
import {Runtime} from "aws-cdk-lib/aws-lambda";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";

export class CdkSamExampleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: 'app.lambda_handler',
            code: lambda.Code.fromAsset('./my_function'),
        });

        new NodejsFunction(this, "MyFunctionTS", {
            entry: path.join(__dirname, "../functions/app.ts"),
            handler: "parseJwtToken",
            runtime: Runtime.NODEJS_20_X,
            bundling: {
                minify: true,
            },
        });
    }
}