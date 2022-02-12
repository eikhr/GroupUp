package com.groupUp.groupUp.service

import com.groupUp.groupUp.model.Event
import com.groupUp.groupUp.repository.EventRepository
import org.springframework.stereotype.Service

@Service
class EventService(private val eventRepository: EventRepository) : IEventService {

    override fun createEvent(event: Event): Event {
        return eventRepository.save(event)
    }

    override fun updateEvent(event: Event, id: Long): Event {
        TODO("Not yet implemented")
    }

    override fun getEvents(): List<Event> {
        return eventRepository.findAll()
    }

    override fun getEvent(id: Long): Event {
        return eventRepository.findById(id).get()
    }
}
