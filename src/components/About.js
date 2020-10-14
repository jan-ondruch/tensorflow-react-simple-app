import React from 'react'
import Header from './Header'

import { Typography, Box, Link } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    text: {
        paddingBottom: '24px'
    },
}))

const About = () => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <Header name="About" />
            <Box align="center" px={{ xs: 4, sm: 12, md: 16, lg: 64, xl: 86 }} pt={{ xs: 4, lg: 8, xl: 12 }}>
                <Typography variant="subtitle1" className={classes.text}>
                    This project was built using React.js, Tensorflow and Material-UI. It got me back
                    into front-end development #comebackofthecentury
                </Typography>
                <Typography variant="subtitle1" className={classes.text}>
                    Because I was playing around with React mostly in 2017, I was pleasantly surprised
                    by the existence of Hooks #ahoy!
                </Typography>
                <Typography variant="subtitle1">
                    I know, this app is super awesome. However, claiming that it was all me would be a lie. 
                    Part of the linear regression functionality was based on
                        <Link
                        href="https://www.dlighthouse.co/2020/02/creating-tensorflowjs-reactjs-js-app.html"
                        color="primary"> this tutorial. 
                        </Link>
                    &nbsp;But yeah, everything else #byme
                </Typography>
            </Box>
        </React.Fragment>
    )
}

export default About