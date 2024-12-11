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
      "name": process.env.BUCKET_NAME
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
  config.functions["memory" + size + "ram"] = {
    "handler": "benchmark.handler",
    "memorySize": size
  }
  size *= 2
} while (size < 10240)

console.log("config", JSON.stringify(config, null, 2))

module.exports = config