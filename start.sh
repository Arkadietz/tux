#!/bin/bash

cd /home/kiril/tux/
screen -S tux -d -m bash -c 'node ircbot.js || exec bash'
