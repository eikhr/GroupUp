import { Card, Grid, Typography } from '@mui/material'
import IEvent from '../../models/event'
import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'
import API, { APIError } from '../../API'

const EventList = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [error, setError] = useState<APIError | null>(null)

  useEffect(() => {
    API.getAllEvents()
      .then((events) => setEvents(events))
      .catch((error: APIError) => setError(error))
  }, [])

  if (error) {
    return (
      <Card data-testid="error" sx={{ backgroundColor: 'error.light' }}>
        <Typography variant="h5">Error</Typography>
      </Card>
    )
  }

  if (!events) {
    return <Typography data-testid="loading-text">Loading...</Typography>
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {events.map((event) => (
        <Grid item key={event.id}>
          <EventCard data={event} />
        </Grid>
      ))}
    </Grid>
  )
}

export default EventList
