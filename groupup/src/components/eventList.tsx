import { Grid, Typography } from '@mui/material'
import IEvent from '../models/event'
import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'

const EventList = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null)
  async function fetchEvents() {
    const response = await fetch('http//localhost:8080/api/events')
    setEvents(await response.json())
  }
  useEffect(() => {
    fetchEvents()
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
