package com.groupup.groupup.service

import com.groupup.groupup.model.Event
import com.groupup.groupup.model.Group
import com.groupup.groupup.repository.EventRepository
import org.springframework.stereotype.Service

@Service
class EventService(
    private val eventRepository: EventRepository,
    private val groupService: GroupService
) : IEventService {

    override fun createEvent(event: Event): Event {
        return eventRepository.save(event)
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
    override fun updateEvent(event: Event, id: Long): Event {
        event.id = id
        eventRepository.saveAndFlush(event)
        return event
    }

    override fun addGroupById(event: Event, id: Long): Event? {
        val group: Group = groupService.getGroup(id)
        event.groups.add(group)
        group.events.add(event)
        groupService.updateGroup(id, group)
        return event.id?.let { updateEvent(event, it) }
    }

    override fun removeGroupById(event: Event, id: Long): Event? {
        val group: Group = groupService.getGroup(id)
        event.groups.remove(group)
        group.events.remove(event)
        groupService.updateGroup(id, group)
        return event.id?.let { updateEvent(event, it) }
    }
}
