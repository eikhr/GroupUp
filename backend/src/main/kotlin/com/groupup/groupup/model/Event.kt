package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.format.annotation.DateTimeFormat
import java.io.Serializable
import java.util.GregorianCalendar
import javax.persistence.Column
import javax.persistence.Embeddable
import javax.persistence.EmbeddedId
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToMany
import javax.persistence.ManyToOne
import javax.persistence.MapsId
import javax.persistence.OneToMany
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

    @OneToMany(mappedBy = "group")
    @JsonIgnoreProperties("pendingGroupsRequests")
    open var pendingGroupsRequests: MutableList<MatchRequest> = mutableListOf()
}

@Embeddable
open class MatchRequestKey : Serializable {
    @Column(name = "event_id")
    open var eventId: Long = 0

    @Column(name = "group_id")
    open var groupId: Long = 0

    companion object {
        private const val serialVersionUID = -775017407158378343L
    }
}

@Entity
open class MatchRequest {
    @EmbeddedId
    open var id: MatchRequestKey = MatchRequestKey()

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    open lateinit var event: Event

    @ManyToOne
    @MapsId("groupId")
    @JoinColumn(name = "group_id")
    open lateinit var group: Group

    open var isSuperlike: Boolean = false
}
