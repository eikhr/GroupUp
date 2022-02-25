package com.groupup.groupup.service

import com.groupup.groupup.model.Event
import com.groupup.groupup.repository.EventRepository
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

    override fun removeEvent(id: Long): Boolean {
        eventRepository.deleteById(id)
        return true
    }

    /* Updates group. Inspired from:
    https://github.com/cijosunny/kotlin-boot-repo/
    blob/master/src/main/kotlin/com/app/kotlin/user/service/UserServiceImpl.kt */
    fun updateEvent(id: Long, event: Event): Event {
        event.id = id
        eventRepository.saveAndFlush(event)
        return event
    }
}
