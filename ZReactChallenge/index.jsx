import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoWindow: new google.maps.InfoWindow(),
      service: new google.maps.places.PlacesService(this.props.map),
      userMarker: null,
      timer: null,
      currentBouncingMarker: null,
      markers: [],
      center: this.props.center,
      map: this.props.map
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {

  }

  handleSearch(lastRequest, rankByDistance) {
    console.log(lastRequest, rankByDistance);
  }



  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch} />

      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('list-search-container');
  const center = new google.maps.LatLng(37.7758009,-122.4551182);
  const map = new google.maps.Map(document.getElementById('map'), {
    center,
    zoom: 14,
  });
  ReactDOM.render(<Root map={map} center={center}/>, root);
});
