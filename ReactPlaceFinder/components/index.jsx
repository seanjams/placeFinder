import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('list-search-container');
  const center = new google.maps.LatLng(37.7758009,-122.4551182);
  const map = new google.maps.Map(document.getElementById('map'), {
    center,
    zoom: 14,
  });
  ReactDOM.render(<Root map={map} center={center} />, root);
  initResize();
});

const initResize = () => {
  let pageWidth, isResizing;
  const handle = document.getElementById('handle'),
        left = document.getElementById('list-search-container'),
        right = document.getElementById('map-container');

  handle.addEventListener('mousedown', () => {
    isResizing = true;
    pageWidth = window.innerWidth;
  });

  document.addEventListener('mousemove', e => {
    if (!isResizing) return;
    let percentage = (100 * e.clientX / pageWidth).toFixed(1);
    if (percentage > 70) percentage = 70;
    left.style.width = `${percentage}%`;
    right.style.width = `${100 - percentage}%`;
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    google.maps.event.trigger(map, "resize");
  });
};
