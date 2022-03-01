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
}
