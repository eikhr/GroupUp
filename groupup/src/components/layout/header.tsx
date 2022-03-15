import React, { useContext } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import Logo from './logo'
import CurrentGroupContext from '../../context/CurrentGroupContext'

const Header = () => {
  const { currentGroup, setCurrentGroup } = useContext(CurrentGroupContext)

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
            {currentGroup ? (
              <>
                <Typography
                  fontSize="large"
                  sx={{ color: 'primary.contrastText', mr: 1 }}
                >
                  {currentGroup.name}
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => setCurrentGroup(null)}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component="a"
                href="/chooseGroup"
                color="inherit"
                variant="outlined"
              >
                Choose group
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
