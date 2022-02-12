package com.groupUp.groupUp.controller

import com.groupUp.groupUp.model.Event
import com.groupUp.groupUp.service.EventService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
    fun createEvent(@RequestBody event: Event): Long {
        return eventService.createEvent(event).id
    }
}
