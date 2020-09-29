import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { AppBar, Toolbar, Typography, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,

    },
    logo: {
        color: '#fff',
        fontWeight: '900',
        backgroundColor: '#131313',
        padding: '6px 12px',
        textDecoration: 'none',
        '&:hover': {
            color: '#00FE00'
        }
    },
    navRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100vw',
    },
    item: {
        padding: '16px 32px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        letterSpacing: '1px',
        '&:hover': {
            color: '#00FE00'
        }
    },
}))

const Navbar = () => {
    const classes = useStyles()
    const desktopNavbar = useMediaQuery('(min-width:600px)')

    return (
        desktopNavbar &&    // show only on desktop
        <div className={classes.root}>
            <AppBar color="primary" title="TensorFlow React JS App" position="static">
                <Toolbar>
                    <Typography variant="h6">
                        <Link to="/" className={classes.logo}>TR</Link>
                    </Typography>
                    <div className={classes.navRight}>
                        <Typography variant="h6" className={classes.item}>
                            <Link to="/" className={classes.link}>Object Recognition</Link>
                        </Typography>
                        <Typography variant="h6" className={classes.item}>
                            <Link to="/linear-regression" className={classes.link}>Linear Regression</Link>
                        </Typography>
                        <Typography variant="h6" className={classes.item}>
                            <Link to="/about" className={classes.link}>About</Link>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar