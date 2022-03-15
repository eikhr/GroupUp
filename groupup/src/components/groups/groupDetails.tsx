import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import React, { useContext } from 'react'
import EventIcon from '@mui/icons-material/Event'
import InterestsIcon from '@mui/icons-material/Interests'
import CurrentGroupContext from '../../context/CurrentGroupContext'

const GroupDetails = () => {
  const { currentGroup } = useContext(CurrentGroupContext)

  if (!currentGroup) {
    return (
      <Typography data-testid="loading-text">Choose your current group...</Typography>
    )
  }

  return (
    <Stack spacing={1}>
      <Button
        sx={{ background: !currentGroup?.gold ? '#DAA520' : undefined }}
        size="large"
        variant="contained"
      >
        Get GroupUp GOLD!
      </Button>
      <Card>
        <CardMedia
          component="img"
          height="200"
          src={'/groupMy.jpg'}
          alt="Portrait of ASTP crews - restoration.jpg"
        />
        <CardContent>
          <Typography data-testid="title" gutterBottom variant="h5" component="div">
            {currentGroup.name}
          </Typography>
          <Typography
            data-testid="description"
            gutterBottom
            variant="body2"
            color="text.secondary"
          >
            {currentGroup.description}
          </Typography>

          <Typography
            data-testid="groupsEmail"
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            {currentGroup.contactEmail}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {currentGroup.interests?.map((interest) => (
              <Chip icon={<InterestsIcon />} key={interest} label={interest} />
            ))}
          </Stack>
          <Stack data-testid="description" spacing={1} direction={'row'} sx={{ mt: 2 }}>
            <Typography variant="body2" color="text">
              Aktiviteter:{' '}
            </Typography>
            {currentGroup.events?.map((event) => (
              <Chip icon={<EventIcon />} key={event.title} label={event.title} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default GroupDetails
