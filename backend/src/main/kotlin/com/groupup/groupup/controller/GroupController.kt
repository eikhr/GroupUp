package com.groupup.groupup.controller

import com.groupup.groupup.model.Group
import com.groupup.groupup.service.GroupService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@RequestMapping("/api/groups")
class GroupController(private val groupService: GroupService) {

    @PostMapping("/add")
    fun createGroup(@RequestBody group: Group): Long {
        return groupService.createGroup(group).id
    }
    @GetMapping("/{id}")
    fun getGroup(@PathVariable id: Long): Group {
        return groupService.getGroup(id)
    }
    @GetMapping()
    fun getGroups(): List<Group> {
        return groupService.getGroups()
    }

    @RequestMapping(value = ["{id}"], method = [RequestMethod.DELETE])
    fun deleteGroup(@PathVariable id: Long): Boolean {
        return groupService.removeGroup(id)
    }
    @PutMapping(value = ["{id}"])
    fun updateGroup(@PathVariable id: Long, @RequestBody group: Group): Group? {
        return groupService.updateGroup(id, group)
    }
}
