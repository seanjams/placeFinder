# PlaceFinder

[Live Demo](http://www.seanoreilly.co/placefinder)

PlaceFinder uses Google Maps API and Google Places API to produce a simple search form, with a list of results and marked locations on the map. This repository contains two versions of the app. The first version is done with Vanilla Javascript, providing event listeners and manipulating the DOM directly. The second version uses React to render all components and handle events. While the implementation of each is quite different, the result is identical!

### Technologies Used
- Javascript (ES6)
- Google Maps API
- Google Places API
- React.js
- HTML5/CSS3
- Webpack/Babel


## Vanilla JS

Navigate to `/VanillaPlaceFinder` and run `open index.html` in the terminal. Be sure to enable location services when the browser prompts for consent.

## React

Navigate to `/ReactPlaceFinder` and run the following commands in the terminal:

1. `npm install` - Will install all dependencies and generate the necessary bundle.js file
2. `open index.html`

Again, be sure to enable location services when the browser prompts for consent.

## Features
- Users can search by keyword and filter results by distance or popularity.
- Map continuously repopulates search results as user scrolls around.
- Both list items and corresponding markers can be clicked to access an infoWindow, which can be clicked to open more information in another browser tab.
- Custom Marker Icons for places and current location. Click on your location to personalize!
- Resizable List and Map
