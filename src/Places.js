import React, { Component } from "react";
import axios from "axios";
import css from './Places.css';
import {Button, InputGroup, FormControl, Form, ListGroup} from 'react-bootstrap';
import {Table} from 'antd';
import InteractiveMap from './InteractiveMap.js';

// import { Container, Row, Col } from "react-bootstrap"

// Brandon Williams
//const API_Key = process.env.REACT_APP_API_KEY;

// const mapResults = restaurants => {
//         return restaurants.map(restaurant => 
//             <ListGroup.Item>{restaurant.name}: {restaurant.rating} Stars, {"$".repeat(parseInt(restaurant.price_level))}</ListGroup.Item>
//             // <li>{restaurant.name}{restaurant.rating}{restaurant.price_level}</li>
//       );
// }


const columns = [{
  title: 'Restaurant',
  dataIndex: 'restaurant',
  key: 'restaurant',
}, {
  title: 'Rating',
  dataIndex: 'rating',
  key: 'rating',
}, {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
}];

export default class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        restaurants: [],
        cuisine_query: "",
        address_query: "Charlottesville",
        coordinates: [],
        datasource: [],
        newLat: 38.0293,
        newLong: -78.4767,
        restaurantNames: [],
    };
  }

  handleCuisineChange = event => {
    this.setState({
      cuisine_query: event.target.value,
    });
  };

  handleAddressChange = event => {
    this.setState({
      address_query: event.target.value,
    });
  };

  handleClick = event => {
    this.componentDidMount();
  }

  componentDidMount() {
    // let googleplacesURL = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + this.state.cuisine_query + " restaurants+in "+ this.state.address_query +"&key=AIzaSyBQRbOl8Z5HnrY12zURP84C6Tdwsoy-HUI";
    axios
        .get(("/restaurant/" + this.state.address_query + "/" + this.state.cuisine_query))
        .then(response =>{
        const data = response.data.results; 
        const open_restaurants = [];
        const coordinate_data = [];
        const table_data = [];
        const resNames = [];
        for (let i = 0; i < data.length; i++){
          if (data[i].opening_hours.open_now == true){
            open_restaurants.push(data[i]);
            coordinate_data.push([
              data[i].geometry.location.lat,
              data[i].geometry.location.lng,
            ]);
            table_data.push({
              key: i.toString(),
              restaurant: data[i].name,
              rating: data[i].rating,
              price: data[i].price_level,
            });
            resNames.push(data[i].name);
          }
        }
        this.setState({
            restaurants: open_restaurants,
            coordinates: coordinate_data,
            datasource: table_data,
            newLat: open_restaurants[0].geometry.location.lat,
            newLong: open_restaurants[0].geometry.location.lng,
            restaurantNames: resNames,
        })
        });
  }

  render() {
    return (
      <div>
          <h1>Find Restaurants Near You!</h1> 
          <InputGroup className = "mb-3">
            <InputGroup.Prepend>
              <Button bsStyle='success' onClick = {this.handleClick}>Search</Button>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Enter address..."
              value={this.state.address_query}
              onChange={this.handleAddressChange}
            />
              <FormControl
                placeholder="Search food..."
                value={this.state.cuisine_query}
                onChange={this.handleCuisineChange}
              />
          </InputGroup>
        
         <section class="container">
        <div class="one">
          <Table dataSource={this.state.datasource} columns={columns} />
        </div>
        <div class="two">
        {(this.state.coordinates.length > 0)?(<div><InteractiveMap coordinates={this.state.coordinates} newLat={this.state.newLat} newLong={this.state.newLong} restaurantNames={this.state.restaurantNames}/></div>):(<div></div>)}
        </div>
        </section> 
      </div>
    );
  }
}