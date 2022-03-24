package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.Table

private const val MIN_AGE = 18
private const val MAX_AGE = 99

@Entity
@Table(name = "groups")
open class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long = 0

    @Column
    open var name: String = ""

    @Column
    open var description: String = ""

    @Column
    open var minAge: Integer = Integer(MIN_AGE)
        get() {
            var minAge = Integer(Integer.MAX_VALUE)
            users.forEach { user -> if (user.age.toInt() < minAge.toInt()) minAge = user.age }
            return minAge
        }

    @Column
    open var maxAge: Integer = Integer(MAX_AGE)
        get() {
            var maxAge = Integer(Integer.MIN_VALUE)
            users.forEach { user -> if (user.age.toInt() > maxAge.toInt()) maxAge = user.age }
            return maxAge
        }

    @Column
    open var contactEmail: String = "testmail@autogen.com"
        set(value) {
            if (!value.contains("@", ignoreCase = false) || !value.contains(".", ignoreCase = false))
                throw IllegalStateException("Email format is wrong, missing '@' or '.'")
            field = value
        }

    @Column
    open var gold: Boolean = false

    @Column
    @ElementCollection
    open var interests: MutableList<String> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "groups_matched_to_event",
        joinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "event_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("groupsMatched")
    open var events: MutableList<Event> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "group_requesting_match_to_event",
        joinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "event_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("pendingGroupsRequests")
    open var pendingMatchRequests: MutableList<Event> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "group_superlike_requesting_match_to_event",
        joinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "event_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("superlikeGroupsRequests")
    open var superlikeMatchRequests: MutableList<Event> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "users_in_group",
        joinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("groups")
    open var users: MutableList<User> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "users_requesting_membership_in_group",
        joinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("groupMembershipRequests")
    open var usersRequestingMembership: MutableList<User> = mutableListOf()
}
