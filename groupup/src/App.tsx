import Typography from '@mui/material/Typography'
import React from 'react'
import './App.css'
import EventList from './components/event/eventList'
import CreateEventForm from './components/event/createEvent'
import CreateGroupForm from './components/groups/createGroup'

const App = () => {
  return (
    <div className="App">
      <Typography variant="h3">Create GroupUp App</Typography>
      <EventList />
      <CreateEventForm />
      <CreateGroupForm />
    </div>
  )
}

export default App
