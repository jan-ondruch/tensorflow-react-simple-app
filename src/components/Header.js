import React from 'react'
import { Box, Typography, Link, Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    padding: '48px 32px'
  },

}))

const Header = ({ name }) => {

    const classes = useStyles()

    return (
      <React.Fragment>
        <Box className={classes.header}>
            <Typography variant="h1" color="primary">
              {name}
            </Typography>
        </Box>
        <Divider />
      </React.Fragment>
    )
}

export default Header