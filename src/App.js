import React from 'react'

import LinearRegression from './components/LinearRegression'
import MobileNet from './components/MobileNet'
import './App.css'


function App() {
  return (
    <div className="App">
      <Header />
      <LinearRegression/>
      <hr></hr>
      <MobileNet />
    </div>
  )
}

export default App


const Header = () => (
  <div className="Header">
    <h1>
        TensorFlow React JS App
      </h1>
      <p>
        This project was based on <a href="https://www.dlighthouse.co/2020/02/creating-tensorflowjs-reactjs-js-app.html">this tutorial</a>
      </p>
      <p>
        My personal contribution was an addition of some neat functionality as well as of my own styles.
      </p>
  </div>
)