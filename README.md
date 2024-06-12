# Project goal

This project will return the sum of all the receipt to help restaurant server to check if they have cashed properly during the day.

## Fonctionnality

This project use a espcam32 to take pictures and send it to our server.js to analyse it and return the value of the receipt and then the sum of all of them.
This will work like a scanner that you see in Supermarket, you press the button to scan the ticket and it return the value of it.
You could use a 3D printer to have a physical object more easy to use.

## Possible improvements

The esp32 is does not have a good picture quality so the AI can't read each time properly the value of the ticket. To improve it you could use a rasberry and plug a better camera.

## Config

You should install the arduino IDE it will be easier to use with the esp32 cam. Then you should select The 'AI Thinker esp32-cam' and build to the cam. Then each time you click on the reset button of the esp32 cam it will restart the code and take to picture.
Also you need to connect your pc to the same WIFI than the credential you add in the CameraWebServer.ino file.

For the server you need to run 'npm i' and then run 'node server.js'

You have some images already in the folder image to test but as i mentioned they have a bad image quality so it does not work properly each time.
