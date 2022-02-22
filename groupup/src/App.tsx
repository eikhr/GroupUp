import Typography from '@mui/material/Typography'
import React from 'react'
import './App.css'
import EventList from './components/eventList'
import Form from './components/createEvent'

const App = () => {
  return (
    <div className="App">
      <Typography variant="h3">Create GroupUp App</Typography>
      <EventList />
      <Form />
    </div>
  )
}

export default App
