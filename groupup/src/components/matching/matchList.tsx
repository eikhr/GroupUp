import React, { useContext } from 'react'
import { Typography, Stack } from '@mui/material'
import MatchRequests from './matchRequests'
import LoginContext from '../../context/loginContext'

const MatchList = () => {
  const { currentGroup } = useContext(LoginContext)

  if (!currentGroup) {
    return (
      <Typography data-testid="loading-text">
        Du er nødt til å velge en gruppe...
      </Typography>
    )
  }

  return (
    <Stack sx={{ m: 1.5 }}>
      <MatchRequests group={currentGroup} />
    </Stack>
  )
}

export default MatchList
