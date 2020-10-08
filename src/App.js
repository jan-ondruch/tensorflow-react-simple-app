import React from 'react'

import LinearRegression from './components/LinearRegression'
import MobileNet from './components/MobileNet'
import Navbar from './components/Navbar'
import About from './components/About'

import { Box } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


const App = () => (
  <Box className="App">
      <Router>
        <Navbar />
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/linear-regression">
              <LinearRegression/>
            </Route>
            <Route path="/">
              <MobileNet>
                <p>Children of the net!</p>
              </MobileNet>
            </Route>
        </Switch>
      </Router>
  </Box>
)

export default App