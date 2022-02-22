import { Card, CardContent, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import IEvent from '../../models/event'

interface IProps {
  data: IEvent
}
const EventCard = (props: IProps) => {
  return (
    <Card data-testid={'event-' + props.data.id} sx={{ width: 345 }}>
      <CardContent>
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {props.data.title}
        </Typography>
        <Typography data-testid="description" variant="body2" color="text.secondary">
          {props.data.description}
        </Typography>
        {props.data.time && (
          <Typography data-testid="time" variant="body2" color="text.secondary">
            {moment(props.data.time).format('LLLL')}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default EventCard
