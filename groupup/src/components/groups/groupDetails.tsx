import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Button,
} from '@mui/material'
import React, { useContext } from 'react'
import EventIcon from '@mui/icons-material/Event'
import InterestsIcon from '@mui/icons-material/Interests'
import LoginContext from '../../context/loginContext'
import Group from '../../models/group'
interface IProps {
  group?: Group
}
const GroupDetails = ({ group }: IProps) => {
  const { currentGroup } = useContext(LoginContext)
  if (!group) {
    group = currentGroup ?? undefined
  }
  if (!group) {
    return (
      <Typography data-testid="loading-text">Choose your current group...</Typography>
    )
  }
  return (
    <Card sx={{ m: 1.5 }}>
      <CardMedia
        component="img"
        height="200"
        src={'/groupMy.jpg'}
        alt="Portrait of ASTP crews - restoration.jpg"
      />
      <CardContent>
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {group.name}
        </Typography>
        <Typography
          data-testid="description"
          gutterBottom
          variant="body2"
          color="text.secondary"
        >
          {group.description}
        </Typography>
        <Typography
          data-testid="groupsEmail"
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {group.contactEmail}
        </Typography>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {group.interests?.map((interest) => (
              <Chip icon={<InterestsIcon />} key={interest} label={interest} />
            ))}
          </Stack>
          <Stack data-testid="description" spacing={1} direction={'row'} sx={{ mt: 2 }}>
            <Typography variant="body2" color="text">
              Aktiviteter:{' '}
            </Typography>
            {group.events?.map((event) => (
              <Chip icon={<EventIcon />} key={event.title} label={event.title} />
            ))}
          </Stack>
          {location.pathname == '/matchReq' ? (
            <Stack direction="row" spacing={1}>
              <Button variant="contained" color="success">
                Godkjenn
              </Button>
              <Button variant="contained" color="error">
                Avslå
              </Button>
            </Stack>
          ) : undefined}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default GroupDetails
