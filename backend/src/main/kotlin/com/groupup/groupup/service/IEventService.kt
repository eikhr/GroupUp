package com.groupup.groupup.service

import com.groupup.groupup.model.Event

interface IEventService {
    /**
     * @return list of all events
     */
    fun getEvents(): List<Event>

    /**
     * Returns the event with the given id
     * @param id: id of group to get
     * @return event object
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

    /**
     * removes an event
     * @param id: event to remove
     * @return true if successfully deleted
     */
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

    /**
     * Requests a match from a group to an event
     * @param event: Event to add group to
     * @param groupId: id of group
     * @param isSuperlike: boolean to indicate if it's a superlike
     * @return The updated event
     */
    fun requestMatch(event: Event, groupId: Long, isSuperlike: Boolean): Event?

    /**
     * Requests a match from a group to an event
     * @param event: Event to that the group is accepted to
     * @param groupId: id of group
     * @return The updated event
     */
    fun acceptMatch(event: Event, groupId: Long): Event?
    fun declineMatch(event: Event, groupId: Long): Event?
}
