# EXCHANGE API SERVICE

## Building the API

Important: you need node 12 for building (you may require to use nvm use 12)

## Adding .env file in the project root

Once you clone project repo you need first to add .env file with the following entries

```bash
PORT= 3000
SUPORT_EMAIL= support@pruvo.com

# SQS EXCHANGE CONFIG
SQS_REGION=dummy
SQS_DELAY=0
SQS_EXCHANGE_ACCESS_KEY_ID=dummy
SQS_EXCHANGE_SECRET_ACCESS_KEY_ID=dummy
SQS_EXCHANGE_ENDPOINT=http://sqs-exchange:9324
SQS_EXCHANGE_QUEUE_URL=http://sqs-exchange:9324/queue/default
SQS_QUEUE_NAME=sqs-exchange
SQS_MAX_IN_FLIGHT=15

# OPENEXCHANGERATES CONFIG

OPENEXCHANGERATES_API_KEY=4a96af2d932d4c7ea145259ed0c0c511
OPENEXCHANGERATES_API_BASE_URL=https://openexchangerates.org/api
```

## Installing dependencies

```bash
yarn install
```

## Transpiling Typescript into javascript and creating dist folder

```bash
yarn build
```

## Build docker images (from scratch avoiding any catched build step)

```bash
docker-compose build --force-rm --no-cache
```

IMPORTANT: If this step fails please backup first ~/.docker/config.json and then execute:

```Bash
rm ~/.docker/config.json
```

## Launch API, Queue (based on Squiss-ts), and Exchange Processor

```bash
docker-compose up
```

Wait until sqs-exchange logs: Adding consumer for default

## Calling to Exchange API Service

From your browser navigate to: http://127.0.0.1:3000/exchange/ARS/USD/1234.25

Or simply use curl from your command prompt:

```bash
 curl http://127.0.0.1:3000/exchange/ARS/USD/1234.25
```

You should receive something like:

```
{"msg":"You will receive an email with requested exchange from: ARS 1234.25 to USD pretty soon"}
```

## Visualizing Exchange Queue Messages

To visualise messages sent to queue please navigate in your browser to: http://localhost:9325

## Testing Exchange API performance

A performance test script based in k6.io is also provided. Here is how you can run the test:

- Check first that 3 exchange containers are up and running.
- Then you can run test using

```bash
yarn test
```

## Screenshots

[[https://raw.githubusercontent.com/oteroleonardo/fastify-squiss-ts/master/docs/screenshot2.png |alt=k6.io]]

[[https://raw.githubusercontent.com/oteroleonardo/fastify-squiss-ts/master/docs/screenshot1.png |alt=Stquiss-ts web console]]
