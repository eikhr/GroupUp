package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.format.annotation.DateTimeFormat
import java.util.GregorianCalendar
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.Table

private const val DEFAULT_YEAR = 2022
private const val DEFAULT_MONTH = 4
private const val DEFAULT_DAY = 13
private const val TITLE_MIN_LENGTH = 3

@Entity
@Table(name = "events")
open class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @Column
    open var title: String = ""
        set(value) {
            if (value.length <= TITLE_MIN_LENGTH)
                throw IllegalArgumentException("Title must be at least 4 chars\n")
            field = value
        }
    @Column
    open lateinit var description: String
    @Column
    @DateTimeFormat
    open var date: GregorianCalendar = GregorianCalendar(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DAY)
        set(value) {
            if (GregorianCalendar().after(value))
                throw IllegalArgumentException("Event date must be in future")
            field = value
        }

    @ManyToMany(mappedBy = "events")
    @JsonIgnoreProperties("events")
    open var groupsMatched: MutableList<Group> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "group requesting_match_to_event",
        joinColumns = [JoinColumn(name = "event_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("pendingMatchRequests")
    open var pendingGroupsRequests: MutableList<Group> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "group_superlike_requesting match_to_event",
        joinColumns = [JoinColumn(name = "event_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("superlikeMatchRequests")
    open var superlikeGroupsRequests: MutableList<Group> = mutableListOf()
}
