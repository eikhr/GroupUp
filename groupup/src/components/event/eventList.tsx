import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material'
import IEvent from '../../models/event'
import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'
import API from '../../API'
import EventDetails from './eventDetails'
import InterestsIcon from '@mui/icons-material/Interests'
import { interestList } from '../groups/createGroup'
import ErrorCard from '../layout/errorCard'

const EventList = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [openEvent, setOpenEvent] = useState<IEvent | null>(null)
  const [interestsFilter, setInterestsFilter] = useState<string[]>([])

  useEffect(() => {
    API.getAllEvents()
      .then((events) => setEvents(events))
      .catch((error: string) => setError(error))
  }, [])

  if (error) {
    return <ErrorCard message={error} />
  }

  if (!events) {
    return <Typography data-testid="loading-text">Laster inn...</Typography>
  }

  const openNext = (reverse: boolean) => {
    const openIndex = events.findIndex((event) => event.id === openEvent?.id)

    setOpenEvent(events[(openIndex + events.length + (reverse ? -1 : 1)) % events.length])
  }

  const toggleFilter = (interest: string) => {
    if (interestsFilter.includes(interest))
      setInterestsFilter(interestsFilter.filter((element) => element != interest))
    else setInterestsFilter([...interestsFilter, interest])
  }

  function getEventsFilter(event: IEvent) {
    if (interestsFilter.length == 0) {
      return true
    }
    return !interestsFilter.some(
      (interest) => event.groupsMatched[0].interests.indexOf(interest) === -1
    )
  }

  return (
    <>
      <Modal open={!!openEvent} onClose={() => setOpenEvent(null)}>
        <>
          {openEvent && (
            <EventDetails
              event={openEvent}
              onNext={() => openNext(false)}
              onPrevious={() => openNext(true)}
            />
          )}
        </>
      </Modal>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} justifyContent="center">
          {interestList.map((interest) => (
            <Button
              key={interest}
              size="large"
              variant="contained"
              color={interestsFilter.includes(interest) ? 'primary' : 'warning'}
              onClick={() => toggleFilter(interest)}
            >
              <InterestsIcon /> {interest}
            </Button>
          ))}
        </Stack>
        <Grid container spacing={2} justifyContent="center">
          {events
            .filter((event) => getEventsFilter(event))
            .map((event) => (
              <Grid item key={event.id}>
                <Box onClick={() => setOpenEvent(event)} sx={{ cursor: 'pointer' }}>
                  <EventCard data={event} />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </>
  )
}

export default EventList
