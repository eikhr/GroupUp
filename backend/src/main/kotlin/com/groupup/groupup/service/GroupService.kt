package com.groupup.groupup.service

import com.groupup.groupup.model.Group
import com.groupup.groupup.repository.GroupRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Service
class GroupService(
    private val groupRepository: GroupRepository,
) : IGroupService {

    @Autowired
    @Lazy
    private lateinit var eventService: EventService

    override fun createGroup(group: Group): Group {
        return groupRepository.save(group)
    }

    override fun getGroup(id: Long): Group {
        return groupRepository.findById(id).get()
    }

    override fun getGroups(): List<Group> {
        return groupRepository.findAll()
    }

    /* Updates group. Inspired from:
    https://github.com/cijosunny/
    kotlin-boot-repo/blob/master/src/main/kotlin/com/app/kotlin/user/service/UserServiceImpl.kt */
    override fun updateGroup(id: Long, group: Group): Group {
        group.id = id
        groupRepository.saveAndFlush(group)
        return group
    }

    override fun removeGroup(id: Long): Boolean {
        groupRepository.deleteById(id)
        return true
    }

    override fun getMinAge(id: Long): Int {
        return groupRepository.findById(id).get().minAge
    }

    override fun getMaxAge(id: Long): Int {
        return groupRepository.findById(id).get().maxAge
    }

    override fun addEventById(group: Group, id: Long): Group {
        eventService.addGroupById(eventService.getEvent(id), group.id)
        return group
    }

    override fun removeEventById(group: Group, id: Long): Group {
        eventService.removeGroupById(eventService.getEvent(id), group.id)
        return group
    }
}
