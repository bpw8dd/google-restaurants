import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet'
import Places from './Places.js'
import { PropTypes } from 'react';




export default class InteractiveMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13
    }
  }


  render() {
    // const position = [this.state.lat, this.state.lng];
    //console.log(this.props.coordinates);
    return (
    <div>
      {(this.props.newLat !== undefined) && (
      <Map center={[this.props.newLat, this.props.newLong]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        />
        {(this.props.coordinates !== undefined) &&((this.props.coordinates).map(coordinate => {
            return(
           <CircleMarker center={[
               coordinate[0], 
               coordinate[1],
               ]}radius={10}>
                   <Popup>
             A pretty CSS3 popup. <br/> Easily customizable.
           </Popup>
           </CircleMarker> ) } ))  }

      </Map>)}
      </div>
    );
  }


  /* <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker> */
//     mapCoordinates = coordinates => {
//     return (this.props.coordinates).map(coordinate =>
//         <Marker position={[coordinate.lat, coordinate.lng]}>
//           {/* <Popup>
//             A pretty CSS3 popup. <br/> Easily customizable.
//           </Popup> */}
//         </Marker>
//   );
}



ReactDOM.render(<InteractiveMap />, document.getElementById('container'))