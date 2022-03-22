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
        return userRepository.save(user)
    }

    fun getUsers(): List<User> {
        return userRepository.findAll()
    }

    fun getUser(id: Long): User {
        return userRepository.findById(id).get()
    }

    fun getUser(userName: String): User {
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

    fun login(user: User, password: String): AuthSession {
        require(user.checkPassword(password)) { "Brukernavn eller passord er feil." }
        val authSession = AuthSession(user)
        authSessionRepository.saveAndFlush(authSession)
        return authSession
    }
}
