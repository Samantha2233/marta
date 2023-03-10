# Marta Arrivals Exercise

![Application Screenshot](/public/screenshot.png)

DEMO LINK: https://marta-delta.vercel.app/

Marta Arrivals provides a list of train stations to select as a starting point.
Once a starting point is selected, arrival times of that station will be displayed.
1 minute after the starting point is selected, the user has the option to click the Refresh button which would update the countdown times.

Disclaimer: The destination input doesn't do anything ATM!

## Features
- Typeahead / dropdown inputs
- Interactive SVG map
- Refresh to see updated countdown to arrivals
- Desktop / mobile responsive

## Tech
- TypeScript
- Zustand
- Chakra UI
- SVGR
- Vite
- React Select
- Day.js

## Simulated API
One of the biggest challenges I faced during this exercise was connecting to the Marta API. After receiving the API key from Marta, I would consistently hit a CORS error: 

<img src='public/error-screenshot.png' width='350px'>

In attempt to proxy the request, it would return a 403 Unauthorized Error.

After considering setting up a server to try to connect, (since this is a front end exercise) I decided to stick to focusing on the front end implementation! Instead, I simulated an API request by immitating the structure of the Marta API and generated new times based on the current time. Then, recalculate the countdown when the Refresh button is pressed.

## Next Steps
- Successfully connect to Marta API
- Refresh automatically every minute or two for a set amount of time (remove refresh button)