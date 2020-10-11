import React from 'react'
import Header from './Header'

import { Typography, Box, Link } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        textAlign: 'center',
    },
}))


const About = () => {
    
    const classes = useStyles()

    return (
        <React.Fragment>
            <Header name="About" />
            <Box className={classes.contentWrapper}>
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
        </React.Fragment>
    )
}

export default About