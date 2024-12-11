let config = {
  "service": "benchmark",
  "frameworkVersion": "3",
  "plugins": [
    "serverless-esbuild"
  ],
  "provider": {
    "name": "aws",
    "runtime": "nodejs18.x",
    "stage": "${opt:stage, \"dev\"}",
    "region": "us-east-2",
    "deploymentBucket": {
      "name": "deployment-bucket-us-east-2"
    },
    "iam": {
      "role": {
        "statements": [
          {
            "Effect": "Allow",
            "Action": [
              "s3:*"
            ],
            "Resource": "arn:aws:s3:::omattic-us-east-2/*"
          },
          {
            "Effect": "Allow",
            "Action": [
              "s3:*"
            ],
            "Resource": "arn:aws:s3:::omattic-us-east-2"
          }
        ]
      }
    },
    "environment": {
    }
  },
  "package": {
    "patterns": [
      "!**.d.ts",
      "!**/dist-es/**",
      "!test/**"
    ]
  },
  "functions": {
  }
}

let size = 128
do {
  config.functions[`size-${size}`] = {
    "handler": "benchmark.handler",
    "memorySize": 128
  }
  size *= 2
} while (size < 10240)