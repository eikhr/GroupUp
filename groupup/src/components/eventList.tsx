import { Grid } from '@mui/material'
import IEvent from '../models/event'
import React from 'react'
import EventCard from './eventCard'

interface IProps {
  events: IEvent[]
}

const EventList = (props: IProps) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {props.events.map((event) => (
        <Grid item key={event.id}>
          <EventCard data={event} />
        </Grid>
      ))}
    </Grid>
  )
}

export default EventList
