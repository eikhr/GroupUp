import React from 'react'
import { AppBar, Button, Link, Toolbar } from '@mui/material'
import Logo from './logo'

const Header = () => {
  const height = 60

  return (
    <>
      <AppBar sx={{ height: height, alignItems: 'flex-start' }}>
        <Button
          variant="outlined"
          href="/"
          sx={{ height: 1, width: 'auto', color: 'primary.contrastText' }}
        >
          <Logo sx={{ height: 1, textTransform: 'none' }} />
        </Button>
      </AppBar>
      <Toolbar sx={{ height: height }} />
    </>
  )
}

export default Header
