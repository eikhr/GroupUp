import React, { useContext } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import Logo from './logo'
import LoginContext from '../../context/loginContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const { authSession, setAuthSession, currentGroup, setCurrentGroup } =
    useContext(LoginContext)

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
            <Link to="/">
              <Button
                variant="text"
                sx={{ height: 1, width: 'auto', color: 'primary.contrastText' }}
              >
                <Logo
                  sx={{ height: 1, textTransform: 'none' }}
                  gold={currentGroup?.gold}
                />
              </Button>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            {authSession && (
              <>
                <Typography
                  fontSize="large"
                  sx={{ color: 'primary.contrastText', mr: 1 }}
                >
                  {authSession.user.firstName} {currentGroup && currentGroup.name}
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    setAuthSession(null)
                    setCurrentGroup(null)
                  }}
                >
                  Logg ut
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
