import React, { useState } from 'react'
import './App.css'
import EventList from './components/event/eventList'
import { Routes, Route } from 'react-router-dom'
import CoverPage from './components/coverPage/coverPage'
import Header from './components/layout/header'
import LoggedInPage from './components/layout/loggedInPage'
import { Box, Stack } from '@mui/material'
import CreateEvent from './components/event/createEvent'
import CreateGroup from './components/groups/createGroup'
import GroupList from './components/groups/groupList'
import Group from './models/group'
import CurrentGroupContext from './context/CurrentGroupContext'
import ChooseGroup from './components/groups/chooseGroup'
import GroupDetails from './components/groups/groupDetails'

const App = () => {
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const context = { currentGroup, setCurrentGroup }

  return (
    <CurrentGroupContext.Provider value={context}>
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
            <Route path="/createGroup" element={<CreateGroup />} />
            <Route
              path="/allGroups"
              element={
                <LoggedInPage>
                  <GroupList />
                </LoggedInPage>
              }
            />
            <Route path="/chooseGroup" element={<ChooseGroup />} />
            <Route
              path="/myGroup"
              element={
                <LoggedInPage>
                  <GroupDetails />
                </LoggedInPage>
              }
            />
          </Routes>
        </Box>
      </Stack>
    </CurrentGroupContext.Provider>
  )
}

export default App
