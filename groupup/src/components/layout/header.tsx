import React, { useContext } from 'react'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import Logo from './logo'
import CurrentGroupContext from '../../context/CurrentGroupContext'

const Header = () => {
  const { currentGroup } = useContext(CurrentGroupContext)

  return (
    <>
      <AppBar sx={{ height: 64, alignItems: 'flex-start' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button
              variant="outlined"
              href="/"
              sx={{ height: 1, width: 'auto', color: 'primary.contrastText' }}
            >
              <Logo sx={{ height: 1, textTransform: 'none' }} />
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button sx={{ color: 'primary.contrastText' }}>
              {currentGroup ? currentGroup.name : 'No group :('}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
