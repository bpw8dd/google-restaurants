import React, { Component } from "react";
import axios from "axios";

// Brandon Williams
//const API_Key = process.env.REACT_APP_API_KEY;

const mapResults = restaurants => {
        return restaurants.map(restaurant => 
          <li> Restaurant: {restaurant.name} Rating: {restaurant.rating} Price: {restaurant.price_level}</li>
      );
}
export default class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        restaurants: [],
        cuisine_query: "",
    };
  }

  handleChange = event => {
    this.setState({
      cuisine_query: event.target.value,
    });
  };

  handleClick = event => {
    this.componentDidMount();
  }

  componentDidMount() {
    let googleplacesURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + this.state.cuisine_query + "restaurants+in+Charlottesville&key=AIzaSyBQRbOl8Z5HnrY12zURP84C6Tdwsoy-HUI";
    axios
        .get(googleplacesURL)
        .then(response =>{
        const data = response.data.results; 
        const open_restaurants = [];
        for (let i = 0; i < data.length; i++){
          if (data[i].opening_hours.open_now == true){
            open_restaurants.push(data[i]);
          }
        }
        
        this.setState({
            restaurants: open_restaurants,
        });
        });
  }

  render() {
    return (
      <div>
          <h1>Get a Taste of Charlottesville!</h1> 
          <h3>Open Near you:</h3>

          <form>
              <label>
                  Fuck u want?
                  <input type="text" 
                  value={this.state.cuisine_query}
                  onChange={this.handleChange} 
                  />
              </label>
          </form>>
          <button onClick = {this.handleClick}>Search</button>

      
        {this.state.restaurants !== null && mapResults(this.state.restaurants)}
      </div>
    );
  }
}