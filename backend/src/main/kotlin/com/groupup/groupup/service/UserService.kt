package com.groupup.groupup.service

import com.groupup.groupup.model.AuthSession
import com.groupup.groupup.model.User
import com.groupup.groupup.repository.AuthSessionRepository
import com.groupup.groupup.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class UserService(
    private val userRepository: UserRepository,
    private val authSessionRepository: AuthSessionRepository
) {

    @Autowired
    @Lazy
    private lateinit var groupService: GroupService

    fun createUser(user: User): User {
        var dbUser: User? = null
        try {
            dbUser = getUser(user.username)
        } catch (e: Exception) {
            // Empty to continue flow of execution
        }
        if (dbUser != null)
            throw IllegalStateException("Du kan ikke registrere flere brukere med samme navn")
        val createdUser = User(user.username, user.password, true, user.firstName, user.lastName)
        return userRepository.save(createdUser)
    }

    fun getUsers(): List<User> {
        return userRepository.findAll()
    }

    fun getUser(id: Long): User {
        return userRepository.findById(id).get()
    }

    fun getUser(userName: String): User? {
        return userRepository.findAll()
            .stream()
            .filter { user -> user.username == userName }
            .collect(Collectors.toList())[0]
    }

    fun removeUser(id: Long): Boolean {
        val user = getUser(id)
        for (group in user.groups) {
            removeUserFromGroup(user, group.id)
        }
        userRepository.deleteById(id)
        return true
    }

    private fun removeUserFromGroup(user: User, id: Long) {
        groupService.removeMember(groupService.getGroup(id), user)
    }

    /* Updates User. Inspired from:
    https://github.com/cijosunny/kotlin-boot-repo/
    blob/master/src/main/kotlin/com/app/kotlin/user/service/UserServiceImpl.kt */
    fun updateUser(user: User, id: Long): User {
        user.id = id
        userRepository.saveAndFlush(user)
        return user
    }

    fun login(username: String, password: String): AuthSession {
        val dbUser = getUser(username) ?: throw IllegalArgumentException("User does not exist")
        println(dbUser.password.toString() + " password: " + password)
        require(dbUser.checkPassword(password)) { "Brukernavn eller passord er feil." }
        val authSession = AuthSession(dbUser)
        authSessionRepository.saveAndFlush(authSession)
        return authSession
    }
}
