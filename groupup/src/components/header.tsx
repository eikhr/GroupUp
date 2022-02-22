import React from 'react'
import { AppBar, Button, Toolbar } from '@mui/material'
import Logo from './logo'

const Header = () => {
  return (
    <>
      <AppBar sx={{ height: 64, alignItems: 'flex-start' }}>
        <Button
          variant="outlined"
          href="/"
          sx={{ height: 1, width: 'auto', color: 'primary.contrastText' }}
        >
          <Logo sx={{ height: 1, textTransform: 'none' }} />
        </Button>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
