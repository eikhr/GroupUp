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
import javax.persistence.OneToMany
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
    open var minAge: Int = MIN_AGE

    @Column
    open var maxAge: Int = MAX_AGE

    @Column
    open var contactEmail: String = ""

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

    @OneToMany(mappedBy = "event")
    @JsonIgnoreProperties("pendingMatchRequests")
    open var pendingMatchRequests: MutableList<MatchRequest> = mutableListOf()
}
