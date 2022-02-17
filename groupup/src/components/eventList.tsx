import { Grid } from '@mui/material'
import IEvent from '../models/event'
import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'

const EventList = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null)
  async function fetchEvents() {
    const response = await fetch('/')
    setEvents(await response.json())
  }
  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <Grid container spacing={2} justifyContent="center">
      {events?.map((event) => (
        <Grid item key={event.id}>
          <EventCard data={event} />
        </Grid>
      ))}
    </Grid>
  )
}

export default EventList
