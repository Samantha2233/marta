# Marta Arrivals Exercise

![Application Screenshot](/public/screenshot.png)

This application gives the user a list of train stations to select as their Starting Point.
Once they have selected a Starting Point, the app will display the next arrival times of that station.

## Features
- Typeahead / dropdown inputs
- Interactive SVG map (click on a station to select it)

## Tech
- Zustand
- SVGR
- Vite
- react-select
- chakra-ui
- dayjs

## Challenges
One of the biggest challenges I faced during this exercise was connecting to the Marta API. After receiving the API key from Marta, I would consistently hit a CORS error: 

<img src='public/error-screenshot.png' width='350px'>

I tried proxying the request which would return a 403 Unauthorized Error.
I considered setting up a back end to securely store the API key and build my own proxy. Alas, since this is a front end challenge, I decided to stick to focusing on the front end implementation.

## Next Steps
- Successfully connect to Marta API
- Make sure it is fully accessible