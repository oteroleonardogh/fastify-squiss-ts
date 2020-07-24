# EXCHANGE API SERVICE

## Building the API

```Bash
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

To visualise messages sent to queue please navigate in your browser to http://localhost:9325/
