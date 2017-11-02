export const maleIcon = {
  url: '../icons/man.png',
  scaledSize: new google.maps.Size(20, 60)
},
femaleIcon = {
  url: '../icons/woman.png',
  scaledSize: new google.maps.Size(20, 60)
},
markerIcon = {
  url: '../icons/marker.svg',
  scaledSize: new google.maps.Size(40, 40)
},
ratingColor = {
  1: `#F00`,
  2: `#D50`,
  3: `#CC0`,
  4: `#7D0`,
  5: `#0E0`
},
hourColor = {
  'OPEN': `#4E4`,
  'CLOSED': `#C44`
};

export const infoWindowBuilder = place => {
  let noPhoto = !place.photos;
  let photo = noPhoto ? place.icon
                  : place.photos[0].getUrl({maxWidth: 150, maxHeight: 120});
  let rating = place.rating ? place.rating : "Unavailable";
  let openNow = "Hours Unavailable";
  if (place.opening_hours)
    openNow = place.opening_hours.open_now ? "OPEN" : "CLOSED";

  return `<div class="info-window">
            <h3>${place.name}</h3>
            <a href="https://www.google.com/search?q=${place.name}" target="_blank">
              <img src=${photo} alt=${place.name} class=${noPhoto ? "icon" : ""}>
            </a>
            <p>${place.vicinity}</p>
            <span class="info-window-details">
              <p>Rating: <span style="color:${ratingColor[parseInt(place.rating)]};">${rating}</span></p>
              <p style="color:${hourColor[openNow]}">${openNow}</p>
            <span>
          </div>`
};

//calculates Havasine distance between map coordinates
export const distanceCalculator = (pos1, pos2) => {
  const r = 6371000; // metres
  const lat1 = pos1.lat(), lon1 = pos1.lng(),
        lat2 = pos2.lat(), lon2 = pos2.lng();
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2-lat1) * Math.PI / 180;
  const Δλ = (lon2-lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return r * c;
};
