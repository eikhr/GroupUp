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

    fun removeEvent(id: Long): Boolean

    /**
     * Adds the group with the given id to the given event
     * @param id: id of group
     * @param event: Event to add group to
     * @return The updated event
     */
    fun addGroupById(event: Event, id: Long): Event?

    /**
     * Removes the group with the given id to the given event
     * @param id: id of group
     * @param event: Event to add group to
     * @return The updated event
     */
    fun removeGroupById(event: Event, id: Long): Event?
}
