import IEvent from '../../models/event'
import { CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import CenteredModalCard from "../layout/centeredModal";

interface IProps {
  event: IEvent
}

const EventDetails = ({ event }: IProps) => {
  const arrangingGroup = event.groups && event.groups[0]

  return (
    <CenteredModalCard>
      <CardMedia component="img" height="140" src={event.image} alt="green iguana" />
      <CardContent>
        {event.date && (
          <Typography
            data-testid="time"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {moment(event.date).calendar({ sameElse: 'dddd Do MMMM [kl.] HH:mm' })}
          </Typography>
        )}
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography data-testid="description" variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {arrangingGroup?.interests?.map((interest) => (
            <Chip key={interest} label={interest} />
          ))}
        </Stack>
      </CardContent>
    </CenteredModalCard>
  )
}

export default EventDetails
