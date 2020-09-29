import React from 'react'
import { Box, Typography, Link } from '@material-ui/core'

const Header = () => (
    <Box className="Header">
        <Typography variant="h1">
          TensorFlow React JS App
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          This project was based on 
            <Link 
              href="https://www.dlighthouse.co/2020/02/creating-tensorflowjs-reactjs-js-app.html"
              color="primary"> this tutorial
            </Link>
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          My personal contribution was an addition of some neat functionality as well as of my own styles.
        </Typography>
    </Box>
)

export default Header