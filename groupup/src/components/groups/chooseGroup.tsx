import { Button, Card, Stack, Typography } from '@mui/material'
import Group from '../../models/group'
import React, { useContext, useEffect, useState } from 'react'
import API, { APIError } from '../../API'
import CurrentGroupContext from '../../context/CurrentGroupContext'
import { useNavigate } from 'react-router-dom'

const ChooseGroup = () => {
  const navigate = useNavigate()
  const [groups, setGroups] = useState<Group[] | null>(null)
  const [error, setError] = useState<APIError | null>(null)
  const { setCurrentGroup } = useContext(CurrentGroupContext)

  const selectGroup = (group: Group) => {
    setCurrentGroup(group)
    navigate('/events')
  }

  useEffect(() => {
    API.getAllGroups()
      .then((groups) => setGroups(groups))
      .catch((error: APIError) => setError(error))
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
    <>
      <Typography variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
        Velg gruppe
      </Typography>
      <Stack spacing={2} alignItems="center">
        {groups.map((group: Group) => (
          <Button
            variant="contained"
            key={group.id}
            sx={{ fontSize: 20 }}
            onClick={() => selectGroup(group)}
          >
            {group.name}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default ChooseGroup
