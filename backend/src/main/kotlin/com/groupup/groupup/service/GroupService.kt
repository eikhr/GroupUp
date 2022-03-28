package com.groupup.groupup.service

import com.groupup.groupup.model.Group
import com.groupup.groupup.model.User
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

    @Autowired
    @Lazy
    private lateinit var userService: UserService

    override fun createGroup(token: String, group: Group): Group {
        val user = userService.getUserByToken(token)
        group.users.add(user)
        return groupRepository.save(group)
    }

    override fun getGroup(id: Long): Group {
        return groupRepository.findById(id).get()
    }

    override fun getGroups(): List<Group> {
        return groupRepository.findAll().sortedBy { it.name }
    }

    /* Updates group. Inspired from:
    https://github.com/cijosunny/
    kotlin-boot-repo/blob/master/src/main/kotlin/com/app/kotlin/user/service/UserServiceImpl.kt */
    override fun updateGroup(id: Long, group: Group): Group {
        group.id = id
        groupRepository.saveAndFlush(group)
        return group
    }

    override fun buyGold(id: Long): Group {
        val group = groupRepository.findById(id).get()
        group.gold = true;
        return groupRepository.saveAndFlush(group)
    }

    override fun removeGroup(id: Long): Boolean {
        groupRepository.deleteById(id)
        return true
    }

    fun removeMember(group: Group, user: User) {
        group.users.remove(user)
    }

    override fun getMinAge(id: Long): Int {
        return groupRepository.findById(id).get().minAge.toInt()
    }

    override fun getMaxAge(id: Long): Int {
        return groupRepository.findById(id).get().maxAge.toInt()
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
