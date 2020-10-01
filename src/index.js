import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { CssBaseline } from '@material-ui/core'  // similar to normalize.css

// React.StrictMode is a tool for highlighting potential problems in an application.
// Like Fragment, StrictMode does not render any visible UI. It activates 
// additional checks and warnings for its descendants.

ReactDOM.render(
  // <React.StrictMode>
    <CssBaseline>
      <App />
    </CssBaseline>,
  // </React.StrictMode>
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
