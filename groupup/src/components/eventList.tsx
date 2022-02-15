import { Grid } from '@mui/material'
import IEvent from '../models/event'
import React from 'react'
import Event from './event'

interface IProps {
  events: IEvent[]
}

const EventList = (props: IProps) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {props.events.map((event) => (
        <Grid item key={event.id}>
          <Event data={event} />
        </Grid>
      ))}
    </Grid>
  )
}

export default EventList
