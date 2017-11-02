import React from 'react';
import Search from './search';
import List from './list';
import * as Util from '../util';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.timer;
    this.state = {
      infoWindow: new google.maps.InfoWindow(),
      userMarker: null,
      timer: null,
      currentBouncingMarker: null,
      results: [],
      markers: [],
      center: this.props.center,
      map: this.props.map,
      lastRequest: "",
      rankByDistance: false
    };
    this.service = new google.maps.places.PlacesService(this.props.map);
    this.handleSearch = this.handleSearch.bind(this);
    this.activateMarker = this.activateMarker.bind(this);
    google.maps.event.addListener(this.state.infoWindow, 'closeclick', () => {
      this.stopBounce();
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const { femaleIcon, maleIcon } = Util;
      const { map, lastRequest, rankByDistance } = this.state;
      const center = new google.maps.LatLng(latitude, longitude);
      const userMarker = new google.maps.Marker({
        map,
        icon: femaleIcon,
        animation: google.maps.Animation.DROP,
        position: center
      });

      google.maps.event.addListener(userMarker, 'click', () => {
        userMarker.setIcon(
          userMarker.icon.url === '../icons/man.png' ? femaleIcon : maleIcon
        );
      });
      
      this.setState({center, userMarker});
      map.panTo(center);
      this.handleSearch(lastRequest, rankByDistance);
    });

    this.state.map.addListener('center_changed', () => {
      const { map, center, lastRequest, rankByDistance } = this.state;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (Util.distanceCalculator(map.getCenter(), center) > 10000)
          this.handleSearch(lastRequest, rankByDistance);
      }, 100);
    });
  }

  handleSearch(lastRequest, rankByDistance) {
    const center = this.state.map.getCenter()
    const prop = rankByDistance ? 'rankBy' : 'radius';
    const value = rankByDistance ? google.maps.places.RankBy.DISTANCE : 8047;
    const req = {
      location: center,
      [prop]: value,
      keyword: [lastRequest]
    };

    this.service.nearbySearch(req, (results, status) => {
      const markers = [];
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.clearMarkers();
        results.forEach(el => markers.push(this.createMarker(el)));
        this.setState({results, markers, center, lastRequest, rankByDistance});
      }
    });
  }

  createMarker(place) {
    const marker = new google.maps.Marker({
      map: this.state.map,
      icon: Util.markerIcon,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', () => this.activateMarker(place, marker));
    return marker;
  };

  clearMarkers() {
    this.state.markers.forEach(marker => marker.setMap(null));
    this.setState({markers: []});
  };

  activateMarker(place, marker) {
    const { infoWindow, map, currentBouncingMarker } = this.state;
    infoWindow.setContent(Util.infoWindowBuilder(place));
    infoWindow.open(map, marker);
    if (currentBouncingMarker) this.stopBounce();
    this.startBounce(marker);
    map.panTo(marker.position);
  };

  stopBounce() {
    const marker = this.state.currentBouncingMarker;
    if (marker) this.setState({currentBouncingMarker: null});
    if (marker.getAnimation() !== null) marker.setAnimation(null);
  };

  startBounce(marker) {
    const { currentBouncingMarker } = this.state;
    if (marker.getAnimation() === null)
      marker.setAnimation(google.maps.Animation.BOUNCE);
    this.setState({currentBouncingMarker: marker});
  };

  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch} />
        <div id="list-shadow"></div>
        <List results={this.state.results} activateMarker={this.activateMarker} markers={this.state.markers}/>
      </div>
    );
  }
}

export default Root;
