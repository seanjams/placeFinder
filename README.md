<!-- # Zenefits Coding Challenge -->

# PlaceFinder

Check out the [Live Demo](http://www.seanoreilly.co/placeFinder)
To enable GeoLocation, clone the repo and run `open index.html` from the terminal.

## Technologies Used
- Javascript (ES6)
- Google Maps API
- Google Places API

## Features
- Search by Distance or Popularity.
- Map continuously populates search results as the user scrolls.
- Resizable Location List
- Custom Marker Icons

## Coding Challenges
```javascript
const createMarker = place => {
  const li = document.createElement('li');
  li.innerHTML = listItemBuilder(place);
  list.appendChild(li);

  const marker = new google.maps.Marker({
    map,
    icon: markerIcon,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
  });

  const activateMarker = () => {
    infoWindow.setContent(infoWindowBuilder(place));
    infoWindow.open(map, marker);
    if (currentBouncingMarker) stopBounce(currentBouncingMarker);
    startBounce(marker);
    map.panTo(marker.position);
  };

  google.maps.event.addListener(marker, 'click', activateMarker);
  li.addEventListener('click', activateMarker);
  return marker;
};
```
