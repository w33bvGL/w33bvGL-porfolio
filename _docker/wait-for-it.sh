#!/bin/bash
# wait-for-it.sh
# Usage: ./wait-for-it.sh <host> <port> -- <command>

HOST=$1
PORT=$2
shift 2

until bash -c "</dev/tcp/$HOST/$PORT"

do
  echo "Waiting for $HOST in port $PORT"
  sleep 10
done

exec "$@"
