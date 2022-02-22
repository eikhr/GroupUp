import Typography from '@mui/material/Typography'
import React from 'react'
import './App.css'
import EventList from './components/eventList'

const App = () => {
  return (
    <div className="App">
      <Typography variant="h3">Create GroupUp App</Typography>
      <EventList />
    </div>
  )
}

export default App
