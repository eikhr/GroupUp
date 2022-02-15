package com.groupup.groupup.service

import com.groupup.groupup.model.Event

interface IEventService {
    /**
     * Returns a list of all events
     */
    fun getEvents(): List<Event>

    /**
     * Returns the event with the given id
     */
    fun getEvent(id: Long): Event

    /**
     * Creates an event
     * @return The new event
     */
    fun createEvent(event: Event): Event

    /**
     * Overwrites the event at given id
     * @param id: ID of event to overwrite
     * @param event: New event
     * @return The new event
     */
    fun updateEvent(event: Event, id: Long): Event
}
