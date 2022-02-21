import React from 'react'
import './App.css'
import EventList from './components/event/eventList'
import { Routes, Route } from 'react-router-dom'
import CoverPage from './components/coverPage'
import Header from './components/Header'
import CreateEvent from "./components/event/createEvent";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/addEvent" element={<CreateEvent />} />
      </Routes>
    </div>
  )
}

export default App
