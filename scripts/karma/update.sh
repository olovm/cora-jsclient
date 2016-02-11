#!/bin/bash
find /home/diva2/karma/src/ -name "*.js" | xargs rm -vf
cp -vR /home/diva2/.jenkins/workspace/cora-jsclient/src/* /home/diva2/karma/src/.
