import { Box, Paper, Stack, Tab, Tabs } from '@mui/material'
import React, { PropsWithChildren, SyntheticEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LoggedInPage = (props: PropsWithChildren<Record<never, never>>) => {
  const location = useLocation()
  const navigate = useNavigate()

  const onTabChange = (evt: SyntheticEvent, newPath: string) => {
    navigate(newPath)
  }

  return (
    <Stack direction="row" sx={{ height: 1 }}>
      <Paper square>
        <Tabs value={location.pathname} onChange={onTabChange} orientation="vertical">
          <Tab label="Events" value="/events" />
          <Tab label="Add event" value="/addEvent" />
        </Tabs>
      </Paper>
      <Box sx={{ width: 1, maxWidth: 1100, margin: '20px auto' }}>{props.children}</Box>
    </Stack>
  )
}

export default LoggedInPage
