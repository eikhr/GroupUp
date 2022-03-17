import React, { useContext } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import Logo from './logo'
import CurrentGroupContext from '../../context/CurrentGroupContext'

const Header = () => {
  const { currentGroup, setCurrentGroup } = useContext(CurrentGroupContext)

  return (
    <>
      <AppBar
        sx={{
          height: 64,
          alignItems: 'flex-start',
          background: currentGroup?.gold ? '#DAA520' : undefined,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button
              variant="text"
              href="/"
              sx={{ height: 1, width: 'auto', color: 'primary.contrastText' }}
            >
              <Logo sx={{ height: 1, textTransform: 'none' }} gold={currentGroup?.gold} />
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
                  Logg ut
                </Button>
              </>
            ) : (
              <Button
                component="a"
                href="/chooseGroup"
                color="inherit"
                variant="outlined"
              >
                Din gruppe
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
