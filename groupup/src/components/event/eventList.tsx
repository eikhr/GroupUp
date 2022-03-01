import { Box, Card, Grid, Modal, Typography } from '@mui/material'
import IEvent from '../../models/event'
import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'
import API, { APIError } from '../../API'
import EventDetails from './eventDetails'

const EventList = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [error, setError] = useState<APIError | null>(null)
  const [openEvent, setOpenEvent] = useState<IEvent | null>(null)

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
    <>
      <Modal open={!!openEvent} onClose={() => setOpenEvent(null)}>
        <>{openEvent && <EventDetails event={openEvent} />}</>
      </Modal>
      <Grid container spacing={2} justifyContent="center">
        {events.map((event) => (
          <Grid item key={event.id}>
            <Box onClick={() => setOpenEvent(event)} sx={{ cursor: 'pointer' }}>
              <EventCard data={event} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default EventList
