package com.groupup.groupup.service

import com.groupup.groupup.model.Group
import com.groupup.groupup.repository.GroupRepository
import org.springframework.stereotype.Service

@Service
class GroupService(private val groupRepository: GroupRepository) : IGroupService {

    override fun createGroup(group: Group): Group {
        var groupDb = groupRepository.save(group)
        return groupDb
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
        if (group.contactEmail.contains("@", ignoreCase = false) &&
            group.contactEmail.contains(".", ignoreCase = false)
        ) {
            group.id = id
            groupRepository.saveAndFlush(group)
            return group
        } else {
            throw IllegalArgumentException("Ikke riktig epost")
        }
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
}
