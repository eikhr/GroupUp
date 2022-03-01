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

@Entity
@Table(name = "events")
open class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = null
    @Column
    open var title: String = ""
    @Column
    open var description: String = ""
    @Column
    @DateTimeFormat
    open var date: GregorianCalendar = GregorianCalendar(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DAY)

    @ManyToMany(mappedBy = "events")
    @JsonIgnoreProperties("events")
    open var groupsMatched: MutableList<Group> = mutableListOf()

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "groups_requesting_match",
        joinColumns = [JoinColumn(name = "event_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("pendingMatchRequests")
    open var pendingGroupsRequests: MutableList<Group> = mutableListOf()
}
