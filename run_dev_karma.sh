#!/usr/bin/env bash
firefox reports/coverage/firefox/lcov-report/index.html &
./node/node ./node_modules/karma/bin/karma start karma-dev.conf.js
