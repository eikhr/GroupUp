package com.groupup.groupup.service

import com.groupup.groupup.model.Group

interface IGroupService {
    fun createGroup(group: Group): Group

    fun getGroups(): List<Group>

    fun getGroup(id: Long): Group

    fun updateGroup(id: Long, group: Group): Group

    fun removeGroup(id: Long): Boolean

    fun getMinAge(id: Long): Int

    fun getMaxAge(id: Long): Int

    /**
     * Adds an event to the group
     */
    fun addEventById(group: Group, id: Long): Group

    /**
     * Removes an event from a group
     */
    fun removeEventById(group: Group, id: Long): Group
}
