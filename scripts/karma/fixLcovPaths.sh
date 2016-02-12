#!/bin/bash
sed -i 's/\/karma\//\/\.jenkins\/workspace\/cora-jsclient\//' /home/diva2/.jenkins/workspace/cora-jsclient/karma-coverage/Firefox\ 44.0.0\ \(Ubuntu\ 0.0.0\)/lcov.info

java -cp /home/diva2/karma/saxon-9.1.0.1.jar net.sf.saxon.Transform -xsl:/home/diva2/karma/genericReport.xsl -s:/home/diva2/.jenkins/workspace/cora-jsclient/karma-reports/TEST-karma.xml -o:/home/diva2/.jenkins/workspace/cora-jsclient/karma-reports/TEST-generic.xml
