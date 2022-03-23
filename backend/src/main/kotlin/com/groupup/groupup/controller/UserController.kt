package com.groupup.groupup.controller

import com.groupup.groupup.model.AuthSession
import com.groupup.groupup.model.User
import com.groupup.groupup.service.UserService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @GetMapping()
    fun getAllUsers(): List<User> {
        return userService.getUsers()
    }

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long): User {
        return userService.getUser(id)
    }

    @PostMapping("/register")
    fun createUser(@RequestBody user: User): AuthSession {
        userService.createUser(user)
        return userService.login(user.username, user.password)
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: Long): Boolean {
        return userService.removeUser(id)
    }

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: Long, @RequestBody user: User): User {
        return userService.updateUser(user, id)
    }

    @PostMapping("/login")
    fun login(@RequestHeader("username") username: String, @RequestHeader("password") password: String): AuthSession {
        return userService.login(username, password)
    }

    @PostMapping("/requestmembership/{groupId}")
    fun requestMembership(
        @PathVariable groupId: Long,
        @RequestHeader("auth") authToken: String,
        @RequestBody user: User
    ): User {
        return userService.requestMembership(groupId, authToken, user)
    }

    @PostMapping("/acceptmembership/{groupId}")
    fun acceptMembership(
        @PathVariable groupId: Long,
        @RequestHeader("auth") authToken: String,
        @RequestBody user: User
    ): User {
        return userService.acceptMembership(groupId, userService.getUserByToken(authToken), user)
    }
}
