package com.groupup.groupup.service

import com.groupup.groupup.model.AuthSession
import com.groupup.groupup.model.Group
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
            throw IllegalStateException("Du kan ikke registrere flere brukere med samme brukernavn")
        val createdUser = User(user.username, user.password, true, user.firstName, user.lastName, user.email, user.age)
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

    fun getUserByToken(token: String): User {
        return authSessionRepository.findById(token).get().user
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
        require(dbUser.checkPassword(password)) { "Brukernavn eller passord er feil." }
        val authSession = AuthSession(dbUser)
        authSessionRepository.saveAndFlush(authSession)
        return authSession
    }

    fun requestMembership(groupId: Long, authToken: String): User {
        val group: Group = groupService.getGroup(groupId)
        val user = getUserByToken(authToken)
        if (group.usersRequestingMembership.contains(user))
            throw IllegalStateException("You have already requested joining this group")
        group.usersRequestingMembership.add(user)
        user.groupMembershipRequests.add(group)
        groupService.updateGroup(groupId, group)
        return updateUser(user, user.id)
    }

    fun acceptMembership(groupId: Long, authUser: User, user: User): User {
        val group = groupService.getGroup(groupId)
        val actualUser = getUser(user.id)
        if (!actualUser.groupMembershipRequests.contains(group))
            throw IllegalArgumentException("Du har ikke sendt en forespørsel til gruppen")
        if (!group.users.contains(getUser(authUser.id)))
            throw IllegalStateException("Du kan ikke legge til medlemmer i en gruppe du ikke er med i")
        actualUser.groupMembershipRequests.remove(group)
        group.usersRequestingMembership.remove(actualUser)
        actualUser.groups.add(group)
        group.users.add(actualUser)
        groupService.updateGroup(groupId, group)
        return updateUser(actualUser, user.id)
    }
}
