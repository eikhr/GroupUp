import { Grid, Typography } from '@mui/material'
import IEvent from '../models/event'
import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'
import API from "../API";

const EventList = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null)

  useEffect(() => {
    API.getAllEvents().then((events) => setEvents(events))
  }, [])

  return (
    <Grid container spacing={2} justifyContent="center">
      {events ? (
        events.map((event) => (
          <Grid item key={event.id}>
            <EventCard data={event} />
          </Grid>
        ))
      ) : (
        <Typography data-testid="loadingtext">Loading...</Typography>
      )}
    </Grid>
  )
}

export default EventList
