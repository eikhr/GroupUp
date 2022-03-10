import Group from '../../models/group'
import {Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import EventIcon from '@mui/icons-material/Event'
import API, {APIError} from "../../API";
import InterestsIcon from '@mui/icons-material/Interests';

interface IProps {
  group: Group
}

const GroupDetails = () => {
  const [groups, setGroups] = useState<Group[] | null>(null)
  const [error, setError] = useState<APIError | null>(null)

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
    <Card >
      <CardMedia component="img" height="200" src={'../../../public/groupPhotoExamples/group_example_party.jpeg'} alt="Event image" />
      <CardContent>
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {groups[4].name}
        </Typography>
        <Typography
          data-testid="description"
          gutterBottom
          variant="body2"
          color="text.secondary"
        >
          {groups[4].description}
        </Typography>

        <Typography data-testid="groupsEmail" variant="body2" color="text.secondary" gutterBottom>
          {groups[4].contactEmail}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }} >
          {groups[4].interests?.map((interest) => (
            <Chip icon={<InterestsIcon />} key={interest} label={interest} />
          ))}
        </Stack>
        <Typography data-testid="description" variant="body2" color="text" gutterBottom>
          Aktiviteter: <b>{groups[4].events?.map((event) => (
          <Chip icon={<EventIcon /> } key={event.title} label={event.title} />
        ))}</b>
          {console.log(groups[1])}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GroupDetails