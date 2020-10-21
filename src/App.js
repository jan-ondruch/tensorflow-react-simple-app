import React from 'react'

import LinearRegression from './components/LinearRegression'
import MobileNet from './components/MobileNet'
import Navbar from './components/Navbar'
import About from './components/About'

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)  // generate reponsive typography

const App = () => (
  <ThemeProvider theme={theme}>
    <Grid className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/linear-regression">
            <LinearRegression />
          </Route>
          <Route path="/">
            <MobileNet>
              <p>Children of the net!</p>
            </MobileNet>
          </Route>
        </Switch>
      </Router>
    </Grid>
  </ThemeProvider>
)

export default App