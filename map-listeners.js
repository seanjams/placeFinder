let infoWindow, service, userMarker, timer, currentBouncingMarker;
let lastRequest = "pizza",
    rankByDistance = false,
    markers = [],
    center = new google.maps.LatLng(40.7643401,-73.9817126);



google.maps.event.addDomListener(document, 'DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const list = document.getElementById('list');
  map = new google.maps.Map(document.getElementById('map'), {
    center,
    zoom: 14,
  });
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  //add event listeners to handle resize of list
  initResize(map);
  //seed initial screen
  searchByKeyword(lastRequest, rankByDistance);
  //if browser supports geolocation, render map at user's location
  if (navigator.geolocation) getCurrentLocation();

  //ping API on submission of form
  form.addEventListener('submit', e => {
    e.preventDefault();
    const choice = form.childNodes[5].querySelector('input:checked').value;
    lastRequest = form.childNodes[3].value;
    rankByDistance = choice === "distance";
    searchByKeyword(lastRequest, rankByDistance);
  });

  //ping API with last request made when user has dragged a distance
  // of over 5 miles
  map.addListener('center_changed', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (distanceCalculator(map.getCenter(), center) > 8047)
        searchByKeyword(lastRequest, rankByDistance);
    }, 100);
  });

  //reset animation when closing infoWindow
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    stopBounce(currentBouncingMarker);
  });
});

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    center = new google.maps.LatLng(latitude, longitude);
    userMarker = new google.maps.Marker({
      map,
      icon: femaleIcon,
      animation: google.maps.Animation.DROP,
      position: center
    });

    google.maps.event.addListener(userMarker, 'click', () => {
      userMarker.setIcon(
        userMarker.icon.url === './icons/man.png' ? femaleIcon : maleIcon
      );
    });

    map.panTo(center);
    searchByKeyword(lastRequest, rankByDistance);
  });
};

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

  const callback = () => {
    infoWindow.setContent(infoWindowBuilder(place));
    infoWindow.open(map, marker);
    if (currentBouncingMarker) stopBounce(currentBouncingMarker);
    startBounce(marker);
    map.panTo(marker.position);
  };

  google.maps.event.addListener(marker, 'click', callback);
  li.addEventListener('click', callback);
  return marker;
};

const stopBounce = marker => {
  if (currentBouncingMarker) currentBouncingMarker = null;
  if (marker.getAnimation() !== null) marker.setAnimation(null);
};

const startBounce = marker => {
  currentBouncingMarker = marker;
  if (marker.getAnimation() === null)
    marker.setAnimation(google.maps.Animation.BOUNCE);
};

const clearMarkers = () => {
  markers.forEach(marker => {
    marker.setMap(null);
    list.removeChild(list.firstChild);
  });
  markers = [];
};

const searchByKeyword = (searchText, rankByDistance = false) => {
  center = map.getCenter();
  let prop = rankByDistance ? 'rankBy' : 'radius';
  let value = rankByDistance ? google.maps.places.RankBy.DISTANCE : 8047;
  let req = {
    location: center,
    [prop]: value,
    keyword: [searchText]
  };

  service.nearbySearch(req, (res, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();
      res.forEach(el => markers.push(createMarker(el)));
    }
  });
};
