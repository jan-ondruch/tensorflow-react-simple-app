import React from 'react'
import { AppBar, Toolbar, Typography, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    items: {
        display: 'flex',
    },
}));

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar color="primary" title="TensorFlow React JS App" position="static">
                <Toolbar>
                    <Typography variant="h6">
                    TR
                    </Typography>
                    <div className={classes.items}>
                        <MenuItem>
                            <Typography variant="h6">
                                <Link to="/">Object Recognition</Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography variant="h6">
                                <Link to="/linear-regression">Linear Regression</Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography variant="h6">
                                <Link to="/about">About</Link>
                            </Typography>
                        </MenuItem>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar