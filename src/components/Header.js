import React from 'react'
import { Box, Typography, Link } from '@material-ui/core'

const Header = () => (
    <Box className="Header">
        <Typography variant="h1" color="text.primary">
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
          My personal contribution was addition of all the neat functionality around and styles.
        </Typography>
    </Box>
)

export default Header