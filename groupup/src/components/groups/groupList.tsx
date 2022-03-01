import { Card, Grid, Typography } from '@mui/material'
import Group from '../../models/group'
import React, { useEffect, useState } from 'react'
import GroupCard from './groupCard'
import API, { APIError } from '../../API'

const GroupList = () => {
  const [groups, setGroups] = useState<Group[] | null>(null)
  const [error, setError] = useState<APIError | null>(null)

  useEffect(() => {
    API.getAllGroups()
      .then((groups) => setGroups(groups))
      .catch((error: APIError) => setError(error));
  }, [])

  if (error) {
    return (
      <Card data-testid="error" sx={{ backgroundColor: 'error.light' }}>
        <Typography variant="h5">Error</Typography>
      </Card>
    )
  }

  if (!groups) {
    return <Typography data-testid="loading-text">Loading...</Typography>
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {groups.map((group: Group) => (
        <Grid item key={group.id}>
          <GroupCard data={group} />
        </Grid>
      ))}
    </Grid>
  )
}

export default GroupList