package com.groupup.groupup.controller

import com.groupup.groupup.model.Event
import com.groupup.groupup.service.EventService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@RequestMapping("/api/events")
class EventController(private val eventService: EventService) {

    @GetMapping()
    fun getAllEvents(): List<Event> {
        return eventService.getEvents()
    }

    @GetMapping("/{id}")
    fun getEvent(@PathVariable id: Long): Event {
        return eventService.getEvent(id)
    }

    @PostMapping("/add")
    fun createEvent(@RequestBody event: Event): Long? {
        return eventService.createEvent(event).id
    }

    @DeleteMapping("/{id}")
    fun deleteEvent(@PathVariable id: Long): Boolean {
        return eventService.removeEvent(id)
    }

    @PutMapping("/{id}")
    fun updateGroup(@PathVariable id: Long, @RequestBody event: Event): Event? {
        return eventService.updateEvent(event, id)
    }

    @PostMapping("/{eventId}/addgroup/{groupId}")
    fun addGroupById(@PathVariable eventId: Long, @PathVariable groupId: Long): Event? {
        return eventService.addGroupById(eventService.getEvent(eventId), groupId)
    }

    @DeleteMapping("/{eventId}/removegroup/{groupId}")
    fun removeGroupById(@PathVariable eventId: Long, @PathVariable groupId: Long): Event? {
        return eventService.removeGroupById(eventService.getEvent(eventId), groupId)
    }
}
