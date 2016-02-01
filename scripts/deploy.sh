!/bin/bash
cd $CATALINA_HOME/webapps/
rm -vfR jsclient/*
cd jsclient
unzip ~/epc-apps/jsclient.jar
