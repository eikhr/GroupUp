import { Box, Paper, Stack, Tab, Tabs } from '@mui/material'
import React, { PropsWithChildren, SyntheticEvent, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CurrentGroupContext from '../../context/CurrentGroupContext'

const LoggedInPage = (props: PropsWithChildren<Record<never, never>>) => {
  const { currentGroup } = useContext(CurrentGroupContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentGroup) {
      navigate('/')
    }
  }, [currentGroup])

  const onTabChange = (evt: SyntheticEvent, newPath: string) => {
    navigate(newPath)
  }

  return (
    <Stack direction="row" sx={{ height: 1 }}>
      <Paper square>
        <Tabs value={location.pathname} onChange={onTabChange} orientation="vertical">
          <Tab label="Aktiviteter" value="/events" />
          <Tab label="Opprett aktivitet" value="/addEvent" />
          <Tab label="Alle grupper" value="/allGroups" />
          <Tab label="Min gruppe" value="/myGroup" />
        </Tabs>
      </Paper>
      <Box sx={{ width: 1, maxWidth: 1100, margin: '20px auto' }}>{props.children}</Box>
    </Stack>
  )
}

export default LoggedInPage
