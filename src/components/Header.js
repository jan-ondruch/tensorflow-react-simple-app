import React from 'react'
import { Box, Typography, Divider } from '@material-ui/core'

const Header = ({ name }) => {

	return (
		<React.Fragment>
			<Box
				p={{ xs: 4, sm: 6, md: 7 }}
				textAlign="center"
			>
				<Typography
					variant="h1"
					color="primary"
				>
					{name}
				</Typography>
			</Box>
			<Divider />
		</React.Fragment>
	)
}

export default Header