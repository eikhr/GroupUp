import React, { useContext } from 'react'
import { Card, Typography } from '@mui/material'
import MatchRequests from './matchRequests'
import CurrentGroupContext from '../../context/CurrentGroupContext'

const MatchList = () => {
  const { currentGroup } = useContext(CurrentGroupContext)

  if (!currentGroup) {
    return (
      <Typography data-testid="loading-text">
        Du er nødt til å velge en gruppe...
      </Typography>
    )
  }

  return (
    <Card sx={{ m: 1.5 }}>
      <MatchRequests group={currentGroup} />
    </Card>
  )
}

export default MatchList
