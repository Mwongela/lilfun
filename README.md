You will need node JS and npm installed in your machine.

Install ionic and cordova using the following command:
 `npm install -g ionic cordova`
 
Install project dependencies run the following command
`npm install`

*To run the app:*

Run the following command: `ionic serve`. This will serve the application in a browser
To build the application for Android, run the following commands
1. `ionic cordova platform add android` This will add the android platform into the project
2. `ionic cordova build android` This will build an app for android.
3. Connect an android device with debug mode enable then run `ionic cordova run` to run the app on the device.
