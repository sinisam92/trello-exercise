#!/bin/bash

# Port to check
PORT=3044

# Check if the port is in use
PID=$(lsof -ti :$PORT)

# If a process is found, kill it
if [ -n "$PID" ]; then
  echo "Port $PORT is in use by PID $PID. Terminating process..."
  kill -9 $PID
else
  echo "Port $PORT is free."
fi

# Start Vite server
npm run dev
