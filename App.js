
import React, { Component, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation"




GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const App = () => {


  return (
      <Navigation />
  )
}

export default App

