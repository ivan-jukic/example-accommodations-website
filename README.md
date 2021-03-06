#Accommodations App (MEAN example)
*This is an example web app built on MEAN stack, for listing accommodations.*

The back end of this app is built on top of https://github.com/ivan-jukic/jet-framework/. The front end of the app is built with angular, and it's using requirejs for dependency injection.

A live example can be viewed on: http://travel.ivanjukic.com/. It's running on an AWS instance.

## Some additional ideas:

* Add details page for each accommodation
* Animate transitions between different accommodation list pages
* Add tests (BDD Jasmine for both BE and FE)
* Automated deployment (eg. using Grunt/Gulp, minification and concatenation of scripts)

## Installing

* make sure you have Node.js and MongoDB installed
* clone the repository
```
git clone https://github.com/ivan-jukic/example-accommodations-website.git
```
* copy default.config.js to config.js; make any changes necessary in the configuration
```
copy default.config.js config.js
```
* Install node modules
```
npm install
```
* Install bower moodules
```
bower install
```
* navigate to the app root and run the app (replace &lt;port&gt; with a number)
```
node index <port>
```
* After the app has started, open your browser and go to (use the same port number)
```
http://localhost:<port>
```

## Upstart script (Linux)

When deploying in a server environment, we need to run the app as a service, and for that we use upstart.
Here is an example of an upstart script which could be used to run this or similar apps.

```upstart
#!upstart
description "<app description>"

env FULL_PATH="<full_path_to_your_project>"
env APP_INDEX="<app_index_file>"
env APP_PORT="<port_number>"
env NODE_PATH="<node_location>"
env PID_FILE="<pid_file_location>"
env LOG_FILE="<log_file_location>"

start on filesystem on runlevel [2345]
stop on [!2345]

script
        echo $$ > $PID_FILE
        cd $FULL_PATH
        exec $NODE_PATH $APP_INDEX $APP_PORT >> $LOG_FILE 2>&1
end script

pre-start script
        echo "[`date`] (sys) starting app" >> $LOG_FILE
end script

pre-stop script
        rm $PID_FILE
        echo "[`date`] (sys) stopping app" >> $LOG_FILE
end script
```

## LICENCE

Released under [MIT licence](http://mit-license.org/).
