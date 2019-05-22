import React from 'react';
import logo from './logo.svg';
import Places from './Places.js'
import './App.css';
import styled from "styled-components";


function App() {
  const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: tomato;
  background: papayawhip;
  `;

  return (
    <div className="App">
      <Title>
        <Places />
      </Title>
    </div>
  );
}

export default App;
