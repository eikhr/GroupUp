package com.groupup.groupup.service

import com.groupup.groupup.model.Group
import com.groupup.groupup.repository.GroupRepository
import org.springframework.stereotype.Service

@Service
class GroupService(private val groupRepository: GroupRepository) : IGroupService {

    override fun createGroup(group: Group): Group {
        return groupRepository.save(group)
    }

    override fun getGroup(id: Long): Group {
        return groupRepository.findById(id).get()
    }

    override fun getGroups(): List<Group> {
        return groupRepository.findAll()
    }

    override fun updateGroup(group: Group, id: Long): Group {
        TODO("not yet implemented")
    }

    override fun getMinAge(id: Long): Int {
        return groupRepository.findById(id).get().minAge
    }

    override fun getMaxAge(id: Long): Int {
        return groupRepository.findById(id).get().maxAge
    }
}
