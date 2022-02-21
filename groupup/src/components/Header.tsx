import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './Logo'

const Header = () => {
  const height = 60

  return (
    <>
      <AppBar sx={{ height: height }}>
        <Logo sx={{ height: 1, ml: 2 }} />
      </AppBar>
      <Toolbar sx={{ height: height }} />
    </>
  )
}

export default Header
