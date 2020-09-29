import React from 'react'

import LinearRegression from './components/LinearRegression'
import MobileNet from './components/MobileNet'
import Header from './components/Header'
import Navbar from './components/Navbar'
import About from './components/About'

import { Divider, Box } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import './App.css'


const App = () => (
  <Box className="App">
      <Router>
        <Navbar />
        <Header />
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/linear-regression">
              <LinearRegression/>
            </Route>
            <Route path="/">
              <MobileNet />
            </Route>
        </Switch>
      </Router>
  </Box>
)

export default App