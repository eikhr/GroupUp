import React from 'react'
import './App.css'
import EventList from './components/event/eventList'
import { Routes, Route } from 'react-router-dom'
import CoverPage from './components/coverPage'
import Header from './components/header'
import LoggedInPage from './components/loggedInPage'
import { Box, Stack } from '@mui/material'
import CreateEvent from './components/event/createEvent'

const App = () => {
  return (
    <Stack className="App" sx={{ height: 1 }} justifyContent="stretch">
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<CoverPage />} />
          <Route
            path="/events"
            element={
              <LoggedInPage>
                <EventList />
              </LoggedInPage>
            }
          />
          <Route
            path="/addEvent"
            element={
              <LoggedInPage>
                <CreateEvent />
              </LoggedInPage>
            }
          />
        </Routes>
      </Box>
    </Stack>
  )
}

export default App
