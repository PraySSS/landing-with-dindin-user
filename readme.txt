Navigate to your node_modules/react-native/Libraries/Core/Timers/JSTimers.js file.
To sort this out you need to hard code the value, increase the value of the variable MAX_TIMER_DURATION_MS. Here are the steps:

Go to node_modules/react-native/Libraries/Core/Timer/JSTimers.js

Look for the variable MAX_TIMER_DURATION_MS

Change 60 * 1000 to 10000 * 1000

Save the changes and re-build your app.
