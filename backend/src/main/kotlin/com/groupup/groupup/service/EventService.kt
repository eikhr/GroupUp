package com.groupup.groupup.service

import com.groupup.groupup.model.Event
import com.groupup.groupup.model.Group
import com.groupup.groupup.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Service
class EventService(
    private val eventRepository: EventRepository,
) : IEventService {

    @Autowired
    @Lazy
    private lateinit var groupService: GroupService

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
        val event = getEvent(id)
        for (group in event.groupsMatched) {
            removeGroupById(event, group.id)
        }
        eventRepository.deleteById(id)
        return true
    }

    /* Updates event. Inspired from:
    https://github.com/cijosunny/kotlin-boot-repo/
    blob/master/src/main/kotlin/com/app/kotlin/user/service/UserServiceImpl.kt */
    override fun updateEvent(event: Event, id: Long): Event {
        event.id = id
        eventRepository.saveAndFlush(event)
        return event
    }

    override fun addGroupById(event: Event, id: Long): Event? {
        val group: Group = groupService.getGroup(id)
        event.groupsMatched.add(group)
        group.events.add(event)
        groupService.updateGroup(id, group)
        return event.id?.let { updateEvent(event, it) }
    }

    override fun removeGroupById(event: Event, id: Long): Event? {
        val group: Group = groupService.getGroup(id)
        event.groupsMatched.remove(group)
        group.events.remove(event)
        groupService.updateGroup(id, group)
        return event.id?.let { updateEvent(event, it) }
    }

    override fun requestMatch(event: Event, groupId: Long, isSuperlike: Boolean): Event? {
        val group: Group = groupService.getGroup(groupId)
        if (!event.groupsMatched.contains(group) &&
            !event.pendingGroupsRequests.contains(group) &&
            !event.superlikeGroupsRequests.contains(group)
        ) {
            if (isSuperlike) {
                if (group.gold) {
                    event.superlikeGroupsRequests.add(group)
                    group.superlikeMatchRequests.add(event)
                } else
                    throw IllegalStateException("Buy gold plz")
            } else {
                event.pendingGroupsRequests.add(group)
                group.pendingMatchRequests.add(event)
            }
            groupService.updateGroup(groupId, group)
            return event.id?.let { updateEvent(event, it) }
        }
        throw IllegalStateException("Match or superlike already requested")
    }

    override fun acceptMatch(event: Event, groupId: Long): Event? {
        val group: Group = groupService.getGroup(groupId)
        if (!event.groupsMatched.contains(group)) {
            if (!event.pendingGroupsRequests.contains(group) &&
                !event.superlikeGroupsRequests.contains(group)
            ) {
                throw IllegalStateException("Group has not requested a match")
            } else {
                if (event.pendingGroupsRequests.contains(group)) {
                    event.pendingGroupsRequests.remove(group)
                    group.pendingMatchRequests.remove(event)
                } else {
                    event.superlikeGroupsRequests.remove(group)
                    group.superlikeMatchRequests.remove(event)
                }
                event.groupsMatched.add(group)
                group.events.add(event)
            }
        } else {
            throw IllegalStateException("Group is already matched")
        }
        return event.id?.let { updateEvent(event, it) }
    }
    override fun declineMatch(event: Event, groupId: Long): Event? {
        val group: Group = groupService.getGroup(groupId)
        if (!event.groupsMatched.contains(group)) {
            if (!event.pendingGroupsRequests.contains(group) &&
                !event.superlikeGroupsRequests.contains(group)
            ) {
                throw IllegalStateException("Group has not requested a match")
            } else {
                if (event.pendingGroupsRequests.contains(group)) {
                    event.pendingGroupsRequests.remove(group)
                    group.pendingMatchRequests.remove(event)
                } else {
                    event.superlikeGroupsRequests.remove(group)
                    group.superlikeMatchRequests.remove(event)
                }
            }
        } else {
            throw IllegalStateException("Group is already matched")
        }
        return event.id?.let { updateEvent(event, it) }
    }
}
