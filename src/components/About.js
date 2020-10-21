import React from 'react'
import Header from './Header'

import { Typography, Grid, Link } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    text: {
        paddingBottom: '24px'
    },
    tag: {
        color: theme.palette.primary.main
    }
}))

const About = () => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <Header name="About" />
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={12} sm={6} md={3} >
                    <Typography variant="subtitle1" className={classes.text}>
                        This project was built using React.js, Tensorflow and Material-UI. It got me back
                        into front-end development <span className={classes.tag}>#comebackofthecentury</span>
                    </Typography>
                    <Typography variant="subtitle1" className={classes.text}>
                        Because I was playing around with React mostly in 2017, I was pleasantly surprised
                        by the existence of Hooks <span className={classes.tag}>#ahoy!</span>
                    </Typography>
                    <Typography variant="subtitle1">
                        I know, this app is super awesome. However, claiming that it was all me would be a lie.
                        Part of the linear regression functionality was based on
                            <Link
                            href="https://www.dlighthouse.co/2020/02/creating-tensorflowjs-reactjs-js-app.html"
                            color="secondary"> this tutorial.
                            </Link>
                        &nbsp;But yeah, everything else <span className={classes.tag}>#byme</span>
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default About