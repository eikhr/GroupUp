package com.groupup.groupup.service

import com.groupup.groupup.model.Group

interface IGroupService {
    /**
     * Creates group
     * @param: group object
     * @return created group
     */
    fun createGroup(group: Group): Group

    /**
     * gets all groups
     * @return List of all groups
     */
    fun getGroups(): List<Group>

    /**
     * Gets a single group from a given ID
     * @param id: id of requested group
     * @return requested group
     */
    fun getGroup(id: Long): Group

    /**
     * updates a group
     * @param id: id of the group to update
     * @param group: group object with all values to include in the updated group
     * @return newly updated group
     */
    fun updateGroup(id: Long, group: Group): Group

    /**
     * removes a group
     * @param id: group to remove
     * @return true if successfully deleted
     */
    fun removeGroup(id: Long): Boolean

    /**
     * gets the minimum age in a group
     * @param id: id of group
     * @return int: minAge
     */
    fun getMinAge(id: Long): Int

    /**
     * gets the maximum age in a group
     * @param id: id of group
     * @return int: maxAge
     */
    fun getMaxAge(id: Long): Int

    /**
     * Adds an event to the group
     * @param group: group to add event
     * @param id: id of event
     * @return group object
     */
    fun addEventById(group: Group, id: Long): Group

    /**
     * Remove an event to the group
     * @param group: group to remove event from
     * @param id: id of event to remove
     * @return group object
     */
    fun removeEventById(group: Group, id: Long): Group
}
