import React from 'react';
import * as Util from './util';

class List extends React.Component {

  renderListItems() {
    return this.props.results.map((place, i) => {
      const { activateMarker, markers } = this.props;
      const noPhoto = !place.photos;
      const photo = noPhoto ? place.icon
                      : place.photos[0].getUrl({maxWidth: 200, maxHeight: 200});
      const rating = place.rating ? place.rating : "Unavailable";
      let openNow = "Hours Unavailable";
      if (place.opening_hours)
        openNow = place.opening_hours.open_now ? "OPEN" : "CLOSED";

      return (
        <li key={`list-item-${i}`}>
          <div className="list-item" onClick={() => activateMarker(place, markers[i])}>
            <img src={photo} alt={place.name} className={noPhoto ? "icon" : ""} />
            <div className="list-item-info">
              <h3>{place.name}</h3>
                <p>{place.vicinity}</p>
                <p>Rating: <span style={{color: Util.ratingColor[parseInt(place.rating)]}}>{rating}</span></p>
                <p style={{color: Util.hourColor[openNow]}}>{openNow}</p>
            </div>
          </div>
        </li>
      )
    });
  }

  render() {
    return (
      <div id="list-container">
        <ul id="list">{ this.renderListItems() }</ul>
      </div>
    );
  }
};

export default List;
