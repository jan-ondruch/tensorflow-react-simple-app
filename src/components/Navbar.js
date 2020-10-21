import React, { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { AppBar, Toolbar, Typography, IconButton, 
    Menu, MenuItem, ListItemIcon, ListItemText, } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"

import ImageIcon from '@material-ui/icons/Image'
import FunctionsIcon from '@material-ui/icons/Functions'
import InfoIcon from '@material-ui/icons/Info'

// makeStyles is a hook generator.
// Enables us to override styles.
// This is particularly useful when styling nested elements in a component.
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
        '&:hover': {
            color: '#00FE00'
        }
    },
    menuButton: {
        position: 'absolute',
        right: '12px'
    },
    mobileItemLink: {
        textDecoration: 'none'
    }
}))

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
))

// withStyles, the wrapped component accepts a classes prop,
// it simply merges the class names provided with the style sheet.
const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {  // onFocus selector
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white
        },
      },
    },
}))(MenuItem)


// Use functional components over class components whenever possible.
// They are simpler to read, shorter, easier to test...
const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const classes = useStyles() // using the Hook API
    const desktopNavbar = useMediaQuery('(min-width:668px)')

    // event handlers
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
        setIsOpen(true)
    }
    const handleClose = () => {
        setAnchorEl(null)
        setIsOpen(false)
    }

    return (
        desktopNavbar ?
            // desktop appbar
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
            :
            // mobile appbar
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            <Link to="/" className={classes.logo}>TR</Link>
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                            <MenuIcon />
                        </IconButton>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={isOpen}
                            onClose={handleClose}
                        >
                            <Link to="/" onClick={handleClose} className={classes.mobileItemLink}>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <ImageIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Object Recognition" />
                                </StyledMenuItem>
                            </Link>
                            <Link to="/linear-regression" onClick={handleClose} className={classes.mobileItemLink}>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <FunctionsIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Linear Regression" />
                                </StyledMenuItem>
                            </Link>
                            <Link to="/about" onClick={handleClose} className={classes.mobileItemLink}>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <InfoIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="About" />
                                </StyledMenuItem>
                            </Link>
                        </StyledMenu>
                    </Toolbar>
                </AppBar>
            </div>
    )
}

export default Navbar