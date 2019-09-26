import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet

class SimpleExample extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

ReactDOM.render(<SimpleExample />, document.getElementById('container'))












// import React, { Component } from "react";
// import L from "leaflet";
// import styled from 'styled-components';
// // this is to make map tiles arrange correctly
// import 'leaflet/dist/leaflet/css'

// // want to be able to control width and height
// const Wrapper = styled.div`
//   width: ${props => props.width};
//   height: ${props => props.height};
// `;

// export default class LeafletMap extends React.Component{
  
//   componentDidMount(){
//     // initialize map with id, then other attributes
//     this.map = L.map('map',
//     {
//       center: [58, 16],
//       // lower the zoom, the further out you are
//       zoom: 6, 
//       zoomControl: false;
//     });

//     L.tileLayer();
//   }
// }