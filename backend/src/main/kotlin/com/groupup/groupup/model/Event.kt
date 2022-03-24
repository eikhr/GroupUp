package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.format.annotation.DateTimeFormat
import java.util.GregorianCalendar
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.Table

private const val DEFAULT_YEAR = 2022
private const val DEFAULT_MONTH = 4
private const val DEFAULT_DAY = 13
private const val TITLE_MIN_LENGTH = 4
private const val LOCATION_MIN_LENGTH = 1

@Entity
@Table(name = "events")
open class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @Column
    @ElementCollection
    open var eventInterests: MutableList<String> = mutableListOf()

    @Column
    open var title: String = ""
        set(value) {
            if (value.length < TITLE_MIN_LENGTH)
                throw IllegalArgumentException("Title must be at least 4 chars\n")
            field = value
        }

    @Column
    open var location: String = ""
        set(value) {
            if (value.length < LOCATION_MIN_LENGTH)
                throw IllegalArgumentException("Location can't be empty\n")
            field = value
        }

    @Column
    open lateinit var description: String

    @Column
    @DateTimeFormat
    open var date: GregorianCalendar = GregorianCalendar(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DAY)
        set(value) {
            /*if (GregorianCalendar().after(value)) {
                println(value.timeInMillis.toString() + "current time: " + GregorianCalendar().timeInMillis.toString() +
                "\n Difference: " + (value.timeInMillis - GregorianCalendar().timeInMillis) + " ISNowAfter: " +
                 GregorianCalendar().after(value).toString())
                throw IllegalArgumentException("Event date must be in future")
            }*/
            field = value
        }

    @ManyToMany(mappedBy = "events")
    @JsonIgnoreProperties("events", "usersRequestingMembership")
    open var groupsMatched: MutableList<Group> = mutableListOf()

    @ManyToMany(mappedBy = "pendingMatchRequests")
    @JsonIgnoreProperties("pendingMatchRequests")
    open var pendingGroupsRequests: MutableList<Group> = mutableListOf()

    @ManyToMany(mappedBy = "superlikeMatchRequests")
    @JsonIgnoreProperties("superlikeMatchRequests")
    open var superlikeGroupsRequests: MutableList<Group> = mutableListOf()
}
